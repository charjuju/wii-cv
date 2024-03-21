import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function LangageCSS() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Langage CSS</h1></AnimationApparetDeLaDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1541697438-b23c33954a66')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                </PopAnimation>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>CSS</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>Ça va de pair avec l'HTML, il n'y a pas l'un sans l'autre, donc j'ai découvert ça au collège aussi :)</p>
                </div>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1561111694-1d45fe29c0b2')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#345995',
                    height: '600px',
                    width: '50%',
                }} />
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>CSS ça rend tout joli</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Et oui les coco, si vous ne le saviez pas, le CSS c'est pour rendre le site joli. Ça permet de changer la taille du texte, de changer les couleurs, de mettre des animations et tout et tout, man.</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Je ne suis pas designer mais je ne suis pas moins fier</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>En vrai, je sais bien recopier les figma des potes les designers, c'est un peu comme redessiner les tableaux que je fais. Je peux le dessiner, mais je n'ai pas l'âme de l'artiste. Tu trouves que mon site est joli ? Merci UwU</p>
            </div>
        </div>
    );
}
