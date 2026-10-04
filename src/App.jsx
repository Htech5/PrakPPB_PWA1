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
  const [cart, setCart] = useState({}); // { [gunName]: qty }

  const addToCart = (name) =>
    setCart((c) => ({ ...c, [name]: (c[name] || 0) + 1 }));

  const setQty = (name, qty) =>
    setCart((c) => {
      if (qty <= 0) {
        const next = { ...c };
        delete next[name];
        return next;
      }
      return { ...c, [name]: qty };
    });

  const cartCount = Object.values(cart).reduce((n, q) => n + q, 0);

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cartCount} cart={cart} onQty={setQty} />
      <main className="main">
        {tab === 'Catalog' && <Catalog onAdd={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>
      <Footer />
      <InstallButton />
    </div>
  );
}

export default App;