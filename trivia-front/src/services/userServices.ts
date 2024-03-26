export interface User {
  id: number;
  username: string;
  password: string;
  high_score_surv: number;
  high_score_ta: number;
  roles: string;
}

export const guestUser: User = {
  id: -1,
  username: "Guest",
  password: "",
  high_score_surv: 0,
  high_score_ta: 0,
  roles: "GUEST",
};

export interface EditUserParams {
  username?: string;
  password?: string;
  high_score_surv?: number;
  high_score_ta?: number;
}

export const createUser = async (username: string, password: string) => {
  const url = "http://localhost:8080/users";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password}),
  });
  if (!response.ok) {
    throw new Error(`Unable to create user! status: ${response.status}`);
  }
  const data: User = await response.json();
  return data;
};

export const loginUser = async (username: string, password: string) => {
  const url = `http://localhost:8080/users/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password}),
  });
  if (!response.ok) {
    throw new Error(`Unable to login user! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const getAllUsers = async () => {
  const url = "http://localhost:8080/users";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to get users! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const getUserById = async (id: number) => {
  const url = `http://localhost:8080/users/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to get user! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const editUser = async (id: number, params: EditUserParams) => {
  const url = `http://localhost:8080/users/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error(`Unable to edit user! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const deleteUser = async (id: number) => {
  const url = `http://localhost:8080/users/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Unable to delete user! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
