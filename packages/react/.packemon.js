// eslint-disable-next-line import/no-extraneous-dependencies
const copy = require('rollup-plugin-copy');

function rename(_name, _extension, fullPath) {
  console.log(_name, fullPath);
  return fullPath.replace('src/fonts', '');
}

const copyParams = {
  rename,
  verbose: true,
};

module.exports = {
  rollupInput(config) {
    config.plugins.unshift(
      copy({
        targets: [
          { src: 'src/fonts', dest: 'lib/native/fonts', ...copyParams },
          { src: 'src/fonts', dest: 'lib/browser/fonts', ...copyParams },
          { src: 'src/fonts', dest: 'esm/fonts', ...copyParams },
        ],
      })
    );
  },
};
