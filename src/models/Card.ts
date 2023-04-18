import { ObjectId } from "mongodb";
import Model from "./Model";
class Card extends Model {
  public _id?: ObjectId;
  public email: string;
  public number: string;
  public cvv: string;

  public expirationYear: string;
  public expirationMonth: string;

  static INVALID_EMAIL_MESSAGE =
    "El correo electrónico es inválido. Por favor, ingrese un correo electrónico válido.";
  static INVALID_CARD_NUMBER_MESSAGE =
    "El número de tarjeta es inválido. Por favor, ingrese un número de tarjeta válido con una longitud entre 13 y 16 caracteres y que cumpla con el algoritmo de LUHN";
  static INVALID_CVV_MESSAGE =
    "El CVV es inválido. Por favor, ingrese un número de CVV válido con una longitud de 3 o 4 caracteres. Para Visa/Mastercard debe ser 123 y para Amex debe ser 4532";
  static INVALID_EXPIRATION_YEAR_MESSAGE =
    "El año de expiración es inválido. Por favor, ingrese un año válido con una longitud de 4 caracteres y que no sea menor que el año actual";
  static INVALID_EXPIRATION_MONTH_MESSAGE =
    "El mes de expiración es inválido. Por favor, ingrese un número válido para el mes de expiración con una longitud de 1 o 2 caracteres y que esté entre 1 y 12";

  static INVALID_REQUIRED_PARAMETERS_MESSAGE =
    "Verifique parametros requeridos:";

  constructor(
    email: string,
    number: string,
    cvv: string,
    expirationYear: string,
    expirationMonth: string
  ) {
    super();

    this.email = email;
    this.number = number;
    this.cvv = cvv;
    this.expirationYear = expirationYear;
    this.expirationMonth = expirationMonth;
  }

  static isValidCardNumber(cardNumber) {
    const cardNumberStr = cardNumber.toString();
    if (cardNumberStr.length < 13 || cardNumberStr.length > 16) {
      return false;
    }

    // Validar utilizando el algoritmo de Luhn
    let sum = 0;
    let doubleUp = false;
    for (let i = cardNumberStr.length - 1; i >= 0; i--) {
      let curDigit = parseInt(cardNumberStr.charAt(i));

      if (doubleUp) {
        curDigit *= 2;
        if (curDigit > 9) {
          curDigit -= 9;
        }
      }

      sum += curDigit;
      doubleUp = !doubleUp;
    }

    return sum % 10 === 0;
  }

  static isValidCvv(cvv, cardNumber) {
    // Validar la longitud del CVV
    const cvvStr = cvv.toString();
    if (cvvStr.length < 3 || cvvStr.length > 4) {
      return false;
    }

    // Validar el CVV dependiendo del tipo de tarjeta
    const firstDigit = parseInt(cardNumber.toString().charAt(0));
    if (firstDigit === 4 || firstDigit === 5) {
      // Visa o Mastercard
      return cvv.length === 3;
    } else if (firstDigit === 3) {
      // Amex
      return cvv.length === 4;
    } else {
      return false;
    }
  }

  static isValidExpirationMonth(expirationMonth) {
    // Validar la longitud del mes de expiración
    const expirationMonthStr = expirationMonth.toString();
    if (expirationMonthStr.length < 1 || expirationMonthStr.length > 2) {
      return false;
    }

    // Validar que sea un número entre 1 y 12
    const month = parseInt(expirationMonthStr);
    return month >= 1 && month <= 12;
  }

  static isValidExpirationYear(expirationYear) {
    // Validar la longitud del año de expiración
    const expirationYearStr = expirationYear.toString();
    if (expirationYearStr.length !== 4) {
      return false;
    }

    // Validar que sea un año actual o máximo 5 años en el futuro
    const currentYear = new Date().getFullYear();
    const year = parseInt(expirationYearStr);
    return year >= currentYear && year <= currentYear + 5;
  }

  static isValidEmail(email) {
    // Validar la longitud del correo electrónico
    const emailStr = email.toString();
    if (emailStr.length < 5 || emailStr.length > 100) {
      return false;
    }

    // Validar que el correo electrónico tenga un dominio válido
    const validDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
    const atIndex = emailStr.indexOf("@");
    if (atIndex === -1) {
      return false;
    }

    const domain = emailStr.substring(atIndex + 1);
    return validDomains.includes(domain);
  }

  static validateEmail(email: string): string | undefined {
    return Card.isValidEmail(email) ? undefined : Card.INVALID_EMAIL_MESSAGE;
  }

  static validateCardNumber(cardNumber: number): string | undefined {
    return Card.isValidCardNumber(cardNumber)
      ? undefined
      : Card.INVALID_CARD_NUMBER_MESSAGE;
  }

  static validateCvv(cvv: number, cardNumber: number): string | undefined {
    return Card.isValidCvv(cvv, cardNumber)
      ? undefined
      : Card.INVALID_CVV_MESSAGE;
  }

  static validateExpirationYear(expirationYear: string): string | undefined {
    return Card.isValidExpirationYear(expirationYear)
      ? undefined
      : Card.INVALID_EXPIRATION_YEAR_MESSAGE;
  }

  static validateExpirationMonth(expirationMonth: string): string | undefined {
    return Card.isValidExpirationMonth(expirationMonth)
      ? undefined
      : Card.INVALID_EXPIRATION_MONTH_MESSAGE;
  }
}

export default Card;
