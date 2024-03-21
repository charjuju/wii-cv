import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function LangageJavaScript() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Langage JavaScript</h1></AnimationApparetDeLaDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>L'aventure JavaScript</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>Je me suis fait grâce à la magie d'internet, comme un grand oui monsieur !</p>
                </div>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1520869563818-35a4710b6e10')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                </PopAnimation>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1560476179-3f7d2d485c16')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#ffd700',
                    height: '600px',
                    width: '50%',
                }} />
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Le JavaScript</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Lui, pour le coup, c'est de la programmation, pas comme ses copains HTML et CSS. Il est utilisé pour faire des sites web ou des applications, avec lui tout est plus stylé.</p>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>En plus, il y a des bibliothèques comme React, Vue.js, ou Angular, qui facilitent la chose.</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Mon Expérience JavaScript</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>J'aime bien le JavaScript, c'est cool, tu peux juger de mon niveau avec ce site. En vrai, balade-toi et admire. J'ai fait beaucoup de projets mais ils ne sont pas forcément pros, donc je ne vais pas les partager ici, mais on peut toujours en parler en privé mon pote.</p>
            </div>
        </div>
    );
}
