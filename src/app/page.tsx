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
        <div style={{ flex: 1, marginRight: '20px' }}>
          <FileDropBox />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ filter: 'invert(1)' }}>
          <Image src="/convert.svg" alt="converter" width={100} height={100} />
        </div>
        </div>
        <div style={{ flex: 1}}>
          <SettingsPanel />
        </div>
      </div>
      
      {/* Bottom Row: Convert Button */}
      <div className="flex justify-center">
        <button
          // onClick={handleConvert}
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-green-500 text-white gap-2 hover:bg-green-600 dark:hover:bg-green-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        >
          Convert
        </button>
      </div>

    </div>
  );
}
