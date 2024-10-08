import axiosClient from "../apiClient";

export function login(data: { email: string; password: string }) {
  return axiosClient.post("/user/login", data);
}

export function register(data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  return axiosClient.post("/user/register", data);
}

export function getUserInfo() {
  return axiosClient.get("/user/me");
}

export async function emailTaken(email: string) {
  try {
    const res = await axiosClient.get(`/user/emailTaken`, {
      params: { email },
    });
    console.log("res", res);

    return res.data.taken;
  } catch (err) {
    console.error(err);

    return true;
  }
}
