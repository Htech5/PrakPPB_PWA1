import { useRef } from 'react'
import GUNS from '../data/guns.js'

const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cartCount, cart, onQty }) {
  const popup = useRef(null)
  const items = Object.entries(cart).map(([name, qty]) => ({
    gun: GUNS.find((g) => g.name === name),
    qty,
  }))
  const total = items.reduce((sum, { gun, qty }) => sum + gun.price * qty, 0)

  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <button type="button" className="cart-btn" onClick={() => popup.current.showModal()}>
        Cart
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>

      <dialog
        className="popup cart-popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <h3 className="display">Cart</h3>
        {items.length === 0 ? (
          <p>Cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {items.map(({ gun, qty }) => (
              <li key={gun.name} className="cart-item">
                <span className="name">{gun.name}</span>
                <span className="qty-control">
                  <button type="button" onClick={() => onQty(gun.name, qty - 1)}>
                    -
                  </button>
                  <span>{qty}</span>
                  <button type="button" onClick={() => onQty(gun.name, qty + 1)}>
                    +
                  </button>
                </span>
                <span className="price">${(gun.price * qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="cart-total">Total: ${total.toLocaleString()}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </header>
  )
}

export default Header
