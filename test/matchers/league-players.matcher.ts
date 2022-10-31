const LeaguePlayerMatcher = {
  id: expect.any(Number),
  name: expect.any(String),
  position: expect.any(String),
  dateOfBirth: expect.any(String),
  nationality: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

export const LeaguePlayersMatcher = expect.arrayContaining([
  LeaguePlayerMatcher,
]);
