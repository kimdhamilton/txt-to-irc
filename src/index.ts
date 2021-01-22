#!/usr/bin/env node

import fs from 'fs';
import { program } from 'commander';

export function doParse(fileName: string, date: string) {

  try {

    const data = fs.readFileSync(fileName,  { encoding: "utf8" });
    const lines = data.split(/\r?\n/);
    const dateEntry = `${date}T16:00:00.000Z`;
    const defaultAlias = 'kimhd';

    lines.forEach((l) => {
      if (l.trim().length > 0) {
       let newLine = `[${dateEntry}]\t<${defaultAlias}>\t${l}`;
       //let newLine = `[${dateEntry}]\t${l}`;
        console.log(newLine);
      }
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

program
 .requiredOption('-f, --fileName <fileName>', 'the txt file to process')
 .requiredOption('-d, --date <date>', 'date formatted as yyyy-mm-dd, e.g. 2021-01-13');

program.parse(process.argv);
const options = program.opts();

doParse(options.fileName, options.date);

