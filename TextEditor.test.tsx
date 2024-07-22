import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextEditor from './TextEditor';

test('renders TextEditor', () => {
  const { getByText, getByRole } = render(<TextEditor />);
  const italicToggle = getByText(/Italic/i);
  expect(italicToggle).toBeInTheDocument();
  
  const textArea = getByRole('textbox');
  fireEvent.change(textArea, { target: { value: 'Hello World' } });
  expect(textArea.value).toBe('Hello World');
});
