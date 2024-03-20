// backend is hosted on port 8080
// create needs username and password only - POST @ /users endpoint
// login needs username and password only - GET by username @ /users endpoint
// edit will take either username, password, high_score_surv, high_score_ta - PATCH by id @ /users/{id} endpoint through user context
// get all users - GET @ /users endpoint
// get user by id - GET by id @ /users/{id} endpoint
// delete user - DELETE by id @ /users/{id} endpoint

const createUser = async (username: string, password: string) => {
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
  const data = await response.json();
  return data;
};

const loginUser = async (username: string, password: string) => {
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
