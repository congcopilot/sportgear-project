export function validateResetPassword(values) {
  const errors = {};

  if (!values.token?.trim()) {
    errors.token = "Token reset là bắt buộc.";
  }

  if (!values.newPassword) {
    errors.newPassword = "Mật khẩu mới là bắt buộc.";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Mật khẩu tối thiểu 8 ký tự.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp.";
  }

  return errors;
}
