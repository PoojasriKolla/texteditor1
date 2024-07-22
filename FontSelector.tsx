import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FontSelectorProps {
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fontFamily, setFontFamily }) => {
  const [fonts, setFonts] = useState<string[]>([]);

  useEffect(() => {
    axios.get('/path/to/google/fonts.json')
      .then(response => {
        setFonts(Object.keys(response.data));
      })
      .catch(error => {
        console.error('Error fetching fonts', error);
      });
  }, []);

  return (
    <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
      {fonts.map(font => (
        <option key={font} value={font}>{font}</option>
      ))}
    </select>
  );
}

export default FontSelector;
