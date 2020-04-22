import * as React from "react";
import { render } from "react-dom";
import Editor, { EditorProps, Monaco, monaco } from "@monaco-editor/react";

import "./styles.css";

type EditorDidMountParams = Parameters<EditorProps["editorDidMount"]>;

const onEditorReady = (m: Monaco) => (
  _getValue: EditorDidMountParams[0],
  editor: EditorDidMountParams[1]
) => {
  editor.addAction({
    id: "myPaste",
    label: "423",
    keybindings: [m.KeyMod.CtrlCmd | m.KeyCode.KEY_V],
    contextMenuGroupId: "9_cutcopypaste",
    run: editor => {
      alert("Add your custom pasting code here");
    }
  });
};

function App() {
  const [m, setMonaco] = React.useState();
  monaco.init().then(setMonaco);
  return (
    <div className="App">
      <h1>Testing context menu customisation</h1>
      {m && (
        <Editor
          theme="dark"
          height={400}
          language={"typescript"}
          value={"const hello : number = 1;"}
          editorDidMount={onEditorReady(m)}
        />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
