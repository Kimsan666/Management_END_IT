import React, { useState } from "react";
import "../../../../src/index.css";
import { toast } from "react-toastify";
import axios from "axios";
const register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    ConfirmPassword: "",
  });

  const handleChange = async (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ປ້ອງກັນບໍ່ໃຫ້ refresh ໜ້າ
    if (form.password !== form.ConfirmPassword) {
      return alert("ລະຫັດບໍ່ຄືກັນ");
    }
    console.log(form);
    try {
      const res = await axios.post('http://localhost:5003/api/register',form);
      console.log(res);
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err);
    }
  };

  return (
    <div>
      REGISTER
      <form
        className="flex flex-col gap-4 w-1/2 mx-auto mt-10"
        onSubmit={handleSubmit}
      >
        <input
          type="username"
          placeholder="Username"
          name="username"
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="ConfirmPassword"
          name="ConfirmPassword"
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
          onChange={handleChange}
        />
        <button className="  border-2 border-gray-300 rounded-md p-2 mb-4 bg-gray-300 text-black-50">
          Register
        </button>
      </form>
    </div>
  );
};

export default register;
