export interface CompetitionTeamsResponse {
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
  tla?: string; // could be null or empty string
  shortName: string;
  address: string;
  area: Area;
  coach: Coach;
  squad: Squad[];
}

interface Area {
  name: string;
}

export interface Coach {
  id: number | null;
  name: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
}

export interface Squad {
  id: number;
  name: string;
  position: string | null;
  dateOfBirth: string;
  nationality: string;
}
