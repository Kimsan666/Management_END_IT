import React, { useEffect, useState } from "react";
import useJimStore from "../../store/jim-store";
import { SaveProduct, readProduct, updateProduct } from "../../aip/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useParams, useNavigate } from "react-router-dom";

const inirialState = {
  qrCode: "",
  name: "",
  description: "",
  supplierId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useJimStore((state) => state.token);
  const suppliers = useJimStore((state) => state.suppliers);
  const getSupplier = useJimStore((state) => state.getSupplier);
  const products = useJimStore((state) => state.products);
  // console.log(products);

  const [form, setForm] = useState({
    qrCode: "",
    name: "",
    description: "",
    supplierId: "",
    images: [],
  });

  useEffect(() => {
    getSupplier();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
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
      const res = await updateProduct(token, id, form);
      // console.log(res);
      ;
      toast.success(`ອັບເດດສິນຄ້າສຳເລັດ`);
      setForm(inirialState);
      
      navigate("/admin/product");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("ມີບັນຫາໃນການບັນທຶກ, ກະລຸນາລອງໃໝ່!");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-md bg-white">
      <form onSubmit={handleSubmit}>
        <h1>ລາຍການສິນຄ້າ</h1>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ລະຫັດ QR Code"
          type="text"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, ""); // ลบตัวอักษรที่ไม่ใช่ตัวเลขทันที
          }}
          onKeyDown={(e) => {
            if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
              e.preventDefault(); // บล็อกตัวอักษรและอักขระพิเศษ
            }
          }}
          inputMode="numeric"
          name="qrCode"
          maxLength={50}
          value={form.qrCode}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ຊື່ສິນຄ້າ"
          type="text"
          maxLength={200}
          name="name"
          value={form.name}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ລາຍລະອຽດສິນຄ້າ"
          type="text"
          maxLength={200}
          name="description"
          value={form.description}
          onChange={handleOnChange}
        ></input>
        <select
          className="border-2 p-2 rounded-md"
          name="supplierId"
          onChange={handleOnChange}
          required
          value={form.supplierId}
        >
          <option value="" disabled>
            ເລືອກຜູ້ສະໜອງ
          </option>
          {suppliers.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <hr />

        {
          //Upload image
          <UploadFile form={form} setForm={setForm} />
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

export default FormEditProduct;
