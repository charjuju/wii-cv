import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation } from './Tools/text';

export default function StrapiPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Strapi mama c'est sympa</h1></AnimationApparetDeLaDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>La Découverte de Strapi</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>Strapi et pas Astrapi... la BD... YES Strapi c'est un pote qui me l'a conseillé et il a bien fait le boug, merci à lui</p>
                </div>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1564507592333-5d2f80bae1f0')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                </PopAnimation>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1590935513660-0c2427651ab1')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                </PopAnimation>
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Strapi le CMS</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>C'est quoi Strapi? Agily.fr nous dit ça: </p>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Strapi est un système de gestion de contenu (CMS) headless open source qui fournit un back-end personnalisable et sécurisé pour vos applications web. Cette technologie 100% JavaScript a été développée par une start-up française.</p>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>En gros ça va t'aider à faire ton backend en toute simplicité et en plus c'est français Cocorico</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Mes Expériences Strapiques</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>Merci Strapi et merci encore, j'ai eu du mal à te mettre dans un Docker mais tu m'as fait économiser pas mal de temps</p>
                <p style={{ fontSize: '30px', width: '100%' }}>Pour le coup, mon site CV n'a pas de backend donc bhaaaa, tu vas devoir me croire sur parole quand je te dis que je sais m'en servir mon pote</p>
            </div>
        </div>
    );
}
