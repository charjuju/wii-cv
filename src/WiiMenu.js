import { useEffect, useState } from 'react';
import './App.css';
import './button.css';
import './input.css';
import './texte.css';
import wiiSelectSound from './sond/Wii - System BIOS Wii - Sound Effects/Wii BIOS/WSD-SELECT.wav';
import wiiStartSound from './sond/Wii - System BIOS Wii - Sound Effects/Wii BIOS/WII-START.wav';
import wiiThemSound from './sond/01. Main Menu.mp3';
import WiiTv from './WiiTv';
import BarBottom from './BarBottom'

function EcranNoireAceuille() {
  const [drow, setDrow] = useState(true)
  const [nothing, setNothing] = useState(false)

  useEffect(() => {
    if (!drow) {
      const timeout = setTimeout(() => {
        setNothing(true);
      }, 1000);
      const playSoundWiiStartSound = () => {
        const audio = new Audio(wiiStartSound);
        audio.volume = 0.5;
        audio.play();
      };
      const playSoundWiiThemSound = () => {
        const audio = new Audio(wiiThemSound);
        audio.volume = 0.5;
        audio.loop = true;
        audio.play();
      };
      playSoundWiiThemSound()
      playSoundWiiStartSound()

      return () => clearTimeout(timeout);
    }
  }, [drow]);

  return (
    <div>
      {drow ?
        <div onClick={() => setDrow(false)} style={{ position: 'fixed', top: '0px', left: '0px', width: '100vw', height: '100vh', backgroundColor: 'black', zIndex: '99999', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '80vw', height: '100vh', backgroundColor: 'black', zIndex: '99999', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img style={{ width: '5vw', height: '5vw' }} alt='attention' src='attention.png' />
              <p style={{ color: 'white', textAlign: 'center', fontSize: '4vw' }}>ATTENTION-SANTÉ ET SÉCURITÉ</p>
            </div>
            <p style={{ color: 'white', textAlign: 'center', fontSize: '3vw' }}>VOUS VOUS APPRÊTEZ À ENTRER SUR LE SITE CV DE JUDE MARZAT. PAS BESOIN DE MODE D'EMPLOI, ET MERCI DE VOTRE INTÉRÊT.</p>
            <p style={{
              color: 'white',
              textAlign: 'center',
              fontSize: '3vw',
              animation: 'blinkingText 2s infinite'
            }}>Appuyer sur le click gauche pour continuer</p>
          </div>
        </div>
        :
        <div>
          {!nothing &&
            <div style={{ position: 'fixed', top: '0px', left: '0px', width: '100vw', height: '100vh', backgroundColor: 'black', zIndex: '99999', animation: 'black-to-invisible 2s forwards' }}>
            </div>
          }
        </div>
      }
    </div>
  )
}

function App() {
  const [tvTabInfo, setTvTabInfo] = useState([])

  function updateTvTabInfo(index, info) {
    if (index >= 0 && index < tvTabInfo.length) {
      const updatedTvTabInfo = [...tvTabInfo];
      updatedTvTabInfo[index] = info;
      setTvTabInfo(updatedTvTabInfo);
    } else {
      console.error("ERROR: L'index fourni est invalide!");
    }
  };

  useEffect(() => {
    let wiiTvInfo = [];

    console.log("LOAD: information wii tv")
    for (let i = 0; i < 48; i++) {
      wiiTvInfo.push({
        nom: 'unknown',
        url: 'unknown',
        imgFond: 'wii-channel-static-empty-wii-channel.gif',
        imgCover: 'wii-channel-static-empty-wii-channel.gif',
      });
    }
    wiiTvInfo[0].imgCover = "regard.jpg"
    console.log(wiiTvInfo)
    setTvTabInfo(wiiTvInfo);
  }, [])

  const playSoundWiiSelectSound = () => {
    const audio = new Audio(wiiSelectSound);
    audio.volume = 0.5;
    audio.play();
  };

  return (
    <div className="App" onClick={playSoundWiiSelectSound}>
      <EcranNoireAceuille />
      <div className='all-tv-conteneur'>
        {tvTabInfo.map((tv, index) => (
          <div key={index} className="tv-info">
            <WiiTv updateTvTabInfo={updateTvTabInfo} info={{ index: index, res: tv }} />
          </div>
        ))}
      </div>
      <BarBottom />
    </div>
  );
}

export default App;
