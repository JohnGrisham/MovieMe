export class ShowTime {
  theatre: {
    id: string;
    name: string;
  }
  dateTime: string;

  constructor(showtime: any) {
    this.theatre = {id: showtime.id, name: showtime.name};
    this.dateTime = showtime.dateTime;
  }
}
