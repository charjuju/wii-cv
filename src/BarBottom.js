import { useEffect, useState } from 'react';

const DigitalClock = () => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    // Fonction pour obtenir l'heure actuelle
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours} ${minutes}`;
    }

    // Mettre à jour l'heure toutes les secondes
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ textAlign: 'center', margin: '0', padding: '0' }}>
            <p className="digital-clock-time">{currentTime}</p>
        </div>
    );
};

const FormattedDate = () => {
    const [currentDate, setCurrentDate] = useState(getFormattedDate());

    function getFormattedDate() {
        const daysOfWeek = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
        const months = [
            'jan', 'fév', 'mar', 'avr', 'mai', 'juin',
            'juil', 'aoû', 'sep', 'oct', 'nov', 'déc'
        ];

        const now = new Date();
        const dayOfWeek = daysOfWeek[now.getDay()];
        const dayOfMonth = now.getDate().toString().padStart(2, '0');
        const month = months[now.getMonth()];

        return `${dayOfWeek} ${dayOfMonth}/${month}`;
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(getFormattedDate());
        }, 60000); // Mettre à jour toutes les 60 secondes (1 minute)
        return () => clearInterval(timer);
    }, []);

    const dateStyle = {
        fontFamily: 'sans-serif',
        fontSize: '60px',
        margin: '0',
        color: 'gray',
        // Ajoutez d'autres styles au besoin
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <p style={dateStyle}>{currentDate}</p>
        </div>
    );
};

export default function BarBottom() {
    const [pingText, setPingText] = useState('');

    const showPingText = (message) => {
        setPingText(message);

        setTimeout(() => {
            setPingText('');
        }, 1000);
    };

    const copyMailToClipboard = () => {
        const textToCopy = 'marzat.jude3@gmail.com';
      
        // Créer un élément textarea temporaire
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
      
        // Rendre le textarea invisible
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
      
        document.body.appendChild(textarea);
      
        // Sélectionner et copier le texte dans le presse-papiers
        textarea.select();
        document.execCommand('copy');
      
        // Nettoyer et retirer le textarea
        document.body.removeChild(textarea);
      
        // Afficher un message ou déclencher une animation par exemple
        console.log('Adresse e-mail copiée :', textToCopy);
      };

    return (
        <div style={{ position: 'fixed', bottom: '0px', width: '100vw' }}>
            <div className='digital-clock-conteneur'>
                <DigitalClock />
            </div>
            <div style={{ position: 'absolute', width: '100%', top: '150px' }}>
                <FormattedDate />
            </div>
            <img alt='bot bottom' style={{ width: '100%', zIndex: '1' }} src='/botBat.png' />
            <img alt='Wii button' style={{ width: '9.6%', position: 'absolute', left: '5.5%', top: '12%', zIndex: '2', filter: 'drop-shadow(10px 20px 1px rgba(0, 0, 0, 0.2))' }} src='/wiiButton.png' />
            <img onClick={() => {showPingText('Mail copié dans le presse-papiers'); copyMailToClipboard()}} alt='mail button' style={{ width: '9.6%', position: 'absolute', right: '5.5%', top: '12%', zIndex: '2', filter: 'drop-shadow(10px 20px 1px rgba(0, 0, 0, 0.2))' }} src='/mail.png' />
            {pingText && (
                <div className="ping-text">
                    {pingText}
                </div>
            )}
        </div>

    )
}