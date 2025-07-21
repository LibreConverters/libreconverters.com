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

export default function OutputPane() {
    return (
        <div 
        style={{ backgroundColor: '#2f3640' }}
        className="flex flex-col items-center justify-center w-full h-[80%] border-2 border-gray-400 rounded text-white">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                <p className="text-sm">No files uploaded yet.</p>
                {/* Placeholder for output files */}
                </div>
            </div>
        </div>
    );
    }