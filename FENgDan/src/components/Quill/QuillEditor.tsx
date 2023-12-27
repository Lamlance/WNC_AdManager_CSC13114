import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { Button } from "antd";

function QuillEditor() {
  const editorEleRef = useRef<HTMLDivElement | null>(null);
  const toolbarEleRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);

  function initalizeEditor() {
    if (editorRef.current) return;
    if (!editorEleRef.current || !toolbarEleRef.current) return;

    const quill = new Quill(editorEleRef.current, {
      modules: {
        toolbar: {
          container: toolbarEleRef.current,
          handlers: {
            image: customImgHanlder,
          },
        },
      },
      theme: "snow",
    });

    editorRef.current = quill;
  }

  function customImgHanlder() {
    if (!editorRef.current) return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async function () {};
  }

  function save_quill() {
    if (!editorRef.current) return;
    console.log(editorRef.current.root.innerHTML.trim());
  }

  useEffect(initalizeEditor, []);

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
      <div ref={editorEleRef}></div>

      <Button onClick={save_quill}>Save</Button>
    </>
  );
}

export default QuillEditor;
