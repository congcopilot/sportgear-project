const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForgotPassword(values) {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = "Email là bắt buộc.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Email không hợp lệ.";
  }

  return errors;
}
