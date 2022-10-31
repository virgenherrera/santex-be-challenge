import { Connection } from 'typeorm';
import { DbPopulateService } from '../../src/import-league/services';
import { getMockData } from './get-mock-data.util';
import { TestContext } from './test-context.util';

export async function dbPopulate(testCtx: TestContext) {
  const dbPopulateService = testCtx.app.get(DbPopulateService);
  const { competitions } = getMockData('competitionResponse');
  const { teams } = getMockData('competitionTeams');

  await dbPopulateService.saveCompetition(competitions[0], teams);
}

export async function dbCleanup(testCtx: TestContext) {
  const connection = testCtx.app.get(Connection);

  await connection.query(
    `
    PRAGMA ignore_check_constraints = 1;
    DELETE FROM player;
    DELETE FROM coach;
    DELETE FROM team;
    DELETE FROM competition;
    PRAGMA ignore_check_constraints = 0;
    `,
  );
}
