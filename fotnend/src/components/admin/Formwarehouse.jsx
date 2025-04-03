import React, { useEffect, useState } from "react";
import useJimStore from "../../store/jim-store";
import { toast } from "react-toastify";
import { removeWarehouse, SaveWarehouse } from "../../aip/Warehouse";
import UploadImageWH from "./UploadImageWH";
import { Link } from "react-router-dom";

const inirialState = {
  name: "",
  email: "",
  contact: "",
  location: "",
  images: [],
};

const Formwarehouse = () => {
  const token = useJimStore((state) => state.token);
  const warehouses = useJimStore((state) => state.warehouses);
  const getWarehouse = useJimStore((state) => state.getWarehouse);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    images: [],
  });

  useEffect(() => {
    getWarehouse();
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
      getWarehouse();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("ມີບັນຫາໃນການບັນທຶກ, ກະລຸນາລອງໃໝ່!");
      }
    }
  };

   const handleRemove = async (id) => {
      try {
        if (window.confirm("ຕ້ອງການລົບຂໍ້ມູນນີ້ແທ້ບໍ?")) {
          try {
            const res = await removeWarehouse(token, id);
            console.log(res);
            toast.success(`ລົບ ${res.data.name} ສຳເລັດ`);
            getWarehouse();
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
          placeholder="ອີເມວ"
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
          placeholder="ທີ່ຕັ້ງສາງສິນຄ້າ"
          type="text"
          name="location"
          value={form.location}
          onChange={handleOnChange}
        ></input>
        {
          //Upload image
          <UploadImageWH form={form} setForm={setForm} />
        }
        <hr />

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
                <th scope="col">ຮູບພາບ</th>
                <th scope="col">ຊື່ສາງ</th>
                <th scope="col">ອີເມວ</th>
                <th scope="col">ເບີຕິດຕໍ່ສາງ</th>
                <th scope="col">ທີ່ຢູ່ສາງ</th>
                <th scope="col">ວັນທີອັບເດດ</th>
                <th scope="col">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((item, index) => {
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
                    <td className="p-2 text-center">{item.name}</td>
                    <td className="p-2">{item.email}</td>
                    <td className="p-2 truncate max-w-xs"> {item.contact}</td>
                    <td className="p-2">{item.location}</td>
                    <td className="p-2 text-center">{item.updatedAt}</td>
                    <td className="p-2 text-center flex gap-2">
                      <Link
                        to={"/admin/warehouse/" + item.id}
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

export default Formwarehouse;
