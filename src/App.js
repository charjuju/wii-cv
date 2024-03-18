import WiiMenu from './WiiMenu'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div>
        <div className="container">
          <Routes>
            <Route path="/" element={<WiiMenu />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

