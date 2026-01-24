import React, { useState } from "react";
import FormInput from "../../components/ui/FormInput";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    setSuccess("");
    try {
      const res = await api.post("account/register/", form);
      const token = localStorage.getItem("access");

      if (!token) {
        navigate("/login");
      }
      setSuccess(res.data.message);
      navigate("/home");
    } catch (err) {
      if (err.response?.data) {
        const msgs = [];

        for (const key in err.response.data) {
          err.response.data[key].forEach((msg) => {
            msgs.push(`${key}: ${msg}`);
          });
        }
        setErrors(msgs);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 to-green-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-40 bg-linear-to-r from-rose-400 to-pink-500 relative flex items-center justify-center">
          <FlowerIcon className="w-16 h-16 text-white opacity-60 absolute top-4 left-6" />
          <FlowerIcon className="w-20 h-20 text-white" />
          <FlowerIcon className="w-14 h-14 text-white opacity-70 absolute bottom-4 right-6" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <h2 className="md:col-span-2 text-2xl font-bold text-gray-800 text-center">
            Daftar <span className="text-rose-500">BungaKu</span>
          </h2>

          {errors.map((err, i) => (
            <p key={i} style={{ color: "red" }}>
              {err}
            </p>
          ))}

          {success && <p style={{ color: "green" }}>{success}</p>}

          <FormInput
            label={"Username"}
            type={"text"}
            name={"username"}
            onChange={handleChange}
            placeholder={"User123"}
          />

          <FormInput
            label={"Email"}
            type={"email"}
            name={"email"}
            onChange={handleChange}
            placeholder={"User123@gmail.com"}
          />
           <FormInput
            label={"address"}
            type={"address"}
            name={"address"}
            onChange={handleChange}
            placeholder={"Alamat Lengkap Anda"}
          />

          <FormInput
            label={"Password"}
            type={"password"}
            name={"password"}
            onChange={handleChange}
            placeholder={"••••••••"}
          />

          <FormInput
            label={"Confirm Password"}
            type={"password2"}
            name={"password2"}
            onChange={handleChange}
            placeholder={"••••••••"}
          />

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg transition"
            >
              Buat Akun
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Sudah punya akun?
              <a href="/login" className="text-rose-500 hover:underline">
                Masuk di sini
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />
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
