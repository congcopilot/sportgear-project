import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../../app/layouts/AuthLayout";
import ProfileForm from "../components/ProfileForm";
import { profileApi } from "../api/profileApi";
import { useAuth } from "../hooks/useAuth";

function ProfilePage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { user, updateUser, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await profileApi.getProfile();
        setProfile(data);
        updateUser(data);
      } catch (error) {
        setStatus({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [updateUser]);

  const handleUpdate = async (payload) => {
    setLoading(true);
    setStatus(null);
    try {
      const data = await profileApi.updateProfile(payload);
      setProfile(data);
      updateUser(data);
      setStatus({ type: "success", message: "Cập nhật hồ sơ thành công." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Hồ sơ cá nhân"
      subtitle={`Xin chào ${user?.fullName || user?.email || "SportGear user"}`}
    >
      <ProfileForm
        loading={loading}
        onSubmit={handleUpdate}
        profile={profile}
        status={status}
      />
      <div className="actions-row">
        <Link to="/login" onClick={logout}>
          Đăng xuất
        </Link>
      </div>
    </AuthLayout>
  );
}

export default ProfilePage;
