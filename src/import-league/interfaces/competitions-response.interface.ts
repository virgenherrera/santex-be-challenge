export interface CompetitionsResponse {
  competitions: Competition[];
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  area: Area;
}

interface Area {
  name: string;
}
