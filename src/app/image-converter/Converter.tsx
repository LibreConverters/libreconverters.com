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


// Map of format name to codec module
const modules: Record<string, any> = { avif, jxl, jpeg, png, qoi, webp, heic, wp2 };

export async function convertImages(
  compression: number,
  images: File[],
  output_format: 'jpeg'|'png'|'webp'|'avif'|'jxl'|'qoi'|'heic'|'wp2'
): Promise<{ convertedImages?: { name: string; data: Uint8Array }[]; error?: string }> {
  try {
    // **1.** Load all decoders and encoders (WASM modules) before use:contentReference[oaicite:4]{index=4}.
    // Map to track which codecs have been loaded
    const loadedDecoders = new Set<string>();
    const loadedEncoders = new Set<string>();

    // Pre-scan all files to determine which codecs are needed
    const inputFormats = images.map(file => {
      const ext = file.name.split('.').pop()?.toLowerCase() || "";
      switch (ext) {
        case "jpg": case "jpeg": return "jpeg";
        case "png": return "png";
        case "webp": return "webp";
        case "avif": return "avif";
        case "jxl": return "jxl";
        case "qoi": return "qoi";
        case "heic": case "heif": return "heic";
        case "wp2": return "wp2";
        default: return null;
      }
    });
    // Load only the decoders needed for input formats
    console.log('Loading decoders...');
    await Promise.all(
      Array.from(new Set(inputFormats.filter(Boolean))).map(fmt => {
        loadedDecoders.add(fmt!);
        return modules[fmt!].loadDecoder();
      })
    );

    // Load only the encoder needed for the output format
    if (!loadedEncoders.has(output_format)) {
      await modules[output_format].loadEncoder();
      loadedEncoders.add(output_format);
    }

    const convertedImages: { name: string; data: Uint8Array }[] = [];

    
    await Promise.all(images.map(async (file) => {
      // **2.** Read file into a Uint8Array.
      const buffer = await file.arrayBuffer();
      const inputBytes = new Uint8Array(buffer);

      // **3.** Determine input codec by file extension.
      const ext = file.name.split('.').pop()?.toLowerCase() || "";
      let inputCodec: any = null;
      switch (ext) {
        case "jpg": case "jpeg": inputCodec = jpeg; break;
        case "png": inputCodec = png; break;
        case "webp": inputCodec = webp; break;
        case "avif": inputCodec = avif; break;
        case "jxl": inputCodec = jxl; break;
        case "qoi": inputCodec = qoi; break;
        case "heic": case "heif": inputCodec = heic; break;
        case "wp2": inputCodec = wp2; break;
      }

      // **4.** Decode to raw RGBA (ImageData):contentReference[oaicite:5]{index=5}.
      console.log(`Decoding images...`);
      const imageData = inputCodec.decode(inputBytes);

      // **5.** Prepare encoding options per output format.
      let options: any = {};
      switch (output_format) {
        case "jpeg":
          options = { quality: compression };
          break;
        case "png":
          options = { quality: compression };
          break;
        case "webp":
          options = { quality: compression };
          break;
        case "avif":
          // Invert quality to AVIF's cqLevel scale (0 best, 63 worst)
          options = { cqLevel: Math.round((100 - compression) / 5) };
          break;
        case "jxl":
          options = { distance: compression }; // JPEG-XL “distance” (0=lossless)
          break;
        case "qoi":
          options = {}; // QOI is lossless by design
          break;
        case "heic":
          options = { quality: compression };
          break;
        case "wp2":
          options = { quality: compression };
          break;
      }

      // **6.** Encode with the selected icodec module and options.
      console.log(`Encoding images...`);
      const outputCodec = modules[output_format];
      if (!outputCodec) throw new Error(`Unsupported format: ${output_format}`);
      const encodedBytes: Uint8Array = outputCodec.encode(imageData, options);

      // **7.** Prepare output filename with new extension.
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const newName = `${baseName}.${output_format}`;
      convertedImages.push({ name: newName, data: encodedBytes });
    }));

    return { convertedImages };
  } catch (e: any) {
    return { error: e.message || "Unknown error" };
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
