import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ItalicToggleProps {
  italic: boolean;
  setItalic: (italic: boolean) => void;
  fontFamily: string;
  fontWeight: string;
}

const ItalicToggle: React.FC<ItalicToggleProps> = ({ italic, setItalic, fontFamily, fontWeight }) => {
  const [supportsItalic, setSupportsItalic] = useState(false);

  useEffect(() => {
    axios.get(`/path/to/google/fonts.json`)
      .then(response => {
        const fontData = response.data[fontFamily];
        if (fontData) {
          setSupportsItalic(fontData.variants.includes(`${fontWeight}italic`));
        }
      })
      .catch(error => {
        console.error('Error checking italic support', error);
      });
  }, [fontFamily, fontWeight]);

  return (
    <label>
      <input
        type="checkbox"
        checked={italic}
        onChange={e => setItalic(e.target.checked)}
        disabled={!supportsItalic}
      />
      Italic
    </label>
  );
}

export default ItalicToggle;
