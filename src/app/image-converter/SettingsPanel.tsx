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

        {/* Compression Settings */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold" htmlFor="compression">
            Compression Settings
          </label>
          <select
            id="compression"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="0" selected>0 (None)</option>
            <option value="10">10 (Minimal)</option>
            <option value="20">20 (Light)</option>
            <option value="30">30 (Mild)</option>
            <option value="40">40 (Balanced)</option>
            <option value="50">50 (Standard)</option>
            <option value="60">60 (Moderate)</option>
            <option value="70">70 (Strong)</option>
            <option value="80">80 (High)</option>
            <option value="90">90 (Max Save)</option>
            <option value="100">100 (Smallest File)</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-10 items-center justify-center">
        
        {/* Convert button */}
        <button
          onClick={() => {
            const compression = Number((document.getElementById('compression') as HTMLSelectElement)?.value);
            processImages(
              compression,
              FileHandler.getInstance().getFiles(),
              (document.getElementById('outputFormat') as HTMLSelectElement)?.value
            ).then();
          }}
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 dark:hover:bg-blue-400 font-medium text-sm sm:text-base h-12 px-5 w-[150px]"
        >
          Convert
        </button>

        {/* Reset button */}
        <button
          onClick={() => window.location.reload()}
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 dark:hover:bg-red-400 font-medium text-sm sm:text-base h-12 px-5 w-[150px]"
        >
          Reset
        </button>
      </div>

    </div>
  );
};

export default SettingsPanel;
