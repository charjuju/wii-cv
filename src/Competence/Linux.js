import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation, AnimationApparetDeLaPasDroite} from './Tools/text';

export default function LinuxPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <AnimationApparetDeLaPasDroite><h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Linux</h1></AnimationApparetDeLaPasDroite>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1565603811047-9ec2e7762231')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                </PopAnimation>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px' }}>Linux Linux Linux Linux et Linux</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>J'ai découvert Linux grâce à mon école Epitech, et depuis, je suis un pingouin. En vrai, la scène était dure à voir, on m'a dit de m'asseoir et de créer des dossiers et des fichiers sans utiliser le clic droit mais plutôt avec un terminal...</p>
                </div>
            </div>
            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1560807707-79263b92b6ac')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#bdc3c7',
                    height: '600px',
                    width: '50%',
                }} />
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Les Pingouins de Linux</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Linux, c'est un système d'exploitation qui partage tout, donc tu peux tout faire dessus, t'es super libre et donc ça fait que c'est un petit paradis pour les développeurs. Si ta grand-mère te demande ce que c'est, tu lui dis que c'est un ordinateur, tqt pas besoin d'en dire plus. Mais si c'est un mec qui est vraiment intéressé, tu lui dis qu'il faut qu'il teste et surtout, SURTOUT, il est obligé d'utiliser le terminal ! Super important ça, je sais même pas pourquoi y'a un bureau, je m'en sers pas.</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px' }}>Mon seteux Linuxueux, ha ha et pas luxueux</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>Au début, forcément t'as du mal, mais une fois que tu connais le terminal, tu ne fais que ça. On oublie vite la souris, drôle d'idée la souris, c'est pour jouer à CS:GO ça !</p>
                <p style={{ fontSize: '30px', width: '100%' }}>J'en ai testé quelques-uns des Linux : Fedora, Manjaro, Kali, et finalement on est bien sur Ubuntu. Discord ne bug pas et j'ai un driver pour ma carte wifi (pour Fedora et Manjaro j'ai dû passer par un truc russe, je savais même pas ce que je lisais mais j'ai installé et ça a marché donc yes).</p>
            </div>
        </div>
    );
}
