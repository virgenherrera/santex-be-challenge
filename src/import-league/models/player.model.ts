import { Squad } from '../interfaces';

export class Player {
  static maFromSquad(args: Squad) {
    return new Player(args);
  }

  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;

  constructor(args: Squad) {
    this.id = args.id;
    this.name = args.name;
    this.position = args.position;
    this.dateOfBirth = args.dateOfBirth;
    this.nationality = args.nationality;
  }
}
