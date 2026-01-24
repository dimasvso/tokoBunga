import React, { useState } from "react";
import FormInput from "../../components/ui/FormInput";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login as loginApi } from "../../api/Auth";
import { useContext } from "react";
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    try {
      const tokenData = await loginApi(form);
      await login(tokenData);

      if (tokenData.user?.is_admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setErrors(
        err.response?.data?.detail || "username atau password salah"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-40 bg-linear-to-r from-rose-400 to-pink-500 relative flex items-center justify-center">
          <FlowerIcon className="w-16 h-16 text-white opacity-60 absolute top-4 left-6" />
          <FlowerIcon className="w-20 h-20 text-white" />
          <FlowerIcon className="w-14 h-14 text-white opacity-70 absolute bottom-4 right-6" />
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Masuk ke <span className="text-rose-500">BungaKu</span>
          </h2>
          {errors && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
              {errors}
            </div>
          )}

          <FormInput
            label={"Username"}
            type={"text"}
            name={"username"}
            onChange={handleChange}
            placeholder={"Contoh: User@gmail.com"}
          />

          <FormInput
            label={"Password"}
            type={"password"}
            name={"password"}
            onChange={handleChange}
            placeholder={"••••••••"}
          />

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Masuk
          </button>

          <p className="text-center text-sm text-gray-600">
            Belum punya akun?
            <a href="/register" className="text-rose-500 hover:underline">
              Daftar sekarang
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

function FlowerIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C9.243 2 7 4.243 7 7c0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.757-2.243-5-5-5zm0 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.757 0-5 2.243-5 5v1h10v-1c0-2.757-2.243-5-5-5z" />
    </svg>
  );
}
