class Card {
  public id: number;
  public email: string;
  public number: string;
  public cvv: string;

  public expirationYear: string;
  public expirationMonth: string;

  constructor(
    email: string,
    number: string,
    cvv: string,
    expirationYear: string,
    expirationMonth: string
  ) {
    this.email = email;
    this.number = number;
    this.cvv = cvv;
    this.expirationYear = expirationYear;
    this.expirationMonth = expirationMonth;
  }
}

export default Card;
