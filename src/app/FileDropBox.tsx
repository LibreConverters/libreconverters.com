import React from 'react';

const FileDropBox = () => {
    return (
        <div
            style={{ backgroundColor: '#2f3640' }}
            className="flex flex-col items-center justify-center w-full h-[80%] border-2 border-dashed border-gray-400 rounded text-white "
            onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter(
                (file) => file.type.startsWith('image/')
                );
                // Handle the image files
            }}
            onDragOver={(e) => e.preventDefault()}
            >
            
            {/* Drag and drop area text */}
            <div className="flex items-center justify-center text-center text-sm px-5 py-2">
                Drag and drop files here or click to select files...
            </div>
            

                
            <div className="py-5">
                {/* Select files button */}
                <div className="flex items-center justify-center">
                    <button
                        className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 dark:hover:bg-blue-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                        onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.multiple = true;
                        input.onchange = (e) => {
                            const files = Array.from(input.files || []);
                            // Handle the image files
                        };
                        input.click();
                        }}
                    >
                        Select files
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileDropBox;