import { useEffect, useState } from 'react';
import './App.css';
import './button.css';
import './input.css';
import './texte.css';
import wiiSelectSound from './sond/Wii - System BIOS Wii - Sound Effects/Wii BIOS/WSD-SELECT.wav';
import WiiTv from './WiiTv';
import BarBottom from './BarBottom'

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
    const wiiTvInfo = [];
    
    console.log("LOAD: information wii tv")
    for (let i = 0; i < 48; i++) {
      wiiTvInfo.push({
        nom: 'unknown',
        url: 'unknown',
        imgFond: 'unknown',
        imgCover: 'unknown',
      });
    }
    wiiTvInfo[0] = { img: "jujuDisc", url: '/*' }
    setTvTabInfo(wiiTvInfo);
  }, [])

  const playSoundWiiSelectSound = () => {
    const audio = new Audio(wiiSelectSound);
    audio.volume = 0.5;
    audio.play();
  };

  return (
    <div className="App" onClick={playSoundWiiSelectSound}>
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
