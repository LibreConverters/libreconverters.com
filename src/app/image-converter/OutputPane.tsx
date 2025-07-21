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

import React, { useEffect, useState } from 'react';
import { FileHandler, ImageFile } from './FileHandler';

export default function OutputPane() {
    const [files, setFiles] = useState<ImageFile[]>([]);

    useEffect(() => {
        const unsubscribe = FileHandler.getInstance().subscribe(setFiles);
        return unsubscribe; // Cleanup on unmount
    }, []);

    const handleRemove = (id: string) => {
        FileHandler.getInstance().removeFile(id);
    };

    return (
        <div
            style={{ backgroundColor: '#2f3640' }}
            className="flex flex-col items-center justify-center w-full h-[80%] border-2 border-gray-400 rounded text-white p-4 overflow-y-auto"
        >
            <div className="flex flex-col gap-4 w-full max-w-md">
                {files.length === 0 ? (
                    <p className="text-sm text-center">No files uploaded yet.</p>
                ) : (
                    <div className="flex flex-col gap-2 w-full">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex justify-between items-center bg-gray-700 rounded px-4 py-2"
                            >
                                <img
                                    src={URL.createObjectURL(file.file)}
                                    alt={file.file.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <span className="truncate">{file.file.name}</span>
                                <button
                                    onClick={() => handleRemove(file.id)}
                                    className="text-red-400 hover:text-red-600 transition-colors text-lg"
                                    title="Remove file"
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


