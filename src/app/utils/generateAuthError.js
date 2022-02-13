export function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return "Email или пароль введены не верно";

    case "INVALID_PASSWORD":
      return "Email или пароль введены не верно";

    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";

    default:
      return "Слишком много попыток входа. Попробуйте позднее";
  }
}
