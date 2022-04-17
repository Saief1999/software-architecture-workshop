export class Cinema {
  _id: string;

  name: string;

  description: string;

  address: string;

  phone: number;
  openingTime: string;

  closingTime: string;

  imageUrl: string;

  constructor() {
    this._id = "";
    this.name = "";
    this.description = "";
    this.address = "";
    this.phone = 12345678;
    this.openingTime = "";
    this.closingTime = "";
    this.imageUrl = "";
  }
}
