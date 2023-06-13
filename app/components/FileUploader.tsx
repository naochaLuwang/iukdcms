"use client";
import Image from "next/image"
import React, { useState, ChangeEvent } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  // Add any additional props you need for the component
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleUpload = () => {
    // Add your file upload logic here
    console.log(selectedFile);
    // Reset the selected file
    setSelectedFile(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-200 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            File Uploader
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-center">
            {selectedFile ? (
              <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                <svg
                  className="w-full h-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a2 2 0 00-2 2v5H4a1 1 0 00-1 1v8a2 2 0 002 2h12a2 2 0 002-2v-8a1 1 0 00-1-1h-2V4a2 2 0 00-2-2H8zm6 2h-4v5h4V4zm-4 7V8h4v3h-4zm6 3h-2v-1h2v1zm-6 1v1H8v-1h2zm-2-3h2v1H8v-1zm4 0h2v1h-2v-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : (
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 24a4 4 0 110-8 4 4 0 010 8zm4 4a8 8 0 100-16 8 8 0 000 16zm8-8v2H32v-2h-2v-2h2V18h2v2h2v2h-2z"
                      fill="#6875f5"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative font-medium text-indigo-600 rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
          {selectedFile && (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
              <button
                className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
