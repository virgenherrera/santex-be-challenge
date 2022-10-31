import { NestApplication } from '@nestjs/core';
import { LeagueRoute } from '../../../src/league/enums';
import { TestContext } from '../../utils';

const enum should {
  initTestContext = 'Should test Context be properly initialized.',
  throw400OnNonIntLeagueId = 'Should throw 400 when looking with a non integer :leagueId.',
}

describe(`e2e: (GET)${LeagueRoute.players}`, () => {
  let testCtx: TestContext = null;

  beforeAll(async () => (testCtx = await TestContext.getInstance()));

  it(should.initTestContext, async () => {
    expect(testCtx).not.toBeNull();
    expect(testCtx.request).not.toBeNull();
    expect(testCtx.app).toBeInstanceOf(NestApplication);
  });

  it(should.throw400OnNonIntLeagueId, async () => {
    const { status } = await testCtx.request.get(
      LeagueRoute.players.replace(':leagueId', '010203F'),
    );

    expect(status).toBe(400);
  });
});
