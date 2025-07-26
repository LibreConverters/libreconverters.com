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

type InputFormat =  'jpeg' | 'png' | 'webp' | 'avif' | 'jxl' | 'qoi' | 'heic' | 'wp2';
type OutputFormat = 'jpeg' | 'png' | 'webp' | 'avif' | 'jxl' | 'qoi' | 'heic' | 'wp2';

// Map of format name to codec module
const modules: Record<string, any> = { avif, jxl, jpeg, png, qoi, webp, heic, wp2 };

async function getFileExtension(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || "";
  return ext;
}

async function lookupFileFormat(file: File): Promise<InputFormat> {
  const ext = await getFileExtension(file);

  switch (ext) {
    case "jpg":
    case "jpeg": 
      return "jpeg";
    case "png":
      return "png"; 
    case "webp":
      return "webp";
    case "avif":
      return "avif";
    case "jxl":
      return "jxl";
    case "qoi":
      return "qoi";
    case "heif": 
    case "heic":
      return "heic";
    case "wp2":
      return "wp2";
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
}


async function loadDecoders(images: File[]): Promise<void> {
  const formats = new Set<InputFormat>();
  
  for (const image of images) {
    const format = await lookupFileFormat(image);
    formats.add(format);
  }
  
  const promises = Array.from(formats).map(async (format) => {
    if (modules[format]) {
      console.log(`Loading decoder for ${format}`);
      await modules[format].loadDecoder();
    } 
    
    else {
      throw new Error(`Unsupported input format: ${format}`);
    }
  });
  
  await Promise.all(promises);
}

async function loadEncoders(formats: OutputFormat[]): Promise<void> {
  const encoderPromises = formats.map(async (format) => {
    if (modules[format]) {
      console.log(`Loading encoder for ${format}`);
      await modules[format].loadEncoder();
    } else {
      throw new Error(`Unsupported output format: ${format}`);
    }
  });
  
  await Promise.all(encoderPromises);
}

async function decodeImage(file: File): Promise<ImageData> {
  const ext = file.name.split('.').pop()?.toLowerCase() || "";
  let codec: any;

  switch (ext) {
    case "jpg":
    case "jpeg": 
      codec = jpeg;
      break;
    case "png":
      codec = png;
      break;
    case "webp":
      codec = webp;
      break;
    case "avif":
      codec = avif;
      break;
    case "jxl":
      codec = jxl;
      break;
    case "qoi":
      codec = qoi;
      break;
    case "heif": 
    case "heic":
      codec = heic;
      break;
    case "wp2":
      codec = wp2;
      break;
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }

  console.log(`Decoding image: ${file.name} with codec: ${codec.name}`);
  const imageData = codec.decode(new Uint8Array(await file.arrayBuffer()));
  return imageData;
}

async function encodeImage(imageData: ImageData, format: OutputFormat, quality: number): Promise<Uint8Array> {
  let codec: any;
  let args: any = {};

  // Select codec and arguments based on output format
  switch (format) {
    case "jpeg":
      codec = jpeg;
      args = { quality: quality };
      break;
    case "png":
      codec = png;
      args = { quality: quality };
      break;
    case "webp":
      codec = webp;
      args = { quality: quality };
      break;
    case "avif":
      codec = avif;
      args = { cqLevel: Math.round((100 - quality) / 5) };
      break;
    case "jxl":
      codec = jxl;
      args = { quality: quality };
      break;
    case "qoi":
      codec = qoi;
      args = { quality: quality };
      break;
    case "heic": 
      codec = heic;
      args = { quality: quality };
      break;
    case "wp2":
      codec = wp2;
      args = { quality: quality };
      break;
    default:
      throw new Error(`Unsupported output format: ${format}`);
  }
  
  console.log(`Encoding image to ${format} with quality ${quality}`);
  const encoded = await codec.encode(imageData, args);
  
  if (encoded instanceof Uint8Array) {
    console.log(`Encoded image size: ${encoded.length} bytes`);
    return encoded;
  } 
  
  else {
    throw new Error(`Encoding failed for format: ${format}`);
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
 * or the zipping fails, it returns null. The quality parameter is passed
 * to the underlying convertImages function.
 *
 * @param quality - quality level (0-100) to pass to the underlying
 *                      convertImages function.
 * @param images - List of images to convert.
 * @param output_format - Output format to convert to (e.g. "jpeg", "png", etc.).
 * @returns A blob containing the zipped images, or null if there was an error.
 */
export async function processImages(quality: number, images: File[], output_format: OutputFormat): Promise<Blob | null> {
  try {
    // Load decoders for input formats
    await loadDecoders(images);

    // Load encoders for the output format
    await loadEncoders([output_format]);

    // Process all images in parallel
    const convertedImages = await Promise.all(
      images.map(async (file) => {
        const imageData = await decodeImage(file);
        const encodedData = await encodeImage(imageData, output_format, quality);
        return { name: file.name.replace(/\.[^/.]+$/, `.${output_format}`), data: encodedData };
      })
    );

    return await zipImages(convertedImages);
  }
  
  catch (error) {
      console.error("Error converting images:", error);
      return null;
  }
}
