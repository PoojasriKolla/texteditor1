import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FontSelector from './FontSelector';
import WeightSelector from './WeightSelector';
import ItalicToggle from './ItalicToggle';
import AutoSave from '../utils/AutoSave';

const EditorContainer = styled.div`
  margin: 20px;
`;

const TextArea = styled.textarea<{ fontFamily: string, fontWeight: string, fontStyle: string }>`
  width: 100%;
  height: 300px;
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
  font-style: ${props => props.fontStyle};
`;

const TextEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [fontWeight, setFontWeight] = useState('400');
  const [italic, setItalic] = useState(false);

  useEffect(() => {
    const savedState = AutoSave.load();
    if (savedState) {
      setText(savedState.text);
      setFontFamily(savedState.fontFamily);
      setFontWeight(savedState.fontWeight);
      setItalic(savedState.italic);
    }
  }, []);

  useEffect(() => {
    AutoSave.save({ text, fontFamily, fontWeight, italic });
  }, [text, fontFamily, fontWeight, italic]);

  return (
    <EditorContainer>
      <FontSelector fontFamily={fontFamily} setFontFamily={setFontFamily} />
      <WeightSelector fontFamily={fontFamily} fontWeight={fontWeight} setFontWeight={setFontWeight} />
      <ItalicToggle italic={italic} setItalic={setItalic} fontFamily={fontFamily} fontWeight={fontWeight} />
      <TextArea
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontStyle={italic ? 'italic' : 'normal'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </EditorContainer>
  );
}

export default TextEditor;
