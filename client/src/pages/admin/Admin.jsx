import React from 'react';
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./admin.scss";

// Hàm kiểm tra tính hợp lệ của email
const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Hàm kiểm tra tính hợp lệ của username (ít nhất 4 kí tự)
const isUsernameValid = (username) => {
  return username.length >= 4;
};

// Hàm kiểm tra tính hợp lệ của password (ít nhất 4 kí tự)
const isPasswordValid = (password) => {
  return password.length >= 4;
};

const Admin = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createMutation = useMutation((inputs) => {
    return makeRequest.post("/auth/managerRegister/", inputs);
  });

  const handleClick = async (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của email trước khi gửi đi
    if (!isEmailValid(inputs.email)) {
      setErr("Invalid email address");
      return;
    }

    // Kiểm tra tính hợp lệ của username
    if (!isUsernameValid(inputs.username)) {
      setErr("Username must be at least 4 characters");
      return;
    }

    // Kiểm tra tính hợp lệ của password
    if (!isPasswordValid(inputs.password)) {
      setErr("Password must be at least 4 characters");
      return;
    }

    createMutation.mutate(inputs);
    setInputs({
      username: "",
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <div className="admin">
      <div className="card">
        <div className="right">
          <h1>Register Manager</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            {err && <div className="error">{err}</div>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
