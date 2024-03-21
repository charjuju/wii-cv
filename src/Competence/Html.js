import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function LangageHTML() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Langage HTML</h1></AnimationApparetDeLaDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1583485516152-ea3f3c28b845')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                </PopAnimation>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>HTML</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>J'ai découvert ça au collège pour faire le malin devant les copains. Je me prenais trop pour un hacker, un peu la honte quand j'y repense.</p>
                </div>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1593641236469-1b734c9adbf2')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#e34c26',
                    height: '600px',
                    width: '50%',
                }} />
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Les Blagues de l'HTML</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>HTML, le "langage" où les balises font la loi. Non les "man" ce n'est pas du code... En vrai? JSON aussi alors? C'est pas grave, c'est super pratique pour faire des sites web. Et tu crois qu'il est fait avec quoi celui que tu regardes là?</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Basiquement ce que je vaux?</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>Bah là pour le coup, tu peux voir ça par toi-même en te baladant sur le site ! Indice : il est fait en React.</p>
            </div>
        </div>
    );
}
