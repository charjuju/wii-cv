import WiiMenu from './WiiMenu'
import Competence from './Competence/Competence'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div>
        <div className="container">
          <Routes>
          <Route path="/" element={<WiiMenu />} />
          <Route path="/Compétence" element={<Competence />} />
          <Route path="/*" element={<p>404</p>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

