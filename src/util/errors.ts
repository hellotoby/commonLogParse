/**
 * Represents a validation error with an associated timestamp.
 *
 * @remarks
 * This error class extends the built-in `Error` class and includes a timestamp
 * indicating when the error was created. The error name is set to the class name.
 *
 * @example
 * ```typescript
 * throw new ValidationError('Invalid input data');
 * ```
 *
 * @param message - The error message describing the validation failure.
 * @param timestamp - The ISO string timestamp when the error was created. Defaults to the current time.
 */
export class ValidationError extends Error {
  public readonly timestamp: string = new Date().toISOString();

  public constructor(
    public override message: string = "",
  ) {
    super(message);
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}
