import fs from 'fs';
import path from 'path';
import { generateFullHtmlNotes } from '../src/components/StandaloneHtmlExporter';

const outputPath = path.resolve(process.cwd(), 'public', 'JEE_Main_Ray_Optics_Formula_Notes_Question_Proof.html');

console.log('Generating Question-Proof HTML Master Notes...');
const html = generateFullHtmlNotes();

fs.writeFileSync(outputPath, html, 'utf-8');
console.log(`Successfully generated Question-Proof HTML notes at: ${outputPath}`);
console.log(`File size: ${(html.length / 1024).toFixed(2)} KB`);
