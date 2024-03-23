import { useEffect, useRef } from "react";

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    const loadQuill = async () => {
      // Dynamically import Quill when the component mounts
      const { default: Quill } = await import("quill");

      if (quillRef.current) {
        const editor = new Quill(quillRef.current, {
          theme: "snow", // Choose a theme ('snow' or 'bubble')
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline"],
              ["link"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          },
        });

        editor.on('text-change', () => {
          if (onChange) {
            onChange(editor.root.innerHTML);
          }
        });

        if (value) {
          editor.root.innerHTML = value;
        }
      }
    };

    loadQuill();

  }, [value, onChange]);

  return <div ref={quillRef} />;
};

export default QuillEditor;