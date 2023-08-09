import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter hashType="hashbang">
      <Header/>
      <Navbar/>
      <Main/>
      <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;
