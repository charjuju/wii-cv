import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function WiiTv({ info, updateTvTabInfo }) {
    const tvRef = useRef(null);
    const [showSquare, setShowSquare] = useState(false);
    const [squarePosition, setSquarePosition] = useState({ x: 0, y: 0 });

    const [EditMode, setEditMode] = useState(false);
    const [nom, setNom] = useState(info.res.nom);
    const [url, setUrl] = useState(info.res.url);
    const [imgFond, setImgFond] = useState(info.res.imgFond);
    const [imgCover, setImgCover] = useState(info.res.imgCover);


    const getDivPosition = () => {
        if (tvRef.current) {
            const rect = tvRef.current.getBoundingClientRect();
            console.log('Position de la div : ', rect);
            setSquarePosition({ x: rect.left, y: rect.top });
            setShowSquare(true);
        }
    };

    const handleSquareReturn = () => {
        setShowSquare(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTvTabInfo(info.index, {
            nom: nom,
            url: url,
            imgFond: imgFond,
            imgCover: imgCover,
        })
        setNom('');
        setUrl('');
        setImgFond('');
        setImgCover('');
    }
    return (
        <div onClick={!showSquare ? getDivPosition : console.log("ok")} style={{backgroundImage: `url(${info.res.imgCover})`}} className='tv-noise' ref={tvRef}>
            {showSquare && <div className="go-black" />}
            {showSquare && (
                <motion.div
                    style={{
                        backgroundImage: `url('${info.res.imgFond}')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                    className="black-square"
                    initial={{ opacity: 0, x: squarePosition.x, y: squarePosition.y }}
                    animate={{ opacity: 1, width: "100vw", height: "100vh", x: 0, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="classic-back" style={{ height: '20%', width: '100%', display: 'flex', justifyContent: "space-around", alignItems: 'center' }}>
                            <div />
                            <button style={{ height: '60%', width: '25%', borderRadius: '100px', backgroundColor: 'white', border: '3px solid #69c5e2', color: 'black', fontSize: '50px' }} onClick={handleSquareReturn}>Wii Menu</button>
                            <button style={{ height: '60%', width: '25%', borderRadius: '100px', backgroundColor: 'white', border: '3px solid #69c5e2', color: 'black', fontSize: '50px' }} onClick={handleSquareReturn}>Start</button>
                            <div />
                        </div>
                        <div>
                            <img style={{ height: '100px', borderRadius: '100px', backgroundColor: '#e3e3e3', border: '3px solid #47b4cb' }} alt="Edit" src="tools.png" onClick={() => setEditMode(!EditMode)} />
                            {EditMode &&
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label>Nom:</label>
                                        <input
                                            type="text"
                                            placeholder="Nom"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>URL:</label>
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>Image de fond:</label>
                                        <input
                                            type="text"
                                            placeholder="Image de fond"
                                            value={imgFond}
                                            onChange={(e) => setImgFond(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>Image de couverture:</label>
                                        <input
                                            type="text"
                                            placeholder="Image de couverture"
                                            value={imgCover}
                                            onChange={(e) => setImgCover(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit">Ajouter Info Wii TV</button>
                                </form>
                            }
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
