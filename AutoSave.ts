interface EditorState {
  text: string;
  fontFamily: string;
  fontWeight: string;
  italic: boolean;
}

const AutoSave = {
  save: (state: EditorState) => {
    localStorage.setItem('textEditorState', JSON.stringify(state));
  },
  load: (): EditorState | null => {
    const savedState = localStorage.getItem('textEditorState');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return null;
  }
}

export default AutoSave;
