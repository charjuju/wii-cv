import React from 'react';
import { AnimationDecente, AnimationApparetDeLaDroite, PopAnimation, TapingAnimationTextRembow} from './Tools/text'

export default function LangageCPP() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards' }}>
            <TapingAnimationTextRembow el="h1" text={"Langage C++"} className="competence-titre" />

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{ width: '50%' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px'}}>Découverte du C++</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>J'ai commencé ça en faisant du C orienté objet (ce n'est pas fameux) mais ça faisait partie de la piscine de C++ proposée par Epitech. Vu que je connaissais déjà le C, j'ai vite pris en main le langage même si j'avoue j'étais encore bien accroché à mes amis malloc</p>
                </div>
                <PopAnimation style={{ height: '600px', width: '50%' }}>
                    <div style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1516510469374-3e1d9d2e2522')`,
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
                    backgroundImage: `url('https://images.unsplash.com/photo-1564507592335-fc079f065835')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#3366ff',
                    height: '600px',
                    width: '50%',
                }} >
                </div>
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <AnimationDecente><h1 style={{ fontSize: '50px', marginLeft: '10px'}}>Quoi tu connais pas le C++! hé hé...</h1></AnimationDecente>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>C'est un langage de programmation puissant et flexible. Imagine les jeux vidéo hyper réalistes, les logiciels bancaires et les systèmes d'exploitation : c'est possible avec le C++ ! C'est un langage compilé et orienté objet. Il te permet de créer du code précis et efficace, et de l'organiser de manière propre et réutilisable.</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <AnimationApparetDeLaDroite><h1 style={{ fontSize: '50px'}}>Le c++ et moi.</h1></AnimationApparetDeLaDroite>
                <p style={{ fontSize: '30px', width: '100%' }}>basiquement comme le c vu que c'est mon ecole qui me l'appris, comment ça t'as pas lu la partie sur le c?</p>
                <p style={{ fontSize: '30px', width: '100%'}}>C'est le 3ème langage que j'ai appris après le C et le Python.

Les projets que j'ai réalisés sont :

    R-Type, ce fameux jeu, mais là on l'a fait en multijoueur en ligne.
    Bomberman en ligne aussi, c'était cool aussi.
    Un simulateur de composants électroniques. C'est ce projet qui m'a fait comprendre l'importance des objets et de l'héritage (et là, je parle pas de celui de ta mamie... Ouais, pas fameuse celle-là...).
</p>
            </div>
        </div>
    )
}
