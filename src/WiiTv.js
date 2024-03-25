import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WiiTv({ info}) {
    const navigate = useNavigate();
    const tvRef = useRef(null);
    const [showSquare, setShowSquare] = useState(false);
    const [squarePosition, setSquarePosition] = useState({ x: 0, y: 0 });

    const [EditMode, setEditMode] = useState(false);

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

    return (
        <div onClick={!showSquare ? getDivPosition : console.log("ok")} style={{ backgroundImage: `url(${info.res.imgCover})` }} className='tv-noise' ref={tvRef}>
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
                            <button className="button-tv" onClick={() => handleSquareReturn()}>Wii Menu</button>
                            <button className="button-tv" onClick={() => { info.res.relative ? navigate(info.res.url) : window.open(info.res.url, "_blank") }}>Start</button>
                            <div />
                        </div>
                        <div className="tv-phone-cover" style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', width: '100%'}}>
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center'}}>
                                <img alt="cover" style={{width: "100%", maxHeight: "70vh"}} className="tv-phone-cover" src={info.res.imgFond} onClick={() => setEditMode(!EditMode)} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
