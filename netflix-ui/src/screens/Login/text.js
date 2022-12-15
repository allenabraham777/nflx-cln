export const title = () => "Sign In";

export const getStarted = () => "Sign In";

export const emailAddress = () => "Email address";

export const password = () => "Password";

export const newToNetflix = () => "New to Netflix?";

export const signup = () => "Sign up now";

export const toastError = (type) => {
  switch (type) {
    case "USER":
      return "Invalid username or password!";
    default:
      return "Something went wrong, please try again later.";
  }
};

export default {
  title,
  getStarted,
  emailAddress,
  password,
  newToNetflix,
  signup,
  toastError,
};
