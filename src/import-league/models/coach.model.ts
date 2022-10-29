import { Coach as CoachResponse } from '../interfaces';

export class Coach {
  static mapFromCoachResponse(args: CoachResponse) {
    return new Coach(args);
  }

  id: number | null;
  name: string | null;
  dateOfBirth: string | null;
  nationality: string | null;

  constructor(args: CoachResponse) {
    this.id = args.id;
    this.name = args.name;
    this.dateOfBirth = args.dateOfBirth;
    this.nationality = args.nationality;
  }
}
