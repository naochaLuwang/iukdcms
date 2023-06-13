"use client";
import React from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

// Create a dynamic import of ReactQuill component
const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    [{ lineheight: ["1", "1.5", "2", "2.5", "3"] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",

  "color",
  "background",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "size",
  "lineheight",
];

export function MyEditor({ onChange, content }: any) {
  return (
    <div className="h-96">
      {/* Render the dynamic ReactQuill component */}
      <DynamicReactQuill
        style={{ height: "20rem", fontSize: "14px" }}
        value={content}
        modules={modules}
        formats={formats}
        onChange={onChange}
      />
    </div>
  );
}

export default MyEditor;
