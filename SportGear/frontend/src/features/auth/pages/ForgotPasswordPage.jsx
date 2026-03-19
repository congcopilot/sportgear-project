import { Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../../app/layouts/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { authApi } from "../api/authApi";

function ForgotPasswordPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload) => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await authApi.forgotPassword(payload);
      setStatus({ type: "success", message: response.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Quên mật khẩu"
      subtitle="Nhập email để nhận token đặt lại mật khẩu"
    >
      <ForgotPasswordForm loading={loading} onSubmit={handleSubmit} status={status} />
      <p>
        Quay lại <Link to="/login">Đăng nhập</Link>
      </p>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
