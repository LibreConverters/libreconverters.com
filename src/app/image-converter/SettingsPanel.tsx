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

import React from 'react';

const SettingsPanel = () => {
  return (
    <div className="flex flex-col justify-between h-full w-[200px] rounded text-white p-5">
      
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
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
            <option value="gif">AVIF</option>
          </select>
        </div>

        {/* Compression Settings */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold" htmlFor="compression">
            Compression Settings
          </label>
          <select
            id="compression"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="none">None</option>
            <option value="lossless">Lossless</option>
            <option value="lossy">Lossy</option>
          </select>
        </div>


        {/* Image Quality */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold" htmlFor="imageQuality">
            Image Quality
          </label>
          <select
            id="imageQuality"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="1">Low</option>
            <option value="5">Medium</option>
            <option value="10">High</option>
          </select>
        </div>

        {/* Resize Options */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold" htmlFor="resizeOptions">
            Resize Options
          </label>
          <select
            id="resizeOptions"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="none">None</option>
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-4 items-center justify-center">
        <button
          // onClick={handleConvert}
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 dark:hover:bg-green-400 font-medium text-sm sm:text-base h-12 px-5 w-[150px]"
        >
          Convert
        </button>

        <button
          disabled
          // onClick={handleDownload}
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-green-500 text-white gap-2 hover:bg-green-600 dark:hover:bg-green-400 font-medium text-sm sm:text-base h-12 px-5 w-[150px] opacity-50 cursor-not-allowed"
        >
          Download
        </button>
      </div>

    </div>
  );
};

export default SettingsPanel;
