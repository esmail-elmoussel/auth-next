export interface ResponseError {
  error: string;
  message: string;
  statusCode: string;
}

export type FetchBaseQueryError =
  | {
      status: number;
      data?: ResponseError;
    }
  | undefined;
