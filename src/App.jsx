import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import InstallButton from './components/InstallButton.jsx';
import Catalog from './pages/Catalog.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import './App.css';

function App() {
  const [tab, setTab] = useState('Catalog');

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} />
      <main className="main">
        {tab === 'Catalog' && <Catalog />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>
      <Footer />
      <InstallButton />
    </div>
  );
}

export default App;