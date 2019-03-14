export class Genre {
   name : string;
   id: number;

   constructor(genreResponse: any) {
     this.id = genreResponse;
   }
}
