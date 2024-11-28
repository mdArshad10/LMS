import { useEffect } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const RichTextEditor = ({ field }) => {
  const { quill, quillRef } = useQuill({ placeholder: "123" });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
         field.onChange(quill.root.innerHTML)

      });
    }
  }, [quill, field]);

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};

export default RichTextEditor;
