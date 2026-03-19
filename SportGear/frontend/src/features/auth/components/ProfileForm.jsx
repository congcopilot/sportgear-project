import { useEffect, useState } from "react";
import { validateProfile } from "../validators/profileValidator";

function ProfileForm({ profile, onSubmit, loading, status }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    avatarUrl: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!profile) {
      return;
    }
    setForm({
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      avatarUrl: profile.avatarUrl || ""
    });
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, avatarUrl: localUrl }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateProfile(form);
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
        <label htmlFor="fullName">Họ tên</label>
        <input
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        {errors.fullName ? <div className="error-text">{errors.fullName}</div> : null}
      </div>

      <div>
        <label htmlFor="phone">Số điện thoại</label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone ? <div className="error-text">{errors.phone}</div> : null}
      </div>

      <div>
        <label htmlFor="avatarUrl">Avatar URL</label>
        <input
          id="avatarUrl"
          name="avatarUrl"
          value={form.avatarUrl}
          onChange={handleChange}
        />
        {errors.avatarUrl ? <div className="error-text">{errors.avatarUrl}</div> : null}
      </div>

      <div>
        <label htmlFor="avatarFile">Upload avatar local (demo)</label>
        <input id="avatarFile" name="avatarFile" type="file" onChange={handleAvatarFile} />
      </div>

      {form.avatarUrl ? (
        <img
          alt="Avatar preview"
          src={form.avatarUrl}
          style={{ width: 72, height: 72, borderRadius: 12, objectFit: "cover" }}
        />
      ) : null}

      <button disabled={loading} type="submit">
        {loading ? "Đang lưu..." : "Cập nhật hồ sơ"}
      </button>
    </form>
  );
}

export default ProfileForm;
