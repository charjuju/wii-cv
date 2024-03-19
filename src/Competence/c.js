export default function LangageC() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', alignItems: 'center', animation: 'Apparition 2s forwards'}}>
            <h1 style={{ fontSize: '100px', textAlign: 'center', width: '100%' }}>Langage C</h1>

            <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
                <div style={{ width: '50%' }}>
                    <h1 style={{ fontSize: '50px' }}>Comment j'ai découvert le C</h1>
                    <p style={{ fontSize: '40px', marginLeft: '40px' }}>J'ai découvert le langage C à l'école, plus précisément à Epitech. C'était le tout premier langage que j'ai vraiment appris en profondeur, et c'est là que j'ai développé une solide base en programmation.</p>
                </div>
                <div style={{
                    backgroundImage: `url('https://www.epitech.digital/wp-content/uploads/2022/11/Epitech_Digital_2022_bdx_photos_sites_web_2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '600px',
                    width: '50%',
                }} >
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '80%', justifyContent: 'space-around' }}>
                <div style={{ width: '50%', overflowY: 'scroll', height: '600px' }}>
                    <h1 style={{ fontSize: '50px', marginLeft: '10px' }}>Quoi tu connais pas?</h1>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Le langage C est un langage de programmation de bas niveau, ce qui signifie qu'il offre un contrôle direct sur la mémoire et les ressources système.</p>
                    <p style={{ fontSize: '40px', marginLeft: '60px' }}>Il est largement utilisé dans le développement de systèmes d'exploitation, de logiciels embarqués, de pilotes de périphériques et bien plus encore. Sa syntaxe est connue pour être concise et puissante, ce qui en fait un choix populaire pour les programmeurs souhaitant travailler au niveau système.</p>
                </div>
                <div style={{
                    backgroundImage: `url('https://i.redd.it/nmuax05zxoab1.gif')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '600px',
                    width: '50%',
                }} >
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
                <h1 style={{ fontSize: '50px' }}>Comment je me débrouille ?</h1>
                <p style={{ fontSize: '30px', width: '100%' }}>Je me débrouille plutôt bien en langage C. </p>
                <p style={{ fontSize: '30px', width: '100%' }}>J'ai acquis de l'expérience dans des domaines avancés tels que le réseau, les mutex, les sémaphores et les forks...</p>
                <p style={{ fontSize: '30px', width: '100%' }}>J'ai même développé des jeux en C, ce qui m'a permis d'explorer la gestion des ressources et les algorithmes de jeu. Ces projets m'ont également offert l'occasion de m'entraîner à résoudre des problèmes complexes et à optimiser les performances de mes applications.</p>
            </div>
        </div>
    )
}
