const fs = require('node:fs');
const path = require('node:path');
const SRC_FONT_DIR = path.join(__dirname, 'src/fonts');

module.exports = {
  rollupOutput(config) {
    const DEST_DIR = `${config.dir}/fonts`;
    if (!fs.existsSync(DEST_DIR)) {
      fs.mkdirSync(DEST_DIR);
    }

    fs.cpSync(SRC_FONT_DIR, DEST_DIR, { recursive: true });
  },
};
