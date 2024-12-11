/* eslint-disable */
import { useEffect } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme


const RichTextEditor = ({ field }) => {
  const { quill, quillRef } = useQuill({ placeholder: "Add the Description" });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        field.onChange(quill.root.innerHTML);
      });
    }
  }, [quill, field]);

  return (
    <div style={{ width: "100%", height: 300, }}>
      <div ref={quillRef} />
    </div>
  );
};

export default RichTextEditor;
