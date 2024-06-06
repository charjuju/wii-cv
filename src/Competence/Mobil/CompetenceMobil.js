import React, { useState } from 'react';
import './CompetenceMobil.css';
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

function CompetenceMobil() {
    const [currentCompetence, setCurrentCompetence] = useState(dvdList[0].result);
    return (
        <div className="competence-container">
            <div style={{ height: '1000px' }}>
                {currentCompetence}
            </div>
            <div className="nav-bar">
                {dvdList.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        alt={`compétence-${index}`}
                        className="nav-icon"
                        onClick={() => setCurrentCompetence(item.result)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CompetenceMobil;
