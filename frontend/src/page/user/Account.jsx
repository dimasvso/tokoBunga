import React, { useEffect, useState } from "react";
import FormInput from "../../components/ui/FormInput";
import FlowerIcon from "../../components/ui/FlowerIcon";
import Button from "../../components/ui/Button";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { updateUserApi } from "../../api/Auth";
import { useAuth } from "../../context/AuthContext";

export default function AccountPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000";

  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    address: "",
    avatar: null,
  });

  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || "",
        email: user.email || "",
        address: user.address || "",
        avatar: null,
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: files ? files[0] : value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      const payload = {
        username: profileForm.username,
        email: profileForm.email,
        address: profileForm.address,
      };

      if (profileForm.avatar) {
        payload.avatar = profileForm.avatar;
      }

      const updated = await updateUserApi(payload);
      updateUser(updated);

      alert("Profile berhasil diperbarui");
    } catch {
      alert("Gagal update profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex items-center gap-3 mb-8">
          <FlowerIcon className="w-8 h-8 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-10">
          <form
            className="grid md:grid-cols-2 gap-6"
            onSubmit={handleProfileSubmit}
          >
            <div className="md:col-span-2 flex items-center gap-4">
              <img
                src={
                  user.avatar
                    ? BASE_URL + user.avatar + "?t=" + Date.now()
                    : "/default-avatar.png"
                }
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-rose-200"
              />
            </div>

            <FormInput
              label="Username"
              name="username"
              value={profileForm.username}
              onChange={handleProfileChange}
              required
            />

            <FormInput
              label="Email"
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              required
            />

            <FormInput
              label="Address"
              name="address"
              value={profileForm.address}
              onChange={handleProfileChange}
            />

            <FormInput
              label="Avatar"
              type="file"
              name="avatar"
              onChange={handleProfileChange}
            />

            <div className="md:col-span-2 flex justify-end gap-3">
              <Button type="submit" disabled={loadingProfile}>
                {loadingProfile ? "Saving..." : "Save Profile"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Kembali
              </Button>
              <Button variant="outline" type="button" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
