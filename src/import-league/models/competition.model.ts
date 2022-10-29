import { Competition as CompetitionResponse } from '../interfaces';

export class Competition {
  static mapFromCompetitionResponse(args: CompetitionResponse) {
    return new Competition(args);
  }

  id: number;
  name: string;
  code: string;
  areaName: string;

  constructor(args: CompetitionResponse) {
    this.id = args.id;
    this.name = args.name;
    this.code = args.code;
    this.areaName = args.area.name;
  }
}
