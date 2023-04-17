function isCardNumberValid(cardNumber: string): boolean {
  // LUHN
  const cleanNumber = cardNumber.replace(/\D/g, ""); // Elimina los caracteres no numéricos
  let sum = 0;
  let double = false;
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

export { isCardNumberValid };
