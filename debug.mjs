import fs from 'fs';

const files = [];

fs.readdirSync(
  '/Users/katherinemartinez/src/inspiration/material-design-icons/symbols/web'
).forEach(file => {
  files.push(file);
});

fs.writeFileSync(
  './apps/mobile-app/src/assets/icons/material/material-symbols-outlined.ts',
  `export const data = [${files.map(file => `'${file}'`).join(',')}];`,
  'utf-8'
);

console.log(files);
