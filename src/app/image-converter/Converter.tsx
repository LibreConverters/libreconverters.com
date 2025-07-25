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

import { avif, jxl, jpeg, png, qoi, webp, heic, wp2 } from "icodec";
import JSZip from "jszip";

type OutputFormat = 'jpeg' | 'png' | 'webp' | 'avif' | 'jxl' | 'qoi' | 'heic' | 'wp2';

// Map of format name to codec module
const modules: Record<string, any> = { avif, jxl, jpeg, png, qoi, webp, heic, wp2 };

async function decodeImage(file: File): Promise<ImageData> {
  const ext = file.name.split('.').pop()?.toLowerCase() || "";
  let decoded: any;
  switch (ext) {
    case "jpg":   case "jpeg": decoded = jpeg.decode(new Uint8Array(await file.arrayBuffer())); break;
    case "png":   decoded = png.decode(new Uint8Array(await file.arrayBuffer())); break;
    case "webp":  decoded = webp.decode(new Uint8Array(await file.arrayBuffer())); break;
    case "avif":  decoded = avif.decode(new Uint8Array(await file.arrayBuffer())); break;
    case "jxl":   decoded = jxl.decode(new Uint8Array(await file.arrayBuffer())); break;
    case "qoi":   decoded = qoi.decode(new Uint8Array(await file.arrayBuffer())); break;
    case "heic": 
    case "heif":  decoded = heic.decode(new Uint8Array(await file.arrayBuffer())); break;
    case "wp2":   decoded = wp2.decode(new Uint8Array(await file.arrayBuffer())); break;
    default:      throw new Error(`Unsupported file format: ${ext}`);
  }
  // Ensure colorSpace property exists for ImageData compatibility
  return {
    ...decoded,
    colorSpace: decoded.colorSpace ?? "srgb"
  } as ImageData;
}

async function encodeImage(imageData: ImageData, format: OutputFormat, compression: number): Promise<Uint8Array> {
  // Ensure ImageDataLike compatibility
  const imageDataLike = {
    ...imageData,
    depth: (imageData as any).depth ?? 8 // Default to 8 if not present
  };
  let encoded: Uint8Array;
  switch (format) {
    case "jpeg":
      encoded = jpeg.encode(imageDataLike, { quality: compression });
      break;
    case "png":
      encoded = png.encode(imageDataLike);
      break;
    case "webp":
      encoded = webp.encode(imageDataLike, { quality: compression });
      break;
    case "avif":
      encoded = avif.encode(imageDataLike, { quality: compression });
      break;
    case "jxl":
      encoded = jxl.encode(imageDataLike, { quality: compression });
      break;
    case "qoi":
      encoded = qoi.encode(imageDataLike);
      break;
    case "heic": 
      encoded = heic.encode(imageDataLike);
      break;
    case "wp2":
      encoded = wp2.encode(imageDataLike);
      break;
    default:
      throw new Error(`Unsupported output format: ${format}`);
  }
  return encoded;
}

export async function convertImages(
  compression: number,
  images: File[],
  output_format: 'jpeg'|'png'|'webp'|'avif'|'jxl'|'qoi'|'heic'|'wp2'
): Promise<{ convertedImages?: { name: string; data: Uint8Array }[]; error?: string }> {
  try {
    // Process all images in parallel
    const convertedImages = await Promise.all(
      images.map(async (file) => {
        const imageData = await decodeImage(file);
        const encodedData = await encodeImage(imageData, output_format, compression);
        return { name: file.name.replace(/\.[^/.]+$/, `.${output_format}`), data: encodedData };
      })
    );
    return { convertedImages };
  } catch (error) {
    console.error("Error converting images:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// zipImages and processImages remain the same as before.
export async function zipImages(images: { name: string; data: Uint8Array }[]): Promise<Blob> {
  const zip = new JSZip();
  images.forEach(({ name, data }) => zip.file(name, data));
  return zip.generateAsync({ type: "blob" });
}

/**
 * Converts and zips a list of images to a blob.
 *
 * This function wraps convertImages and zipImages. If the conversion fails
 * or the zipping fails, it returns null. The compression parameter is passed
 * to the underlying convertImages function.
 *
 * @param compression - Compression level (0-100) to pass to the underlying
 *                      convertImages function.
 * @param images - List of images to convert.
 * @param output_format - Output format to convert to (e.g. "jpeg", "png", etc.).
 * @returns A blob containing the zipped images, or null if there was an error.
 */
export async function processImages(
  compression: number,
  images: File[],
  output_format: string
): Promise<Blob | null> {
  const result = await convertImages(compression, images, output_format as any);
  if (result.error || !result.convertedImages) return null;
  try {
    return await zipImages(result.convertedImages);
  } catch {
    return null;
  }
}
