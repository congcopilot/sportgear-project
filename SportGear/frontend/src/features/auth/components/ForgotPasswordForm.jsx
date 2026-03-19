import { useState } from "react";
import { validateForgotPassword } from "../validators/forgotPasswordValidator";

function ForgotPasswordForm({ onSubmit, loading, status }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForgotPassword({ email });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit({ email });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {status?.message ? (
        <div className={`status-text ${status.type}`}>{status.message}</div>
      ) : null}

      <div>
        <label htmlFor="email">Email tài khoản</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email ? <div className="error-text">{errors.email}</div> : null}
      </div>

      <button disabled={loading} type="submit">
        {loading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
