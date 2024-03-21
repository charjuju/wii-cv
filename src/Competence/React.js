import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function LangageReact() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Langage React</h1></AnimationApparetDeLaDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1593642632822-1c35d523af2f')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} >
                    </div>
                </PopAnimation>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>Découverte de React</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>J'ai découvert React lors de mes études, et c'était une révélation pour moi. Quand tu passes du PHP à ça, tu te demandes pourquoi tu as fait du PHP.</p>
                </div>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1579532626964-b58891d31a7e')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#1a472e',
                    height: '600px',
                    width: '50%',
                }} >
                </div>
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Pourquoi React ?</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>React est largement utilisé pour la construction d'interfaces utilisateur interactives. C'est cool, ça facilite beaucoup la création d'applications interactives.</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Maîtrise de React</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>J'ai fait beaucoup d'applications React pour tout et rien. Par exemple, tape "<a href="https://schlagfactor.netlify.app" target="_blank" rel="noopener noreferrer">Schlag Factor</a>", normalement je suis le premier résultat. Je ne sais pas si je devrais mettre ça sur mon site CV...</p>
            </div>
        </div>
    );
}
