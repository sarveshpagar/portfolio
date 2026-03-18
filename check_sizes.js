import fs from 'fs';
const files = fs.readdirSync('public/tech');
for (const file of files) {
  const stat = fs.statSync(`public/tech/${file}`);
  console.log(`${file}: ${stat.size} bytes`);
}
