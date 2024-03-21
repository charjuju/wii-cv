import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function LangagePython() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Langage Python</h1></AnimationApparetDeLaDroite>

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
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>Non c'est la jungle ce truc ?</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>C'est le langage que j'ai le plus entendu parler et de loin à mon avis. J'aime beaucoup regarder les vidéos qui comparent Python et le langage C, mais ce qu'ils ne savent pas, c'est que c'est fait en C le Python. Ha ha les noobs, bref.</p>
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
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Le Python, mais pourquoi tu dis que c'est la jungle ?</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Python, c'est cool, pas grâce au Python, mais surtout grâce à sa communauté. Et si ok, le Python c'est facile, donc c'est cool aussi, j'avoue. Mais en Python, basiquement, tout est fait presque, donc t'as pas besoin de réinventer la roue. Aussi, ce qu'il faut savoir, c'est que le Python, c'est un langage qui n'est pas compilé, donc il faut avoir installé Python sur ta machine si tu veux que ça fonctionne.</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Mes expériences avec Python</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>J'ai testé de faire du Django, je m'en suis bien tiré pour une première, je crois... Sinon, j'ai surtout travaillé sur des algorithmes comme faire un pathfinding ou des calculs de matrices pour faire des rotations à des objets, que des trucs cool en gros.</p>
            </div>
        </div>
    );
}
