import { useState, useRef } from 'react';
import { Upload, Download, Copy, Check, Wifi, AlertCircle } from 'lucide-react';
import { encryptCommeUnCoquin, decryptCommeUnManCool } from '../tools/cryptage';
import { QRCodeSVG } from 'qrcode.react';
import "./Competence.css"

const P2PFileTransfer = () => {
    const [isHost, setIsHost] = useState(false);
    const [remoteId, setRemoteId] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [file, setFile] = useState(null);
    const [transferProgress, setTransferProgress] = useState(0);
    const [isTransferring, setIsTransferring] = useState(false);
    const [receivedFile, setReceivedFile] = useState(null);
    const [copied, setCopied] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [dataChannelReady, setDataChannelReady] = useState(false);
    const [offer, setOffer] = useState('');
    const [answer, setAnswer] = useState('');
    const [showOfferAnswer, setShowOfferAnswer] = useState(false);
    const [qrcodeStr, setQrcode] = useState("");
    const [loading, setLoading] = useState(false);


    const peerConnection = useRef(null);
    const dataChannel = useRef(null);
    const fileInput = useRef(null);

    const blackMi = "black";
    const greenMi = "yellowgreen"

    const iceConfiguration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    };

    const initializePeerConnection = () => {
        peerConnection.current = new RTCPeerConnection(iceConfiguration);

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate === null) {
                console.log('ICE gathering complete');
                setLoading(false);
            }
        };

        peerConnection.current.onconnectionstatechange = () => {
            const state = peerConnection.current.connectionState;
            console.log('Connection state:', state);
            setLoading(true);
            setConnectionStatus(state);
            setIsConnected(state === 'connected');
        };

        peerConnection.current.ondatachannel = (event) => {
            console.log('Received data channel');
            dataChannel.current = event.channel;
            setupDataChannel();

            if (event.channel.readyState === 'open') {
                console.log('Data channel already open');
                setDataChannelReady(true);
            }
        };
    };
    const setupDataChannel = () => {
        if (!dataChannel.current) return;

        console.log('Setting up data channel, readyState:', dataChannel.current.readyState, dataChannel.current);
        setLoading(true);
        dataChannel.current.onopen = () => {
            console.log('Data channel opened');
            setDataChannelReady(true);
        };

        dataChannel.current.onclose = () => {
            console.log('Data channel closed');
            setDataChannelReady(false);
        };

        dataChannel.current.onerror = (error) => {
            console.error('Data channel error:', error);
        };

        dataChannel.current.onmessage = (event) => {
            console.log('Received message:', event.data.substring(0, 100) + '...');
            try {
                const data = JSON.parse(event.data);
                console.log('Parsed message type:', data.type);

                if (data.type === 'file-info') {
                    console.log('Receiving file:', data.name, 'chunks:', data.chunks);
                    expectedChunks.current = data.chunks;
                    receivedChunks.current = new Array(data.chunks);
                    fileInfo.current = data;
                    setIsTransferring(true);
                    setTransferProgress(0);
                } else if (data.type === 'file-chunk') {
                    console.log('Received chunk:', data.index, 'of', expectedChunks.current);
                    handleFileChunk(data);
                } else if (data.type === 'file-complete') {
                    console.log('File transfer complete');
                    completeFileReceive(data);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        if (dataChannel.current.readyState === 'open') {
            console.log('Data channel is already open, sending test message');
            try {
                dataChannel.current.send(JSON.stringify({ type: 'test', message: 'Connection test' }));
            } catch (error) {
                console.error('Error sending test message:', error);
            }
        }
    };

    const receivedChunks = useRef([]);
    const expectedChunks = useRef(0);
    const fileInfo = useRef(null);

    const handleFileChunk = (data) => {
        const binaryString = atob(data.chunk.split(',')[1]);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        receivedChunks.current[data.index] = bytes;

        const progress = (receivedChunks.current.filter(c => c).length / expectedChunks.current) * 100;
        setTransferProgress(progress);
    };

    const completeFileReceive = (data) => {
        const totalSize = receivedChunks.current.reduce((sum, chunk) => sum + (chunk ? chunk.length : 0), 0);
        const fullFile = new Uint8Array(totalSize);
        let offset = 0;

        for (const chunk of receivedChunks.current) {
            if (chunk) {
                fullFile.set(chunk, offset);
                offset += chunk.length;
            }
        }

        const blob = new Blob([fullFile], { type: data.fileType || 'application/octet-stream' });
        setReceivedFile({
            name: data.name,
            size: data.size,
            type: data.fileType || 'application/octet-stream',
            blob: blob,
            url: URL.createObjectURL(blob)
        });
        setIsTransferring(false);
        setTransferProgress(100);

        receivedChunks.current = [];
        expectedChunks.current = 0;
        fileInfo.current = null;

        console.log('File reconstruction complete:', data.name);
    };

    const createOffer = async () => {
        setIsHost(true);
        initializePeerConnection();

        dataChannel.current = peerConnection.current.createDataChannel('fileTransfer', {
            ordered: true
        });
        setupDataChannel();

        try {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            await new Promise((resolve) => {
                if (peerConnection.current.iceGatheringState === 'complete') {
                    resolve();
                } else {
                    peerConnection.current.addEventListener('icegatheringstatechange', () => {
                        if (peerConnection.current.iceGatheringState === 'complete') {
                            resolve();
                        }
                    });
                }
            });

            setOffer((await encryptCommeUnCoquin(JSON.stringify(peerConnection.current.localDescription))));
            setShowOfferAnswer(true);

        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const handleOffer = async (offerString) => {
        try {
            initializePeerConnection();

            const offerDesc = JSON.parse(await decryptCommeUnManCool(offerString));
            await peerConnection.current.setRemoteDescription(offerDesc);

            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            await new Promise((resolve) => {
                if (peerConnection.current.iceGatheringState === 'complete') {
                    resolve();
                } else {
                    const timeout = setTimeout(() => {
                        console.log('ICE gathering timeout, proceeding anyway');
                        resolve();
                    }, 10000);

                    peerConnection.current.addEventListener('icegatheringstatechange', () => {
                        if (peerConnection.current.iceGatheringState === 'complete') {
                            clearTimeout(timeout);
                            resolve();
                        }
                    });
                }
            });

            setAnswer(await encryptCommeUnCoquin(JSON.stringify(peerConnection.current.localDescription)));
            setShowOfferAnswer(true);

        } catch (error) {
            console.error('Error handling offer:', error);
            alert('8======D');
        }
    };

    const handleAnswer = async (answerString) => {
        try {
            const answerDesc = JSON.parse(await decryptCommeUnManCool(answerString));
            await peerConnection.current.setRemoteDescription(answerDesc);
            console.log('Answer processed successfully');
        } catch (error) {
            console.error('Error handling answer:', error);
            alert('Erreur lors du traitement de la réponse. Vérifiez le format.');
        }
    };

    const sendFile = async () => {
        if (!file || !dataChannel.current) {
            alert('8======D');
            return;
        }

        console.log('Data channel readyState:', dataChannel.current.readyState);
        if (dataChannel.current.readyState !== 'open') {
            alert('8======D' + dataChannel.current.readyState);
            return;
        }

        setIsTransferring(true);
        setTransferProgress(0);

        try {
            const chunkSize = 16384; // 16KB chunk
            const chunks = Math.ceil(file.size / chunkSize);

            const fileInfo = {
                type: 'file-info',
                name: file.name,
                size: file.size,
                fileType: file.type,
                chunks: chunks
            };

            console.log('Sending file info:', fileInfo);
            dataChannel.current.send(JSON.stringify(fileInfo));

            await new Promise(resolve => setTimeout(resolve, 100));

            const reader = new FileReader();

            for (let i = 0; i < chunks; i++) {
                const start = i * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);

                await new Promise((resolve, reject) => {
                    reader.onload = () => {
                        try {
                            const chunkData = {
                                type: 'file-chunk',
                                index: i,
                                chunk: reader.result
                            };

                            console.log(`Sending chunk ${i + 1}/${chunks}`);
                            dataChannel.current.send(JSON.stringify(chunkData));
                            setTransferProgress(((i + 1) / chunks) * 100);
                            resolve();
                        } catch (error) {
                            console.error('Error sending chunk:', error);
                            reject(error);
                        }
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(chunk);
                });

                if (i % 5 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }

            const completeData = {
                type: 'file-complete',
                name: file.name,
                size: file.size,
                fileType: file.type
            };

            console.log('Sending completion signal');
            dataChannel.current.send(JSON.stringify(completeData));
            console.log('File transfer complete');

        } catch (error) {
            console.error('Error during file transfer:', error);
            alert('8======D' + error.message);
        } finally {
            setIsTransferring(false);
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const downloadFile = () => {
        if (receivedFile) {
            const a = document.createElement('a');
            a.href = receivedFile.url;
            a.download = receivedFile.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const resetConnection = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
        }

        setIsHost(false);
        setRemoteId('');
        setIsConnected(false);
        setDataChannelReady(false);
        setFile(null);
        setReceivedFile(null);
        setTransferProgress(0);
        setIsTransferring(false);
        setConnectionStatus('disconnected');
        setOffer('');
        setAnswer('');
        setShowOfferAnswer(false);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div style={{
            backgroundColor: blackMi,
            padding: '16px'
        }}>
            {qrcodeStr &&
                <div style={{ position: 'fixed', top: '0px', left: '0px', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: blackMi, zIndex: '100', flexDirection: 'column', gap: '16px' }}>
                    <QRCodeSVG fgColor={greenMi} bgColor={blackMi} value={qrcodeStr} size={300} />
                    <button style={{ height: "44px", width: '234px', borderRadius: '0px', borderColor: greenMi, backgroundColor: blackMi, color: greenMi }} onClick={() => setQrcode("")}>quit</button>
                </div>
            }
            {!showOfferAnswer && (
                <div style={{ textAlign: 'center', height: '100%' }}>
                    <div style={{
                        display: 'flex',
                        gap: '24px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <button
                            onClick={() => !loading ? createOffer() : console.log("ça charge troup de bal")}
                            style={{ height: "44px", width: '234px', borderRadius: '0px', borderColor: greenMi, backgroundColor: blackMi, color: greenMi }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = greenMi;
                                e.target.style.color = blackMi;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = blackMi;
                                e.target.style.color = greenMi;
                            }}
                        >
                            {!loading ? "ENVOYER SON KiKi" : "CHARGEMENT DU KIKI"}
                        </button>
                        <div style={{
                            border: `2px solid ${greenMi}`,
                            backgroundColor: blackMi,
                            width: '234px'
                        }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                color: greenMi
                            }}>RECEVOIR SON KiKi</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                                <textarea
                                    placeholder="Collez le KiKi key"
                                    value={remoteId}
                                    onChange={(e) => setRemoteId(e.target.value)}
                                    style={{
                                        backgroundColor: blackMi,
                                        textAlign: 'center',
                                        textJustify: 'center',
                                        width: '200px',
                                        height: '58px',
                                        color: greenMi,
                                        border: `1px solid ${greenMi}`,
                                        resize: 'none',
                                        fontSize: '20px',
                                        overflow: 'hidden',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <button
                                    onClick={() => handleOffer(remoteId)}
                                    disabled={!remoteId.trim()}
                                    style={{
                                        width: '200px',
                                        backgroundColor: blackMi,
                                        color: greenMi,
                                        border: `1px solid ${greenMi}`,
                                        borderRadius: '0px',
                                        margin: '8px',
                                        fontSize: '20px',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = greenMi;
                                        e.target.style.color = blackMi;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = blackMi;
                                        e.target.style.color = greenMi;
                                    }}
                                >
                                    KiKi Check
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showOfferAnswer && offer && !answer && (
                <div style={{
                    backgroundColor: blackMi,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <AlertCircle style={{
                            width: '20px',
                            height: '20px',
                            color: greenMi,
                            marginRight: '8px'
                        }} />
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: greenMi
                        }}>Étape 1: Partagez vote KiKi Key</h3>
                    </div>

                    <p style={{
                        color: greenMi,
                        marginBottom: '12px',
                        fontSize: '13px'
                    }}>copier cette KiKi key et tu la passe a ton copain de KiKi:</p>

                    <div style={{
                        borderRadius: '0px',
                        marginBottom: '16px',
                        overflow: 'hidden'
                    }}>
                        <textarea
                            value={offer}
                            readOnly
                            style={{
                                width: '100%',
                                height: '120px',
                                fontFamily: 'monospace',
                                fontSize: '12px',
                                border: `1px solid ${greenMi}`,
                                borderRadius: '0px',
                                backgroundColor: 'transparent',
                                resize: 'none',
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                                color: greenMi
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <button
                            onClick={() => copyToClipboard(offer)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: blackMi,
                                color: greenMi,
                                padding: '8px 16px',
                                border: `1px solid ${greenMi}`,
                                borderRadius: '0px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                fontSize: '14px'
                            }}
                        >
                            {copied ? <Check style={{ width: '16px', height: '16px' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
                            <span>{copied ? 'Copié !' : 'Copier la KiKi key'}</span>
                        </button>

                        <button
                            onClick={resetConnection}
                            style={{
                                color: greenMi,
                                backgroundColor: 'transparent',
                                border: `1px solid ${greenMi}`,
                                borderRadius: '0px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            onClick={() => setQrcode(offer)}
                            style={{
                                color: greenMi,
                                backgroundColor: 'transparent',
                                border: `1px solid ${greenMi}`,
                                borderRadius: '0px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            qrcode
                        </button>
                    </div>

                    <div style={{
                        marginTop: '24px',
                        padding: '16px',
                        backgroundColor: blackMi,
                        borderRadius: '0px',
                    }}>
                        <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: greenMi,
                            marginBottom: '8px'
                        }}>En attente de la réponse...</h4>
                        <p style={{
                            fontSize: '14px',
                            color: greenMi,
                            margin: '0'
                        }}>Collez la clé KiKi de votre amis</p>

                        <div style={{
                            marginTop: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <textarea
                                placeholder="Collez la réponse WebRTC ici..."
                                value={remoteId}
                                onChange={(e) => setRemoteId(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '80px',
                                    padding: '8px',
                                    border: `1px solid ${greenMi}`,
                                    borderRadius: '0x',
                                    color: greenMi,
                                    fontFamily: 'monospace',
                                    fontSize: '12px',
                                    boxSizing: 'border-box',
                                    backgroundColor: blackMi,
                                    overflow: 'hidden',
                                    resize: 'none'
                                }}
                            />
                            <button
                                onClick={() => handleAnswer(remoteId)}
                                disabled={!remoteId.trim()}
                                style={{
                                    backgroundColor: blackMi,
                                    color: greenMi,
                                    padding: '6px 12px',
                                    border: `1px solid ${greenMi}`,
                                    borderRadius: '0px',
                                    cursor: remoteId.trim() ? 'pointer' : 'not-allowed',
                                    fontSize: '12px'
                                }}
                            >
                                faire un KiKi check
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showOfferAnswer && answer && !isHost && (
                <div style={{
                    borderRadius: '16px',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <Check style={{
                            width: '20px',
                            height: '20px',
                            color: greenMi,
                            marginRight: '8px'
                        }} />
                        <h3 style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: greenMi
                        }}>Étape 2: Renvoyez cette KiKi key</h3>
                    </div>

                    <p style={{
                        color: greenMi,
                        marginBottom: '16px'
                    }}>Copie t'as clé KiKi et envoie la a ton copain de KiKi</p>

                    <div style={{
                        backgroundColor: blackMi,
                        height: 'auto',
                        borderRadius: '0px',
                    }}>
                        <textarea
                            value={answer}
                            readOnly
                            style={{
                                color: greenMi,
                                width: '100%',
                                height: 'auto',
                                fontFamily: 'monospace',
                                fontSize: '12px',
                                border: `1px solid ${greenMi}`,
                                backgroundColor: 'transparent',
                                resize: 'none',
                                boxSizing: 'border-box',
                                overflow: 'hidden'
                            }}
                        />
                    </div>

                    <div style={{display: 'flex', gap: '16px'}}>
                        <button
                            onClick={() => copyToClipboard(answer)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: blackMi,
                                color: greenMi,
                                padding: '8px 16px',
                                border: `1px solid ${greenMi}`,
                                borderRadius: '0px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                fontSize: '14px'
                            }}
                        >
                            {copied ? <Check style={{ width: '16px', height: '16px' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
                            <span>{copied ? 'Copié !' : 'Copier ta KiKi key'}</span>
                        </button>
                        <button
                            onClick={() => setQrcode(answer)}
                            style={{
                                color: greenMi,
                                backgroundColor: 'transparent',
                                border: `1px solid ${greenMi}`,
                                borderRadius: '0px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            qrcode
                        </button>
                    </div>
                </div>
            )}

            {isConnected && dataChannelReady && (
                <div style={{
                    backgroundColor: blackMi,
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: blackMi,
                                borderRadius: '50%',
                                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                            }}></div>
                            <span style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: greenMi
                            }}>Connexion KiKi établie...</span>
                            <Wifi style={{
                                width: '20px',
                                height: '20px',
                                color: greenMi
                            }} />
                        </div>
                        <button
                            onClick={resetConnection}
                            style={{
                                color: greenMi,
                                backgroundColor: 'transparent',
                                border: `1px solid ${greenMi}`,
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Déconextion
                        </button>
                    </div>

                    {isHost && (
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                color: greenMi
                            }}>Envoyer un fichier</h3>

                            <input
                                ref={fileInput}
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: 'none' }}
                            />

                            {!file ? (
                                <button
                                    onClick={() => fileInput.current?.click()}
                                    style={{
                                        width: '100%',
                                        padding: '32px',
                                        border: `2px dashed ${greenMi}`,
                                        backgroundColor: blackMi,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Upload style={{
                                        width: '48px',
                                        height: '48px',
                                        color: greenMi,
                                        margin: '0 auto 16px auto',
                                        display: 'block'
                                    }} />
                                    <span style={{
                                        color: greenMi,
                                        fontWeight: '600'
                                    }}>Cliquez pour sélectionner un fichier</span>
                                </button>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{
                                        backgroundColor: blackMi,
                                        borderRadius: '0px',
                                        padding: '16px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                <p style={{
                                                    fontWeight: '600',
                                                    color: greenMi,
                                                    margin: '0 0 4px 0'
                                                }}>{file.name}</p>
                                                <p style={{
                                                    fontSize: '14px',
                                                    color: greenMi,
                                                    margin: '0'
                                                }}>{formatFileSize(file.size)}</p>
                                            </div>
                                            <button
                                                onClick={() => setFile(null)}
                                                style={{
                                                    color: greenMi,
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: '20px',
                                                    lineHeight: '1'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>

                                    {isTransferring && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '14px'
                                            }}>
                                                <span>Envoi en cours...</span>
                                                <span>{Math.round(transferProgress)}%</span>
                                            </div>
                                            <div style={{
                                                width: '100%',
                                                backgroundColor: blackMi,
                                                borderRadius: '9999px',
                                                height: '8px'
                                            }}>
                                                <div
                                                    style={{
                                                        backgroundColor: blackMi,
                                                        height: '8px',
                                                        borderRadius: '9999px',
                                                        transition: 'width 0.3s ease',
                                                        width: `${transferProgress}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={sendFile}
                                        disabled={isTransferring}
                                        style={{
                                            width: '100%',
                                            backgroundColor: blackMi,
                                            color: greenMi,
                                            padding: '12px 24px',
                                            border: `1px solid ${greenMi}`,
                                            borderRadius: '0px',
                                            cursor: isTransferring ? 'not-allowed' : 'pointer',
                                            transition: 'background-color 0.2s',
                                            fontWeight: '600',
                                            fontSize: '16px'
                                        }}
                                    >
                                        {isTransferring ? 'Envoi en cours...' : 'Envoyer le fichier'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {(receivedFile || (!isHost && isConnected)) && (
                        <div>
                            {!receivedFile && (
                                <div style={{ marginBottom: '32px' }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: '16px',
                                        color: greenMi
                                    }}>En attente d'un fichier...</h3>
                                    <div style={{
                                        padding: '24px',
                                        border: `2px dashed ${greenMi}`,
                                        textAlign: 'center',
                                        backgroundColor: blackMi
                                    }}>
                                        <p style={{
                                            color: greenMi,
                                            margin: '0'
                                        }}>Prêt à recevoir des fichiers</p>
                                    </div>
                                </div>
                            )}

                            {receivedFile && (
                                <div style={{
                                    backgroundColor: blackMi,
                                    borderRadius: '0px',
                                    padding: '24px'
                                }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: '16px',
                                        color: greenMi,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Check style={{
                                            width: '20px',
                                            height: '20px',
                                            color: greenMi,
                                            marginRight: '8px'
                                        }} />
                                        Fichier reçu avec succès !
                                    </h3>

                                    <div style={{
                                        backgroundColor: blackMi,
                                        borderRadius: '0px',
                                        padding: '16px',
                                        marginBottom: '16px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                <p style={{
                                                    fontWeight: '600',
                                                    color: greenMi,
                                                    margin: '0 0 4px 0'
                                                }}>{receivedFile.name}</p>
                                                <p style={{
                                                    fontSize: '14px',
                                                    color: greenMi,
                                                    margin: '0'
                                                }}>{formatFileSize(receivedFile.size)}</p>
                                            </div>
                                            <Download style={{
                                                width: '24px',
                                                height: '24px',
                                                color: greenMi
                                            }} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={downloadFile}
                                        style={{
                                            width: '100%',
                                            backgroundColor: blackMi,
                                            color: greenMi,
                                            padding: '12px 24px',
                                            border: `1px solid ${greenMi}`,
                                            borderRadius: '0px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                            fontWeight: '600',
                                            fontSize: '16px'
                                        }}
                                    >
                                        Télécharger le fichier
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isTransferring && !isHost && (
                        <div style={{
                            backgroundColor: blackMi,
                            borderRadius: '0px',
                            padding: '24px'
                        }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                color: greenMi
                            }}>Réception en cours...</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '14px',
                                    color: greenMi
                                }}>
                                    <span>Téléchargement...</span>
                                    <span>{Math.round(transferProgress)}%</span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    borderRadius: '9999px',
                                    height: '8px',
                                    border: `1px solid ${greenMi}`
                                }}>
                                    <div
                                        style={{
                                            backgroundColor: greenMi,
                                            height: '8px',
                                            borderRadius: '9999px',
                                            transition: 'width 0.3s ease',
                                            width: `${transferProgress}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {connectionStatus === 'connecting' && (
                <div style={{
                    backgroundColor: blackMi,
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: greenMi,
                        marginBottom: '8px'
                    }}>Établissement de la connexion P2P...</h3>
                    <p style={{
                        color: greenMi,
                        fontSize: '14px'
                    }}>Veuillez patienter pendant que les pairs se connectent</p>
                </div>
            )}

            <div style={{
                textAlign: 'center',
                color: greenMi,
                opacity: '0.8'
            }}>
            </div>
            <style jsx>{`
        input::placeholder {
            font-weight: bold;
            opacity: 0.5;
            color: ${greenMi};
        }

        textarea::placeholder {
            font-weight: bold;
            opacity: 0.5;
            color: ${greenMi};
        }
      `}</style>
        </div>
    );
};

export default P2PFileTransfer;