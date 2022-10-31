import { ImportedCompetitionsResponse } from '../../src/import-league/models';

export const ImportLeagueMatcher: Record<
  keyof ImportedCompetitionsResponse,
  any
> = {
  competitionsCount: expect.any(Number),
  competitions: expect.arrayContaining([expect.any(String)]),
  teamsCount: expect.any(Number),
  teams: expect.arrayContaining([expect.any(String)]),
  coachesCount: expect.any(Number),
  coaches: expect.arrayContaining([expect.any(String)]),
  playersCount: expect.any(Number),
  players: expect.arrayContaining([expect.any(String)]),
};
