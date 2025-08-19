import WiiMenu from './WiiMenu'
import P2PFileTransfer from './Competence/P2PFileTransfer'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Gelarie from './Galerie/Galerie'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div>
        <div className="container">
          <Routes>
          <Route path="/" element={<WiiMenu />} />
          <Route path="/Compétence" element={<P2PFileTransfer />} />
          <Route path="/Galerie" element={<Gelarie />} />
          <Route path="/*" element={<p>404</p>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

