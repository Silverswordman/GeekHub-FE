export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (userId) => ({
  type: REGISTER_SUCCESS,
  payload: { userId },
});

export const registerFailure = (errorMessage) => {
  try {
    const errorObject = JSON.parse(errorMessage);
    const message = errorObject.message || "Errore nella registrazione";
    return {
      type: REGISTER_FAILURE,
      payload: message,
    };
  } catch (error) {
    return {
      type: REGISTER_FAILURE,
      payload: errorMessage,
    };
  }
};




export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest());

    try {
      const response = await fetch("http://localhost:3003/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      dispatch(registerSuccess(data.userId));
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};
