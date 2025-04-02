import React, { useEffect, useState } from "react";
import useJimStore from "../../store/jim-store";
import { SaveProduct } from "../../aip/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";

const inirialState = {
  qrCode: "",
  name: "",
  description: "",
  supplierId: "1",
  images: [],
};

const FormProduct = () => {
  const token = useJimStore((state) => state.token);
  const suppliers = useJimStore((state) => state.suppliers);
  const getSupplier = useJimStore((state) => state.getSupplier);
  const getProduct = useJimStore((state) => state.getProduct);
  const products = useJimStore((state) => state.products);
  // console.log(products);

  const [form, setForm] = useState(inirialState);

  useEffect(() => {
    getSupplier(token);
    getProduct(token, 100);
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
      toast.success(`ບັນທຶກ ${res.data.name} ສຳເລັດ`);
    } catch (err) {
      console.log(err);
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
          value={form.qrCode}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ຊື່ສິນຄ້າ"
          type="text"
          name="name"
          value={form.name}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ລາຍລະອຽດສິນຄ້າ"
          type="text"
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
            <UploadFile form={form} setForm={setForm}/>
          }


        <button className="bg-red-500  hover:bg-red-700 text-white p-2  rounded-md ml-4">
          ບັນທຶກສິນຄ້າ
        </button>

        <hr />
        <br />
        <table className="table">
          <thead className="bg-gray-800">
            <tr className="text-white font-sans-PhetsarantOT">
              <th scope="col">ລຳດັບ</th>
              <th scope="col">QR Code</th>
              <th scope="col">ຊື່ສິນຄ້າ</th>
              <th scope="col">ລາຍລະອຽດສິນຄ້າ</th>
              <th scope="col">ຊື່ຜູ້ສະໜອງ</th>
              <th scope="col">ວັນທີອັບເດດ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              // console.log(item);
              return (
                <tr key={item.id || index}>
                  <th scope="row">{index + 1}</th>
                  <td >{item.qrCode}</td>
                  <td >{item.name}</td>
                  <td >{item.description}</td>
                  <td>
                    {suppliers.find(
                      (supplier) => supplier.id === item.supplierId
                    )?.name || "ບໍ່ມີຂໍ້ມູນ"}
                  </td>
                  <td>{item.updatedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
