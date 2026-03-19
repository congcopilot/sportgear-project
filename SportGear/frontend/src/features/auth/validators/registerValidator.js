const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s]{9,15}$/;

export function validateRegister(values) {
  const errors = {};

  if (!values.fullName?.trim()) {
    errors.fullName = "Họ tên là bắt buộc.";
  }

  if (!values.email?.trim()) {
    errors.email = "Email là bắt buộc.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!values.password) {
    errors.password = "Mật khẩu là bắt buộc.";
  } else if (values.password.length < 8) {
    errors.password = "Mật khẩu tối thiểu 8 ký tự.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp.";
  }

  if (values.phone?.trim() && !PHONE_REGEX.test(values.phone)) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }

  return errors;
}
