import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../app/layouts/AuthLayout";
import LoginForm from "../components/LoginForm";
import { authApi } from "../api/authApi";
import { AUTH_MESSAGE } from "../types/auth.types";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await authApi.login(values);
      login(response.accessToken, response.user);
      setStatus({ type: "success", message: AUTH_MESSAGE.loginSuccess });
      navigate("/profile", { replace: true });
    } catch (error) {
      const message = error.message.includes("locked")
        ? AUTH_MESSAGE.locked
        : error.message;
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Đăng nhập" subtitle="Tiếp tục với tài khoản SportGear của bạn">
      <LoginForm loading={loading} onSubmit={handleLogin} status={status} />
      <div className="actions-row">
        <Link to="/register">Tạo tài khoản mới</Link>
        <Link to="/forgot-password">Quên mật khẩu?</Link>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
