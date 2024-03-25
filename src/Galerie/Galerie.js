import React from 'react';
import { motion } from 'framer-motion';
import './Galerie.css'

const art = [
    { nom: "Autruche du hasard", src: "/Galerie/autruchC.png" },
    { nom: "Autruche le barbar", src: "/Galerie/autruche_fort.png" },
    { nom: "Coin coin", src: "/Galerie/pingoin.png" },
    { nom: "Pythonnn", src: "/Galerie/python.png" },
    { nom: "wallpaper Frog", src: "/Galerie/wallPeper.png" },
];

const Gallery = () => {
    const colors = ['#FF3366', '#FFCC33', '#33FF99', '#6633FF', '#33CCFF'];

    const randomRotation = () => Math.floor((Math.random() * 20) - 15);
    const randomScale = () => Math.random() * 0.3 + 0.9;

    return (
        <div>
            <div className="gallery">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: "4rem",
                        textAlign: "center",
                        marginBottom: "2rem",
                        color: "#FF3366",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                    }}
                >
                    Galerie mon petit musée!
                </motion.h1>
                <div style={{ height: '100px' }} />
                <div className="artwork-container">
                    {art.map((url, index) => (
                        <motion.div
                            key={index}
                            className="artwork-item"
                            initial={{ opacity: 0, scale: randomScale(), rotate: randomRotation() }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: randomScale() + 0.1, rotate: randomRotation() + 5, zIndex: 99999 }}
                            whileTap={{ scale: randomScale() - 0.1 }}
                            style={{
                                maxWidth: '80vw',
                                backgroundColor: colors[index % colors.length],
                                boxShadow: `0 12px 24px ${colors[index % colors.length]}`,
                                borderRadius: '20px',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                            }}
                        >
                            <motion.img
                                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }}
                                src={url.src}
                                alt={url.nom}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    padding: '1rem',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                {url.nom}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
