import { NestApplication } from '@nestjs/core';
import { LeagueRoute } from '../../../src/league/enums';
import { LeaguePlayersMatcher } from '../../matchers';
import { dbCleanup, dbPopulate, TestContext } from '../../utils';

const enum should {
  initTestContext = 'Should test Context be properly initialized.',
  throw404League = 'Should throw 404 when looking a non registered :leagueId.',
  throw404TeamName = 'Should throw 404 when looking a non registered Team Name.',
  getAllPlayersInLeague = 'Should get all player in given league.',
  getAllPlayersInLeagueAndTeam = 'Should get all player in given league and teamName.',
}

describe(`e2e: (GET)${LeagueRoute.players}`, () => {
  let testCtx: TestContext = null;

  beforeAll(async () => {
    testCtx = await TestContext.getInstance();

    await dbPopulate(testCtx);
  });

  afterAll(async () => {
    await dbCleanup(testCtx);
  });

  it(should.initTestContext, async () => {
    expect(testCtx).not.toBeNull();
    expect(testCtx.request).not.toBeNull();
    expect(testCtx.app).toBeInstanceOf(NestApplication);
  });

  it(should.throw404League, async () => {
    const { status } = await testCtx.request.get(
      LeagueRoute.players.replace(':leagueCode', 'non-existent-league-id'),
    );

    expect(status).toBe(404);
  });

  it(should.throw404TeamName, async () => {
    const teamName = 'non-existent-team-name';
    const { status, body } = await testCtx.request
      .get(LeagueRoute.players.replace(':leagueCode', 'BSA'))
      .query({ teamName });

    expect(status).toBe(404);
    expect(body).toMatchObject({
      code: 'not-found-error',
      message: 'Not Found',
      details: [`The team with name: '${teamName}' does not exist`],
    });
  });

  it(should.getAllPlayersInLeague, async () => {
    const { status, body } = await testCtx.request.get(
      LeagueRoute.players.replace(':leagueCode', 'BSA'),
    );

    expect(status).toBe(200);
    expect(body).toMatchObject(LeaguePlayersMatcher);
  });

  it(should.getAllPlayersInLeagueAndTeam, async () => {
    const teamName = 'Fluminense FC';
    const { status, body } = await testCtx.request
      .get(LeagueRoute.players.replace(':leagueCode', 'BSA'))
      .query({ teamName });

    expect(status).toBe(200);
    expect(body).toMatchObject(LeaguePlayersMatcher);
  });
});
