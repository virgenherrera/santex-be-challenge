import { LeaguePlayersMatcher } from './league-players.matcher';

const CoachMatcher = {
  id: expect.any(Number),
  name: expect.any(String),
  dateOfBirth: expect.any(String),
  nationality: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

export const TeamMembersMatcher = {
  coach: CoachMatcher,
  players: LeaguePlayersMatcher,
};
