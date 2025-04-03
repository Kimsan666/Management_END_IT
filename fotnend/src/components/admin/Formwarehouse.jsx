import React, { useEffect, useState } from "react";
import useJimStore from "../../store/jim-store";
import { toast } from "react-toastify";
import { SaveWarehouse } from "../../aip/Warehouse";

const inirialState = {
  name: "ລາວຈຳກັsdadດ",
  email: "la7.666@gmail.com",
  contact: "",
  location: "ຈິມມີ້",
};

const Formwarehouse = () => {
  const token = useJimStore((state) => state.token);
  const warehouses = useJimStore((state) => state.warehouses);
  const getWarehouse = useJimStore((state) => state.getWarehouse);

  const [form, setForm] = useState(inirialState);

  useEffect(() => {
    getWarehouse(token);
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
    if (form.contact.length !== 8) {
          return toast.error("ກະລຸນາປ້ອນເບີໂທໃຫ້ຄົບ 8 ເລກກ່ອນເຈົ້າ");
        }
    try {
      const res = await SaveWarehouse(token, form);
      console.log(res);
      setForm(inirialState);
      toast.success(`ບັນທຶກ ${res.data.name} ສຳເລັດ`);
      getWarehouse(token);
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
        <button className="bg-red-500  hover:bg-red-700 text-white p-2  rounded-md ml-4">
          ບັນທຶກສິນຄ້າ
        </button>

        <hr />
        <br />
        <table className="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ລຳດັບ</th>
              <th scope="col">ຊື່ສາງ</th>
              <th scope="col">ອີເມວ</th>
              <th scope="col">ເບີຕິດຕໍ່ສາງ</th>
              <th scope="col">ທີ່ຢູ່ສາງ</th>
              <th scope="col">ວັນທີອັບເດດ</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((item, index) => {
              console.log(item);
              return (
                <tr key={item.id || index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.location}</td>
                  <td>{item.updatedAt}</td>
                  <td>
                    <p>
                      Delete
                    </p>
                    <p>
                      Update
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Formwarehouse;
