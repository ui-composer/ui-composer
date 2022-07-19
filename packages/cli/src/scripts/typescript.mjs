#!/usr/bin/env zx

import { $ } from 'zx';

export async function typescript() {
  await $`$(yarn bin tsc) -b`;
}
