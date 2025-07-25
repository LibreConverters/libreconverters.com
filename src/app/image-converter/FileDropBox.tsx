/*
 * Copyright 2025 Michael Wyatt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useRef, ChangeEvent } from 'react';
import FileHandler from './FileHandler';

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
