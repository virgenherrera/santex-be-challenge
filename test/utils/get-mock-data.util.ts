import { readFileSync } from 'fs';
import { join, resolve } from 'path';

export enum DataFile {
  competitionResponse = 'competitions-response.json',
  competitionTeams = 'competition-teams-response.json',
}

export function getMockData(dataFileKey: keyof typeof DataFile) {
  const path = resolve(join(__dirname, '../mock-data', DataFile[dataFileKey]));
  const stringFileContent = readFileSync(path, {
    encoding: 'utf8',
    flag: 'r',
  });

  return JSON.parse(stringFileContent);
}
