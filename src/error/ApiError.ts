import { BaseError } from "./BaseError";
import type { ApiErrorDetail } from "../types/api";

export class ApiError extends BaseError {
  status: string;
  statusCode: number;
  errors: ApiErrorDetail[];

  constructor(
    statusCode: number,
    status: string,
    message: string,
    errors: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.errors = errors;
  }
}
