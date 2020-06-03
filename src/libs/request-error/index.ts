class RequestError extends Error {
  statusCode: number;
  message: string;
  details: unknown;

  constructor(code: number, message: string, details?: unknown) {
    super();

    this.statusCode = code;
    this.message = message;
    this.details = details;
  }
}

export default RequestError;
