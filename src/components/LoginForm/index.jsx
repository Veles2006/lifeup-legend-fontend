// src/components/LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    emailOrUsername: "",
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
      const data = await login(form.emailOrUsername, form.password);
      setMessage("Đăng nhập thành công! Xin chào " + data.user.username);
    } catch (err) {
      const msg = err.response?.data?.message || "Lỗi đăng nhập";
      setMessage(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng nhập LifeUp Legend</h2>

      <input
        name="emailOrUsername"
        placeholder="Email hoặc Username"
        value={form.emailOrUsername}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Đăng nhập</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
