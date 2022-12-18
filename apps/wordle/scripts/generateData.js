const fs = require('node:fs');
const path = require('node:path');
const { create } = require('difficulty');

(async () => {
  try {
    const difficulty = await create();

    const content = fs.readFileSync(path.join(__dirname, './words.txt'), 'utf-8');
    const contentAsArray = content.split('\n');

    const levels = {
      level1: [],
      level2: [],
      level3: [],
    };

    contentAsArray.forEach(item => {
      const length = item.split('').length;
      if (length === 5) {
        const level = difficulty.getLevel(item);
        if (level < 3) {
          levels[`level${level + 1}`].push(item);
          // fiveLetterWords.push([item, level]);
        }
      }
    });

    await Promise.all(
      Object.entries(levels).map(async ([key, values]) => {
        const filePath = path.join(__dirname, `../src/app/data/${key}-words.ts`);
        await fs.promises.writeFile(filePath, `export default ${JSON.stringify(values)};`, 'utf-8');
      })
    );

    console.log(levels);
  } catch (err) {
    console.error(err);
  }
})();
