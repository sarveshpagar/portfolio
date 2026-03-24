import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'tech');
const files = fs.readdirSync(dir);

let output = 'export const techImages: Record<string, string> = {\n';

for (const file of files) {
  if (file.endsWith('.png')) {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString('base64');
    const name = file.replace('.png', '');
    output += `  "${name}": "data:image/png;base64,${base64}",\n`;
  }
}

output += '};\n';

fs.writeFileSync(path.join(__dirname, 'src', 'techImages.ts'), output);
console.log('Generated src/techImages.ts');
