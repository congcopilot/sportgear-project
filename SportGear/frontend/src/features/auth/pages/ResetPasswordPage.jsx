import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../../app/layouts/AuthLayout";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { authApi } from "../api/authApi";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token") || "";

  const handleSubmit = async (payload) => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await authApi.resetPassword(payload);
      setStatus({ type: "success", message: response.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Đặt lại mật khẩu" subtitle="Nhập token và mật khẩu mới">
      <ResetPasswordForm
        loading={loading}
        onSubmit={handleSubmit}
        status={status}
        tokenPrefill={token}
      />
      <p>
        Quay lại <Link to="/login">Đăng nhập</Link>
      </p>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
