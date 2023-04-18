class Token {
  public _id?: string;
  public numberId: number;
  public token: string;
  public expirationDate: string;

  constructor(
    _id: string,
    numberId: number,
    token: string,
    expirationDate: string
  ) {
    this._id = _id;
    this.numberId = numberId;
    this.token = token;
    this.expirationDate = expirationDate;
  }
}

export default Token;
