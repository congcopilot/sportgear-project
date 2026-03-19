import { Link } from "react-router-dom";
import AuthLayout from "../../../app/layouts/AuthLayout";
import RegisterForm from "../components/RegisterForm";
import { authApi } from "../api/authApi";
import { AUTH_MESSAGE } from "../types/auth.types";
import { useState } from "react";

function RegisterPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values, done) => {
    setLoading(true);
    setStatus(null);
    try {
      await authApi.register(values);
      setStatus({ type: "success", message: AUTH_MESSAGE.registerSuccess });
      done();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Tạo tài khoản SportGear"
      subtitle="Đăng ký nhanh để mua sắm và theo dõi đơn hàng"
    >
      <RegisterForm loading={loading} onSubmit={handleRegister} status={status} />
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
