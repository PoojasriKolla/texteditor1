import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeightSelectorProps {
  fontFamily: string;
  fontWeight: string;
  setFontWeight: (fontWeight: string) => void;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({ fontFamily, fontWeight, setFontWeight }) => {
  const [weights, setWeights] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`/path/to/google/fonts.json`)
      .then(response => {
        const fontData = response.data[fontFamily];
        if (fontData) {
          setWeights(fontData.variants.map((variant: string) => variant.replace('italic', '').trim()));
        }
      })
      .catch(error => {
        console.error('Error fetching font weights', error);
      });
  }, [fontFamily]);

  return (
    <select value={fontWeight} onChange={e => setFontWeight(e.target.value)}>
      {weights.map(weight => (
        <option key={weight} value={weight}>{weight}</option>
      ))}
    </select>
  );
}

export default WeightSelector;
