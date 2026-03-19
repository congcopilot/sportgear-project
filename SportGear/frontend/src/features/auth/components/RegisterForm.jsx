import { useState } from "react";
import { validateRegister } from "../validators/registerValidator";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: ""
};

function RegisterForm({ onSubmit, loading, status }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateRegister(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit(form, () => {
      setForm(initialForm);
    });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {status?.message ? (
        <div className={`status-text ${status.type}`}>{status.message}</div>
      ) : null}

      <div>
        <label htmlFor="fullName">Họ tên</label>
        <input
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Nguyen Van A"
        />
        {errors.fullName ? <div className="error-text">{errors.fullName}</div> : null}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@sportgear.vn"
        />
        {errors.email ? <div className="error-text">{errors.email}</div> : null}
      </div>

      <div>
        <label htmlFor="phone">Số điện thoại (tuỳ chọn)</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0987xxxxxx"
        />
        {errors.phone ? <div className="error-text">{errors.phone}</div> : null}
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

      <div>
        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
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
        {loading ? "Đang xử lý..." : "Tạo tài khoản"}
      </button>
    </form>
  );
}

export default RegisterForm;
