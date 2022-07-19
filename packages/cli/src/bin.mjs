#!/usr/bin/env zx
import { argv } from 'zx';

import { build } from './scripts/build.mjs';
import { clean } from './scripts/clean.mjs';
import { typescript } from './scripts/typescript.mjs';

const scripts = {
  build,
  clean,
  typescript,
};

function getCommands() {
  const commands = [];
  for (const name of argv._) {
    commands.push(scripts[name]);
  }
  return commands;
}

void (async function () {
  const commands = getCommands();

  await Promise.all(commands.map(command => command()));
})();
