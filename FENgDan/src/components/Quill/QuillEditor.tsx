/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import { Button } from "antd";
import Quill from "quill";

const QuillEditor = () => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      // You can customize Quill options here
      const options = {
        theme: "snow",
        // Add more options as needed
      };

      // Initialize Quill with options
      const quillInstance = new Quill(quillRef.current, options);

      // Add any event listeners or additional configurations as needed
      // For example:
      // quillInstance.on('text-change', (delta, oldDelta, source) => {
      //   // Handle text change
      // });

      // You can expose the Quill instance if needed
      // quillRef.current.quill = quillInstance;
    }
  }, []);

  const handleButtonClick = () => {
    // Access the Quill instance if needed
    if (quillRef.current) {
      const quillInstance = quillRef.current;
      // Get the HTML content
      const htmlContent = quillInstance.root.innerHTML;
      console.log(htmlContent);
    }
  };

  return (
    <div>
      <div ref={quillRef} style={{ height: "400px" }} />
      <Button type="primary" onClick={handleButtonClick}>
        Get Content
      </Button>
    </div>
  );
};

export default QuillEditor;
