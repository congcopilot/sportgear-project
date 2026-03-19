const PHONE_REGEX = /^[0-9+\-\s]{9,15}$/;

export function validateProfile(values) {
  const errors = {};

  if (!values.fullName?.trim()) {
    errors.fullName = "Họ tên là bắt buộc.";
  }

  if (values.phone?.trim() && !PHONE_REGEX.test(values.phone)) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }

  if (values.avatarUrl?.trim() && !/^https?:\/\//.test(values.avatarUrl)) {
    errors.avatarUrl = "Avatar URL phải bắt đầu bằng http:// hoặc https://";
  }

  return errors;
}
