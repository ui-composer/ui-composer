#!/usr/bin/env zx

import { build } from './build.mjs';

cd(process.env.INIT_CWD);

build({ watch: true });
