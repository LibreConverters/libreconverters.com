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

export class FileHandler {
  private static instance: FileHandler;
  private files: ImageFile[] = [];

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
  }

  /** Remove a file by its unique ID */
  public removeFile(id: string): void {
    this.files = this.files.filter((file) => file.id !== id);
    console.log(`File removed: ${id}`);
  }

  /** Get all image files */
  public getFiles(): ImageFile[] {
    return this.files;
  }

  /** Clear all files */
  public clearFiles(): void {
    this.files = [];
    console.log('All files cleared');
  }
}

export default FileHandler;