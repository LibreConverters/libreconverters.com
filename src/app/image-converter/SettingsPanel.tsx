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

import React, { useState, useEffect } from 'react';
import { processImages } from './Converter';
import FileHandler from './FileHandler';

const SettingsPanel = () => {
  return (
    <div className="flex flex-col justify-center h-full w-[200px] rounded text-white p-5">
      
      {/* Top: Settings list */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col gap-2 w-full">

          {/* Output File Format */}
          <label className="text-sm font-semibold" htmlFor="outputFormat">
            Output File Format
          </label>
          <select
            id="outputFormat"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="avif">AVIF</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
            <option value="gif">GIF (static only)</option>
            <option value="ico">ICO</option>
          </select>
        </div>

        {/* Quality Settings */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold" htmlFor="quality">
            Quality Settings
          </label>
          <select
            id="quality"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="100" selected>100% (Lossless)</option>
            <option value="90">90%</option>
            <option value="80">80%</option>
            <option value="70">70%</option>
            <option value="60">60%</option>
            <option value="50">50%</option>
            <option value="40">40%</option>
            <option value="30">30%</option>
            <option value="20">20%</option>
            <option value="10">10% (Smallest File)</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-10 items-center justify-center">

        {/* Button logic */}
        {(() => {
          const [isConverting, setIsConverting] = React.useState(false);
          const [convertedImages, setConvertedImages] = React.useState<any>(null);
          const [files, setFiles] = React.useState<File[]>([]);

          // Subscribe to image files
          useEffect(() => {
            const unsubscribe = FileHandler.getInstance().subscribe((imageFiles) => {
              const files = imageFiles.map((imageFile) => imageFile.file);
              setFiles(files);
            });
            return unsubscribe; // Cleanup on unmount
          }, []);

          // Handle conversion of images
          const handleConvert = async () => {
            setIsConverting(true);
            setConvertedImages(null);

            const quality = Number((document.getElementById('quality') as HTMLSelectElement)?.value);
            const outputFormat = (document.getElementById('outputFormat') as HTMLSelectElement)?.value as 'jpeg'|'png'|'webp'|'avif'|'jxl'|'qoi'|'heic'|'wp2';

            // processImages may be async, so handle both cases
            const result = await Promise.resolve(processImages(quality, files, outputFormat));
            setConvertedImages(result);
            setIsConverting(false);
          };

          // Handle download of converted images
          const handleDownload = () => {
            if (convertedImages) {
              const url = URL.createObjectURL(convertedImages);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'converted_images.zip';
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);
            }
          };

          // Handle reset of state
          const handleReset = () => {
            setFiles([]);
            setConvertedImages(null);
            setIsConverting(false);
          };

          // Button rendering
          return (
        <>
            {/* Convert button, only enabled if there are files uploaded to convert */}
            <button
              onClick={handleConvert}
              disabled={isConverting || !files.length}
              className={`rounded-full border border-transparent transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-12 px-5 w-[150px] ${
                isConverting || !files.length
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400'
              }`}
            >
              {isConverting ? 'Converting...' : 'Convert'}
            </button>

            {/* Download button, only enabled if convertedImages is not null */}
            <button
                onClick={handleDownload}
                className={`rounded-full border border-transparent transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-12 px-5 w-[150px] ${
                !convertedImages || !files.length
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-400'
              }`}
                disabled={!convertedImages}
              >
                Download
              </button>

            {/* Reset button */}
            <button
              onClick={handleReset}
              className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 dark:hover:bg-red-400 font-medium text-sm sm:text-base h-12 px-5 w-[150px]"
            >
              Reset
            </button>
          </>
            );
          })()}
      </div>
    </div>
  );
};

export default SettingsPanel;
