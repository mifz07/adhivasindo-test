interface LoginErrorResponse {
  status: false;
  message: string;
}

interface LoginSuccessResponse {
  status: true;
  tokens: {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    role: string;
  };
  user_id: string;
  name: string;
  email: string;
  user_type: string;
}

type LoginResponse = LoginErrorResponse | LoginSuccessResponse;