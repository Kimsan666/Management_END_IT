import React, { useEffect, useState } from "react";
import useJimStore from "../../store/jim-store";
import { removeProduct, SaveProduct } from "../../aip/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";

const inirialState = {
  qrCode: "",
  name: "",
  description: "",
  supplierId: "",
  images: [],
};

const FormProduct = () => {
  const token = useJimStore((state) => state.token);
  const suppliers = useJimStore((state) => state.suppliers);
  const getSupplier = useJimStore((state) => state.getSupplier);
  const getProduct = useJimStore((state) => state.getProduct);
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
    getProduct(100);
  }, []);

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
      const res = await SaveProduct(token, form);
      // console.log(res);
      setForm(inirialState);
      getProduct(token);
      toast.success(`ບັນທຶກ ${res.data.name} ສຳເລັດ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      if (window.confirm("ຕ້ອງການລົບຂໍ້ມູນນີ້ແທ້ບໍ?")) {
        try {
          const res = await removeProduct(token, id);
          console.log(res);
          toast.success(`ລົບ ${res.data.name} ສຳເລັດ`);
          getProduct();
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-md bg-white">
      <form onSubmit={handleSubmit}>
        <h1 className="font-Sanslem text-2xl">aaaa</h1>
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
          name="name"
          maxLength={200}
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
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white border">
              <tr className="text-white my-4 mx-4">
                <th scope="col">ລຳດັບ</th>
                <th scope="col">ຮູບພາບສິນຄ້າ</th>
                <th scope="col">ID</th>
                <th scope="col">QR Code</th>
                <th scope="col">ຊື່ສິນຄ້າ</th>
                <th scope="col">ລາຍລະອຽດສິນຄ້າ</th>
                <th scope="col">ຊື່ຜູ້ສະໜອງ</th>
                <th scope="col">ວັນທີອັບເດດ</th>
                <th scope="col">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                // console.log(item);
                return (
                  <tr key={item.id || index} className="border-t">
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2 text-center">
                      {item.images.length > 0 ? (
                        <img
                          src={item.images[0].url}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg mx-auto"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg mx-auto bg-gray-300 flex items-center justify-center">

                          NOT IMAGE
                        </div>
                      )}
                    </td>
                    <td className="p-2 text-center">{item.id}</td>
                    <td className="p-2 text-center">{item.qrCode}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 truncate max-w-xs">
                      {item.description}
                    </td>
                    <td className="p-2">
                      {suppliers.find((s) => s.id === item.supplierId)?.name ||
                        "ບໍ່ມີຂໍ້ມູນ"}
                    </td>
                    <td className="p-2 text-center">{item.updatedAt}</td>
                    <td className="p-2 text-center flex gap-2">
                      <Link
                        to={"/admin/product/" + item.id}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                      >
                        ແກ້ໄຂ
                      </Link>
                      <p
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        ລົບ
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
