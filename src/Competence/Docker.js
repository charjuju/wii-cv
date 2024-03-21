import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function DecouverteDocker() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Découverte de Docker</h1></AnimationApparetDeLaDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>Plongée dans l'Océan Docker, parce que c'est une baleine Bateaux!</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>J'ai découvert Docker de mon côté comme un grand, ça paraît complexe au début mais finalement c'est relativement facile.</p>
                </div>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1604087475578-3b037c33775b')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} >
                    </div>
                </PopAnimation>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1589408208001-df9e03f92db7')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#124559',
                    height: '600px',
                    width: '50%',
                }} >
                </div>
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>C'est quoi cette histoire de baleine? C'est quoi Docker?</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Docker en gros c'est comme une machine virtuelle mais non, ça permet de 
                    déployer et gérer des applications dans des conteneurs. Un conteneur est un environnement léger et isolé qui contient tout ce dont ton application a besoin pour s'exécuter si tu as bien configuré ton conteneur bien sûr!</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Mes Expériences Docker</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>Je m'en sers surtout pour mettre le backend d'un site ou le site dedans, ça me permet d'être sûr qu'il va marcher si je le lance sur une autre machine.</p>
            </div>
        </div>
    );
}
