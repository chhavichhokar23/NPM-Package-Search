import React, { useState } from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setResults([]);

        try {
            const res = await fetch(`https://npm-package-search-87kd.onrender.com/api/search?q=${query}`);
            const data = await res.json();
            setResults(data.objects || []);
        } catch {
            alert('Failed to fetch results.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Package Finder</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for npm packages..."
                />
                <button onClick={handleSearch}><FaSearch size={18} /></button>
            </div>

            {loading && <p style={{ textAlign: 'center' }}>Searching...</p>}

            <div className="results-grid">
                {results.map((pkg) => (
                    <div key={pkg.package.name} className="package-card">
                        <h3>
                            <a
                                href={`https://www.npmjs.com/package/${pkg.package.name}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#fff', textDecoration: 'none' }}
                            >
                                {pkg.package.name}
                            </a>
                        </h3>
                        <p>{pkg.package.description}</p>
                        <div className="install-code">
                            npm install {pkg.package.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
