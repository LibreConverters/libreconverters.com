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

import { ImagePool } from '@squoosh/lib';
import JSZip from 'jszip';

export async function convertImages(
    compression: number, // 0-100
    images: File[],
    output_format: 'jpeg' | 'png' | 'webp' | 'avif'
): Promise<{ convertedImages?: { name: string; data: Uint8Array }[]; error?: string }> {
    try {
        const imagePool = new ImagePool(1);

        const encoderOptions: Record<string, any> = {
            jpeg: { quality: compression },
            png: { quality: compression },
            webp: { quality: compression },
            avif: { cqLevel: Math.round((100 - compression) / 5) },
        };

        const convertedImages: { name: string; data: Uint8Array }[] = [];

        await Promise.all(
            images.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const image = imagePool.ingestImage(new Uint8Array(arrayBuffer));
                await image.encode({ [output_format]: encoderOptions[output_format] });
                const encoded = (await image.encodedWith[output_format as keyof typeof image.encodedWith]!).binary;
                const newName = file.name.replace(/\.[^/.]+$/, '') + '.' + output_format;
                convertedImages.push({ name: newName, data: encoded });
            })
        );

        await imagePool.close();

        return { convertedImages };
    } catch (error: any) {
        return { error: error.message || 'Unknown error' };
    }
}

export async function zipImages(
    images: { name: string; data: Uint8Array }[]
): Promise<Blob> {
    const zip = new JSZip();
    images.forEach(({ name, data }) => {
        zip.file(name, data);
    });
    return zip.generateAsync({ type: 'blob' });
}

export async function processImages(
    compression: number,
    images: File[],
    output_format: 'jpeg' | 'png' | 'webp' | 'avif'
): Promise<Blob | null> {
    const convertResult = await convertImages(compression, images, output_format);
    if (convertResult.error || !convertResult.convertedImages) {
        return null;
    }
    try {
        const zipBlob = await zipImages(convertResult.convertedImages);
        return zipBlob;
    } catch {
        return null;
    }
}
