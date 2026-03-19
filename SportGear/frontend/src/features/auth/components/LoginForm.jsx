import { useState } from "react";
import { validateLogin } from "../validators/loginValidator";

const initialForm = {
  email: "",
  password: ""
};

function LoginForm({ onSubmit, loading, status }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateLogin(form);
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email ? <div className="error-text">{errors.email}</div> : null}
      </div>

      <div>
        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password ? <div className="error-text">{errors.password}</div> : null}
      </div>

      <button disabled={loading} type="submit">
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}

export default LoginForm;
