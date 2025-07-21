import React, { useRef, ChangeEvent } from 'react';
import { FileHandler } from './Files';

const FileDropBox: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFiles = (files: File[]) => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        for (const file of imageFiles) {
            FileHandler.getInstance().addFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        handleFiles(selectedFiles);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            style={{ backgroundColor: '#2f3640' }}
            className="flex flex-col items-center justify-center w-full h-[60%] border-2 border-dashed border-gray-400 rounded text-white"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className="flex items-center justify-center text-center text-sm px-5 py-2">
                Drag and drop files here or click to select files...
            </div>

            <div className="py-5">
                <div className="flex items-center justify-center">
                    <button
                        className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 dark:hover:bg-blue-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                        onClick={handleButtonClick}
                    >
                        Select files
                    </button>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default FileDropBox;
