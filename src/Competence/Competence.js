import React, { useState, useRef, useEffect } from 'react';
import "./Competence.css";
import { TapingAnimationText } from "./Tools/text";
import { motion } from 'framer-motion';
import DVD from './Tools/DVD'
import LangageC from './c'
import ReactLangage from './React'
import Python from './Python'
import Linux from './Linux'
import Strapi from './Strapi'
import Html from './Html'
import JavaS from './JavaS'
import Css from './CSS'
import GitHub from './Github'
import Docker from './Docker'
import Cpp from './Cpp'
import CompetenceMobil from './Mobil/CompetenceMobil'

const dvdList = [{ src: "competenceIco/c.png", result: <LangageC /> },
{ src: "competenceIco/cpp.jpg", result: <Cpp /> },
{ src: "competenceIco/free-docker-12-1175229.png", result: <Docker /> },
{ src: "competenceIco/github.png", result: <GitHub /> },
{ src: "competenceIco/html.png", result: <Html /> },
{ src: "competenceIco/internet.svg", result: <Css /> },
{ src: "competenceIco/javascrypt.png", result: <JavaS /> },
{ src: "competenceIco/strapi.png", result: <Strapi /> },
{ src: "competenceIco/linux-icon-2048x2048-sy06t4un.png", result: <Linux /> },
{ src: "competenceIco/python.png", result: <Python /> },
{ src: "competenceIco/React-icon.svg.png", result: <ReactLangage /> }]

function Competence() {
    const [spleet, setSpleet] = useState(false);
    const [selectedDVD, setSelectedDVD] = useState(null);
    const imgRef = useRef(null);
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1000);

    // Fonction pour mettre à jour l'état en fonction de la largeur de l'écran
    const handleResize = () => {
        setIsScreenSmall(window.innerWidth < 1000);
    };

    // Utilise useEffect pour ajouter un event listener pour le redimensionnement de la fenêtre
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Nettoyage de l'event listener lorsque le composant est démonté
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleFirstAnimationComplete = () => {
        setSpleet(true);
    };

    const handleDVDClick = (index) => {
        setSelectedDVD(index);
    };

    return (
        <div>
            {isScreenSmall ? <CompetenceMobil dvdList={dvdList}/> :
                <div style={{ width: '100vw', overflow: 'hidden' }}>
                    {isScreenSmall && <p>TELEPHONE</p>}
                    <TapingAnimationText el="p" text={"Compétence"} className="competence-titre" />
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '50%', marginLeft: '50px' }}>
                            {!spleet ?
                                <div style={{ display: "flex", height: '70%' }}>
                                    <motion.div
                                        style={{ position: "absolute" }}
                                        initial={{ x: -1500, rotate: 0 }}
                                        animate={{ x: 0, rotate: 720 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        onAnimationComplete={handleFirstAnimationComplete}
                                    >
                                        <DVD size={250} image={dvdList[dvdList.length - 1].src} />
                                    </motion.div>
                                </div>
                                :
                                <div style={{ display: "flex", height: '70%' }}>
                                    {imgRef && imgRef.current && dvdList.map((dvd, index) => (
                                        <motion.div
                                            key={index}
                                            style={{ position: "absolute" }}
                                            initial={{ scale: 1, x: 0, zIndex: 1, rotate: 0 }}
                                            animate={{
                                                x: selectedDVD === index ? imgRef.current.getBoundingClientRect().x : index * 50,
                                                opacity: selectedDVD === index ? 0 : 1,
                                                rotate: selectedDVD === index ? 800 : 0,
                                                transition: selectedDVD === index ? { duration: 1 } : { delay: 0.1 }
                                            }}
                                            whileHover={selectedDVD === index ? {} : {
                                                scale: 1.1,
                                                x: index * 50,
                                                zIndex: 2,
                                                transition: { duration: 0.5 }
                                            }}
                                            onClick={() => handleDVDClick(index)}
                                        >
                                            <DVD size={250} image={dvd.src} />
                                        </motion.div>
                                    ))}
                                    {imgRef && imgRef.current === null && <h1 style={{color: 'blue', cursor: 'pointer'}} onClick={() => window.location.reload()}>
                                        MAIS NON? t'as perdu tes jeux wii!</h1>}
                                </div>
                            }
                        </div>
                        <motion.div
                            initial={{ x: 1000, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <img ref={imgRef} alt="wii" src="wii.png" style={{ height: 400 }} />
                        </motion.div>
                    </div>
                    {selectedDVD !== null &&
                        dvdList[selectedDVD].result
                    }
                </div>
            }
        </div>
    );
}


export default Competence;
