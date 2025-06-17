class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    data = null,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.success = false;
    this.errors = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export { ApiError };
