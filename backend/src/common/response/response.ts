export interface DefaultResponse {
  status: boolean;
  code: number;
  message: string;
  data?: any; // optional field for payload
}

export const successResponse = (message: string = '', data?: any): DefaultResponse => ({
  status: true,
  code: 200,
  message,
  data,
});

export const errorResponse = (message: string = '', code: number = 400, data?: any): DefaultResponse => ({
  status: false,
  code,
  message,
  data,
});