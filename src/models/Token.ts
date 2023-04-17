class Token {
  public id: number;
  public numberId: number;
  public token: string;
  public expirationDate: string;

  constructor(
    id: number,
    numberId: number,
    token: string,
    expirationDate: string
  ) {
    this.id = id;
    this.numberId = numberId;
    this.token = token;
    this.expirationDate = expirationDate;
  }
}

export default Token;
