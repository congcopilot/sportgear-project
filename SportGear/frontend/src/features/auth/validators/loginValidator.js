const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values) {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = "Email là bắt buộc.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!values.password) {
    errors.password = "Mật khẩu là bắt buộc.";
  }

  return errors;
}
