import { NestApplication } from '@nestjs/core';
import { TeamRoute } from '../../../src/team/enums';
import { TeamMembersMatcher } from '../../matchers';
import { dbCleanup, dbPopulate, TestContext } from '../../utils';

const enum should {
  initTestContext = 'Should test Context be properly initialized.',
  throw404TeamId = 'Should throw 404 when looking a non registered teamId.',
  getTeamMembers = 'Should Get team members properly.',
}

describe(`e2e: (GET)${TeamRoute.players}`, () => {
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

  it(should.throw404TeamId, async () => {
    const teamId = '123456789';
    const { status, body } = await testCtx.request.get(
      TeamRoute.players.replace(':teamId', teamId),
    );

    expect(status).toBe(404);
    expect(body).toMatchObject({
      code: 'not-found-error',
      message: 'Not Found',
      details: [`The team with id: '${teamId}' does not exist`],
    });
  });

  it(should.getTeamMembers, async () => {
    const teamId = '1765';
    const { status, body } = await testCtx.request.get(
      TeamRoute.players.replace(':teamId', teamId),
    );

    expect(status).toBe(200);
    expect(body).toMatchObject(TeamMembersMatcher);
  });
});
