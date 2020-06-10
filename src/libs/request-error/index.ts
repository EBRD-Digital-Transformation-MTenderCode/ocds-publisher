class RequestError extends Error {
  statusCode: number;
  message: string;

  constructor(code: number, message: string) {
    super();

    this.statusCode = code;
    this.message = message;
  }
}

export default RequestError;
