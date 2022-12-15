export const title = () => "Unlimited movies, TV shows and more.";

export const subtitle = () => "Watch anywhere. Cancel anytime.";

export const membershipMessage = () =>
  "Ready to watch? Enter your email to create or restart your membership.";

export const getStarted = (showPassword) =>
  showPassword ? "Sign Up" : "Get Started";

export const emailAddress = () => "Email address";

export const password = () => "Password";

export const toastError = (type) => {
  switch (type) {
    case "USER":
      return "User already exists!";
    default:
      return "Something went wrong, please try again later.";
  }
};

export default {
  title,
  subtitle,
  membershipMessage,
  getStarted,
  emailAddress,
  password,
  toastError,
};
