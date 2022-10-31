import { NestApplication } from '@nestjs/core';
import { of } from 'rxjs';
import { ImportLeagueRoute } from '../../../src/import-league/enums';
import { ImportLeagueMatcher } from '../../matchers';
import { mockHttpService } from '../../mocks';
import { getMockData, TestContext } from '../../utils';

const enum should {
  initTestContext = 'Should test Context be properly initialized.',
  pullDataFromApiAndPopulate = 'Should pull data from "football-data" API and populate database',
}

describe(`e2e: (POST)${ImportLeagueRoute.importLeague}`, () => {
  let testCtx: TestContext = null;

  beforeAll(async () => {
    testCtx = await TestContext.getInstance();

    mockHttpService.get = jest.fn().mockImplementation(args => {
      const dataFileKey =
        args === 'competitions/' ? 'competitionResponse' : 'competitionTeams';
      const data = getMockData(dataFileKey);

      return of({ data });
    });
  });

  it(should.initTestContext, async () => {
    expect(testCtx).not.toBeNull();
    expect(testCtx.request).not.toBeNull();
    expect(testCtx.app).toBeInstanceOf(NestApplication);
  });

  afterAll(() => jest.resetAllMocks());

  it(should.pullDataFromApiAndPopulate, async () => {
    const { status, body } = await testCtx.request.post(
      ImportLeagueRoute.importLeague,
    );

    expect(status).toBe(201);
    expect(body).toMatchObject(ImportLeagueMatcher);
  });
});
