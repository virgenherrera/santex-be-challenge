import { LeaguePlayersMatcher } from './league-players.matcher';

export const TeamMatcher = {
  id: expect.any(Number),
  name: expect.any(String),
  tla: expect.any(String),
  shortName: expect.any(String),
  areaName: expect.any(String),
  address: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

export const TeamWithSquadMatcher = {
  ...TeamMatcher,
  squad: LeaguePlayersMatcher,
};
