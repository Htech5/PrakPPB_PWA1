import { useMemo, useState } from 'react';
import GUNS from '../data/guns.js';
import GunCard from '../components/GunCard.jsx';

const TYPES = ['All', ...new Set(GUNS.map((g) => g.type))];

function Catalog({ onAdd }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [sortKey, setSortKey] = useState(null); // 'name' | 'price' | null
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortAsc((a) => !a);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = GUNS.filter(
      (g) =>
        (type === 'All' || g.type === type) &&
        (!q ||
          g.name.toLowerCase().includes(q) ||
          g.type.toLowerCase().includes(q) ||
          g.caliber.toLowerCase().includes(q)),
    );
    if (sortKey) {
      list.sort((a, b) => {
        const diff =
          sortKey === 'price' ? a.price - b.price : a.name.localeCompare(b.name);
        return sortAsc ? diff : -diff;
      });
    }
    return list;
  }, [query, type, sortKey, sortAsc]);

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed
          with its type, caliber, and price — nothing else.
        </p>
      </section>
      <section>
        <div className="filters">
          <label className="field">
            <span className="field-label">Cari</span>
            <input
              className="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, type, or caliber"
            />
          </label>
          <div className="chips" role="group" aria-label="Filter by type">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={t === type ? 'chip active' : 'chip'}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-controls" role="group" aria-label="Sort">
          <button
            type="button"
            className={sortKey === 'name' ? 'chip active' : 'chip'}
            onClick={() => toggleSort('name')}
          >
            Name {sortKey === 'name' ? (sortAsc ? '↑' : '↓') : ''}
          </button>
          <button
            type="button"
            className={sortKey === 'price' ? 'chip active' : 'chip'}
            onClick={() => toggleSort('price')}
          >
            Price {sortKey === 'price' ? (sortAsc ? '↑' : '↓') : ''}
          </button>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{shown.length} pieces</span>
        </div>

        {shown.length === 0 ? (
          <p className="empty">
            No guns match “{query.trim() || type}”. Clear the search or pick
            another type.
          </p>
        ) : (
          <ul className="stock">
            {shown.map((gun) => (
              <GunCard key={gun.name} gun={gun} onAdd={onAdd} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Catalog;
