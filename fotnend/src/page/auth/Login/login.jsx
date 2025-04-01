import React, { useState } from "react";
import "../../../../src/index.css";
import { toast } from "react-toastify";
import axios from "axios";
import useJimStore from "../../../store/jim-store";
//ຢາກໄປໜ້າອື່ນ
import { useNavigate } from "react-router-dom";


const login = () => {
  //ປະກາດຕົວແປໄປໜ້າອື່ນ
  const navigate = useNavigate();


  const actioLogin = useJimStore((state) => state.actionLogin);
  const user = useJimStore((state) => state.user);

console.log(user);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = async (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    // ປ້ອງກັນບໍ່ໃຫ້ refresh ໜ້າ
    e.preventDefault();
    try {
      const res = await actioLogin(form);
      const role = res.data.payload.role;
      roleRedireat(role);
      toast.success('ເຂົ້າສູລະບົບແລ້ວ');
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedireat = (role)=>{
    if (role === "admin") {
      navigate("/admin");
    }else{
      navigate("/user");
    }
  }



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p>LOGIN</p>
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
        <button className="  border-2 border-gray-300 rounded-md p-2 mb-4 bg-gray-300 text-black-50">
          Login
        </button>
      </form>
    </div>
  );
};

export default login;
