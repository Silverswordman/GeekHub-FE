import { loginRequest, loginSuccess, loginFailure } from "../reducers/authslice";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await fetch("http://localhost:3003/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Errore nel login");
      }
      const data = await response.json();
      localStorage.setItem("token", "Bearer " + data.token);
      dispatch(loginSuccess({ token: data.token }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};
