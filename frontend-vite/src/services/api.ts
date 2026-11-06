import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/@types/auth";

export async function fetchLogin({ username, password }: LoginRequest) {
  const data = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const res = (await data.json()) as AuthResponse;
  return res;
}

export async function fetchSignup({
  email,
  username,
  password,
}: RegisterRequest) {
  const data = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  });

  const res = await data.json();

  return res;
}
