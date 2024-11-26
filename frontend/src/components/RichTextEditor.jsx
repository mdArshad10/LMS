import React from "react";

// import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const RichTextEditor = () => {
  // const { quill, quillRef } = useQuill();

  return (
    <div className="w-full h-[10rem] pb-4">
      {/* <div ref={quillRef} /> */}
    </div>
  );
};

export default RichTextEditor;
