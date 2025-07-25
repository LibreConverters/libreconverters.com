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

export type ImageFile = {
  id: string;
  file: File;
};

type FileChangeListener = (files: ImageFile[]) => void;

export class FileHandler {
  private static instance: FileHandler;
  private files: ImageFile[] = [];
   private listeners: Set<FileChangeListener> = new Set();

  private constructor() {}

  /** Singleton accessor */
  public static getInstance(): FileHandler {
    if (!FileHandler.instance) {
      FileHandler.instance = new FileHandler();
    }
    return FileHandler.instance;
  }

  /** Add a new image file */
  public addFile(file: File): void {
    this.files.push({ id: crypto.randomUUID(), file });
    console.log(`File added: ${file.name}`);
    this.notifyListeners();
  }

  /** Remove a file by its unique ID */
  public removeFile(id: string): void {
    this.files = this.files.filter((file) => file.id !== id);
    console.log(`File removed: ${id}`);
    this.notifyListeners();
  }

  /** Get all image files */
  public getFiles(): File[] {
    return this.files.map((file) => file.file);
  }

  /** Clear all files */
  public clearFiles(): void {
    this.files = [];
    console.log('All files cleared');
  }

  public subscribe(listener: FileChangeListener): () => void {
        this.listeners.add(listener);
        // Immediately send current state
        listener(this.files);

        // Return unsubscribe function
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notifyListeners(): void {
      const clonedFiles = [...this.files]; // Shallow copy to force React updates
      for (const listener of this.listeners) {
          listener(clonedFiles);
      }
  }
}

export default FileHandler;