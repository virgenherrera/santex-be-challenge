import { NestApplication } from '@nestjs/core';
import { LeagueRoute } from '../../../src/league/enums';
import { TeamMatcher, TeamWithSquadMatcher } from '../../matchers';
import { dbCleanup, dbPopulate, TestContext } from '../../utils';

const enum should {
  initTestContext = 'Should test Context be properly initialized.',
  throw400NoTeamName = 'Should throw 400 when teamName was not provided in query.',
  throw404League = 'Should throw 404 when looking a non registered :leagueId.',
  throw404LeagueButTeamName = 'Should throw 404 when looking a registered :leagueId but looking for a non existent teamName.',
  getTeam = 'Should GET Team properly.',
  getTeamWithPlayers = 'Should GET Team with players properly.',
}

describe(`e2e: (GET)${LeagueRoute.team}`, () => {
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

  it(should.throw400NoTeamName, async () => {
    const { status } = await testCtx.request.get(
      LeagueRoute.team.replace(':leagueCode', 'non-existent-league-id'),
    );

    expect(status).toBe(400);
  });

  it(should.throw404League, async () => {
    const leagueCode = 'non-existent-league-code';
    const { status, body } = await testCtx.request
      .get(LeagueRoute.team.replace(':leagueCode', leagueCode))
      .query({ teamName: 'Fluminense FC' });

    expect(status).toBe(404);
    expect(body).toMatchObject({
      code: 'not-found-error',
      message: 'Not Found',
      details: [`The league with code: '${leagueCode}' does not exist`],
    });
  });

  it(should.throw404LeagueButTeamName, async () => {
    const leagueCode = 'BSA';
    const teamName = 'non-existent-team-name';
    const { status, body } = await testCtx.request
      .get(LeagueRoute.team.replace(':leagueCode', leagueCode))
      .query({ teamName });

    expect(status).toBe(404);
    expect(body).toMatchObject({
      code: 'not-found-error',
      message: 'Not Found',
      details: [`The team with name: '${teamName}' does not exist`],
    });
  });

  it(should.getTeam, async () => {
    const leagueCode = 'BSA';
    const teamName = 'Fluminense FC';
    const { status, body } = await testCtx.request
      .get(LeagueRoute.team.replace(':leagueCode', leagueCode))
      .query({ teamName });

    expect(status).toBe(200);
    expect(body).toMatchObject(TeamMatcher);
  });

  it(should.getTeamWithPlayers, async () => {
    const leagueCode = 'BSA';
    const teamName = 'Fluminense FC';
    const { status, body } = await testCtx.request
      .get(LeagueRoute.team.replace(':leagueCode', leagueCode))
      .query({ teamName, players: true });

    expect(status).toBe(200);
    expect(body).toMatchObject(TeamWithSquadMatcher);
  });
});
