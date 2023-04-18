class Transaction {
  public cardId: string;
  public token: string;
  public expirationDate: string;

  constructor(cardId: string, token: string, expirationDate: string) {
    this.cardId = cardId;
    this.token = token;
    this.expirationDate = expirationDate;
  }
}

export default Transaction;
