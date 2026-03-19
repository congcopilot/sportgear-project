import { useState } from "react";
import { validateResetPassword } from "../validators/resetPasswordValidator";

function ResetPasswordForm({ tokenPrefill = "", onSubmit, loading, status }) {
  const [form, setForm] = useState({
    token: tokenPrefill,
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateResetPassword(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {status?.message ? (
        <div className={`status-text ${status.type}`}>{status.message}</div>
      ) : null}

      <div>
        <label htmlFor="token">Reset token</label>
        <input
          id="token"
          name="token"
          value={form.token}
          onChange={handleChange}
          placeholder="Nhập token được gửi qua email"
        />
        {errors.token ? <div className="error-text">{errors.token}</div> : null}
      </div>

      <div>
        <label htmlFor="newPassword">Mật khẩu mới</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword ? <div className="error-text">{errors.newPassword}</div> : null}
      </div>

      <div>
        <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword ? (
          <div className="error-text">{errors.confirmPassword}</div>
        ) : null}
      </div>

      <button disabled={loading} type="submit">
        {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;
