import { useState } from 'react';

import Stats from './Stats';
import useStats from '../utils/useStats';

export default function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState('AUS');
  const { stats: countries, loading, error } = useStats(
    'https://covid19.mathdro.id/api/countries'
  );

  if (!countries) return <p>Loading...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <h2>Currently Showing {selectedCountry} </h2>
      <select onChange={e => setSelectedCountry(e.target.value)}>
        {Object.entries(countries.countries).map(([country, code]) => {
          return (
            <option
              key={code}
              selected={selectedCountry === code.iso3}
              value={code.iso3}
            >
              {code.name}
            </option>
          );
        })}
      </select>
      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}
      ></Stats>
    </div>
  );
}
