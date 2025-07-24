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
import dynamic from 'next/dynamic';
const SettingsPanel = dynamic(() => import('./SettingsPanel'), { ssr: false });
import OutputPane from "./OutputPane";

export default function Home() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '5px', boxSizing: 'border-box' }}>
      {/* Left side ad */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '160px',
        height: '100vh',
        background: '#f0f0f0', // Replace with AdSense code
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        {/* AdSense Ad Here */}
      </div>

      {/* Right side ad */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '160px',
        height: '100vh',
        background: '#f0f0f0', // Replace with AdSense code
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        {/* AdSense Ad Here */}
      </div>


      {/* Top Row: Split into two columns */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '10px', padding: '10px' }}>
        
        <div className="flex flex-row h-full w-full px-[170px] align-items-center justify-center">
            {/* File Drop Box */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileDropBox />
            </div>

            {/* Converter icon */}
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <div style={{ filter: 'invert(1)' }}>
                    <Image src="/arrow-0.svg" alt="arrow" width={50} height={50} />
                </div>
            </div>

            {/* Output files */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <OutputPane />
            </div>

            {/* Settings panel */}
            <div style={{  }}>
                <SettingsPanel />
            </div>
        </div>
        
      </div>

    </div>
  );
}

