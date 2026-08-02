import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

/** @type {import('../$types').PageServerLoad} */
export function load() {
	const photosDir = join(process.cwd(), 'static', 'photos');

	let photos = [];
	try {
		photos = readdirSync(photosDir)
			.filter((file) => IMAGE_EXTENSIONS.has(file.slice(file.lastIndexOf('.')).toLowerCase()))
			.sort()
			.map((file) => `/photos/${file}`);
	} catch {
		// static/photos doesn't exist yet — fine, we just show an empty state
		photos = [];
	}

	return { photos };
}