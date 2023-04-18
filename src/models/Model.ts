class Model {
  static validateRequiredParams(
    body: Record<string, any>,
    requiredParams: string[]
  ): boolean {
    const missingParams: string[] = [];
    for (const param of requiredParams) {
      if (!body[param]) {
        missingParams.push(param);
      }
    }
    if (missingParams.length > 0) {
      console.error(
        `The following parameters are missing: ${missingParams.join(", ")}`
      );
      return false;
    }
    return true;
  }
}

export default Model;
