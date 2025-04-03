import React, { useEffect, useState } from "react";
import useJimStore from "../../store/jim-store";
import { SaveProduct, readProduct, updateProduct } from "../../aip/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useParams, useNavigate } from "react-router-dom";
import { readWarehouse, updateWarehouse } from "../../aip/Warehouse";
import UploadImageWH from "./UploadImageWH";

const inirialState = {
    name: "",
    email: "",
    contact: "",
    location: "",
    images: [],
  };

const FormEditWarehous = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useJimStore((state) => state.token);
  
  // console.log(products);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    images: [],
  });

  useEffect(() => {
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readWarehouse(token, id, form);
      console.log("res for backend", res);
      
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await updateWarehouse(token, id, form);
      // console.log(res);
      ;
      toast.success(`ອັບເດດສິນຄ້າສຳເລັດ`);
      setForm(inirialState);
      
      navigate("/admin/warehouse");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("ມີບັນຫາໃນການແກ້້ໄຂ, ກະລຸນາລອງໃໝ່!");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-md bg-white">
      <form onSubmit={handleSubmit}>
      <h1>ລາຍການສາງສິນຄ້າ</h1>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ຊື່ສາງສິນຄ້າ"
          type="text"
          name="name"
          value={form.name}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ຊື່ສາງສິນຄ້າ"
          type="email"
          name="email"
          value={form.email}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ເບີ9xxxxxxx"
          type="text"
          maxLength={8}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, ""); // ลบตัวอักษรที่ไม่ใช่ตัวเลขทันที
          }}
          onKeyDown={(e) => {
            if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
              e.preventDefault(); // บล็อกตัวอักษรและอักขระพิเศษ
            }
          }}
          inputMode="numeric"
          name="contact"
          value={form.contact}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ລາຍລະອຽດສິນຄ້າ"
          type="text"
          name="location"
          value={form.location}
          onChange={handleOnChange}
        ></input>
        

        <hr />

        {
          //Upload image
          <UploadImageWH form={form} setForm={setForm} />
        }

        <button className="bg-red-500  hover:bg-red-700 text-white p-2  rounded-md ml-4">
          ບັນທຶກສິນຄ້າ
        </button>

        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditWarehous;
