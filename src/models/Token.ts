class Token {
  public email: string;
  public cardNumber: string;
  public cvv: string;

  public expirationYear: string;
  public expirationMonth: string;

  constructor(
    email: string,
    cardNumber: string,
    cvv: string,
    expirationYear: string,
    expirationMonth: string
  ) {
    this.email = email;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expirationYear = expirationYear;
    this.expirationMonth = expirationMonth;
  }
}

export default Token;
