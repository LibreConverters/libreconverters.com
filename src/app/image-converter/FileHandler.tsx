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

type ImageFile = {
  id: string;
  file: File;
};

export class FileHandler {
  private static instance: FileHandler;
  private files: ImageFile[] = [];

  private constructor() {}

  public static getInstance(): FileHandler {
    if (!FileHandler.instance) {
      FileHandler.instance = new FileHandler();
    }
    return FileHandler.instance;
  }

  public addFile(file: File): void {
    this.files.push({ id: crypto.randomUUID(), file });
    console.log(`File added: ${file.name}`);
  }

  public removeFile(id: string): void {
    this.files = this.files.filter((file) => file.id !== id);
  }

  public getFiles(): ImageFile[] {
    return this.files;
  }
}

// Create and export the FileContext
export const FileContext = React.createContext<FileHandler | null>(null);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FileContext.Provider value={FileHandler.getInstance()}>
      {children}
    </FileContext.Provider>
  );
};

