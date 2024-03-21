import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function GitHub() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Découverte de GitHub</h1></AnimationApparetDeLaDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1578471457141-4a167c03d52f')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                </PopAnimation>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>Le fameux et révolutionnaire GitHub</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>Deuxième truc que j'ai fait après m'être baladé sur Linux, c'est push sur GitHub. Epitech me l'a vite appris et m'a vite fait comprendre les bonnes pratiques de push régulièrement et surtout de pull avant de travailler et avant de pusher. GitHub, c'est indispensable pour coder en groupe voire même pour coder, c'est tellement pratique.</p>
                </div>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1527176930608-2709d108b641')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#1a472e',
                    height: '600px',
                    width: '50%',
                }} />
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Je ne sais pas si j'ai vraiment besoin d'expliquer, mais si, je vais le faire</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>GitHub permet de partager son travail, ça c'est super nickel, MAIS PAS QUE ! Ça permet aussi de sauvegarder son travail bien en sécurité des mauvaises modifications et de travailler en parallèle et en collaboration avec tes collègues.</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Mes Expériences GitHub</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>Tous les projets sont sur GitHub, alors on n'oublie pas de Git pull, non vraiment git pull s'il te plaît juste pour être sûr</p>
            </div>
        </div>
    );
}
