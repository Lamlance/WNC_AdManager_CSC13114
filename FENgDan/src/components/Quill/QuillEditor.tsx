import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

interface QuillEditorProps {
  forwardedRef: React.RefObject<Quill>;
}

function QuillEditor({ forwardedRef }: QuillEditorProps) {
  const editorEleRef = useRef<HTMLDivElement | null>(null);
  const toolbarEleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeEditor = () => {
      if (
        forwardedRef.current ||
        !editorEleRef.current ||
        !toolbarEleRef.current
      )
        return;

      const quill = new Quill(editorEleRef.current, {
        modules: {
          toolbar: {
            container: toolbarEleRef.current,
            handlers: {},
          },
        },
        theme: "snow",
      });

      const mutableRef = forwardedRef as React.MutableRefObject<Quill | null>;
      mutableRef.current = quill;
    };

    initializeEditor();
  }, [forwardedRef]);

  return (
    <>
      <div ref={toolbarEleRef} className="ql-toolbar ql-snow flex flex-row">
        <span className="ql-formats">
          <select className="ql-font"></select>
          <select className="ql-size"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-video"></button>
        </span>
      </div>
      <div ref={editorEleRef} style={{ height: "250px" }}></div>
    </>
  );
}

export default QuillEditor;
