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

'use client'

import Image from "next/image";
import FileDropBox from "./FileDropBox";
import SettingsPanel from "./SettingsPanel";

export default function Home() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* Top Row: Split into two columns */}
      <div style={{ flex: 1, display: 'flex', marginBottom: '20px' }}>

        {/* AdSense ad */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* AdSense ad will go here */}
        </div>

        {/* File Drop Box */}
        <div style={{ flex: 1 }}>
          <FileDropBox />
        </div>

        {/* Converter icon */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ filter: 'invert(1)' }}>
            <Image src="/convert.svg" alt="converter" width={100} height={100} />
          </div>
        </div>

        {/* Settings panel */}
        <div style={{ flex: 1}}>
          <SettingsPanel />
        </div>

        {/* AdSense ad */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* AdSense ad will go here */}
        </div>
      </div>
      

      {/* Bottom Row: Convert Button */}
      <div className="flex justify-center items-center gap-4" style={{ marginTop: '20px' }}>
        <button
          // onClick={handleConvert}
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-green-500 text-white gap-2 hover:bg-green-600 dark:hover:bg-green-400 font-medium text-sm sm:text-base h-12 px-5 w-[150px]"
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
}
