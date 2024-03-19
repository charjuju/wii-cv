import React, { useState, useRef} from 'react';
import "./Competence.css";
import { TapingAnimationText } from "./Tools/text";
import { motion } from 'framer-motion';
import DVD from './Tools/DVD'
import LangageC from './c'

const dvdList = [{ src: "competenceIco/c.png" },
{ src: "competenceIco/cpp.png" },
{ src: "competenceIco/free-docker-12-1175229.png" },
{ src: "competenceIco/github.png" },
{ src: "competenceIco/html.png" },
{ src: "competenceIco/internet.svg" },
{ src: "competenceIco/javascrypt.png" },
{ src: "competenceIco/strapi.png" },
{ src: "competenceIco/linux-icon-2048x2048-sy06t4un.png" },
{ src: "competenceIco/python.png" },
{ src: "competenceIco/React-icon.svg.png" }]

function Competence() {
    const [spleet, setSpleet] = useState(false);
    const [selectedDVD, setSelectedDVD] = useState(null);
    const imgRef = useRef(null);

    const handleFirstAnimationComplete = () => {
        setSpleet(true);
    };

    const handleDVDClick = (index) => {
        setSelectedDVD(index);
    };

    return (
        <div>
            <TapingAnimationText el="p" text={"Compétence"} className="competence-titre" />
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '50%', marginLeft: '50px' }}>
                    {!spleet ?
                        <div style={{ display: "flex", height: '70%' }}>
                            <motion.div
                                style={{ position: "absolute"}}
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
                            {dvdList.map((dvd, index) => (
                                <motion.div
                                    key={index}
                                    style={{ position: "absolute"}}
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
                        </div>
                    }
                </div>
                <motion.div
                    initial={{ x: 1000, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <img ref={imgRef} alt="wii" src="wii.png" style={{ height: 400}} />
                </motion.div>
            </div>
            {selectedDVD === 0 &&
                <LangageC />
            }
        </div>
    );
}


export default Competence;
