// src/components/RegisterForm.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await register(form.username, form.email, form.password);
      setMessage("Đăng ký thành công! Xin chào " + data.user.username);
    } catch (err) {
      const msg = err.response?.data?.message || "Lỗi đăng ký";
      setMessage(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng ký LifeUp Legend</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Đăng ký</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
