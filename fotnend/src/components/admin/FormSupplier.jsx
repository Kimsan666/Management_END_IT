import React, { useState, useEffect } from "react";
import useJimStore from "../../store/jim-store";
import { toast } from "react-toastify";
import { removeSupplier, SaveSupplier } from "../../aip/Supplier";

const inirialState = {
  name: "ລາວຈຳກັດ1",
  contactName: "ຈິມມີ້1",
  email: "laoaa1.666@gmail.com",
  phone: "",
  address: "ແດນສະຫວັນ ເມືອງເຊໂປນ ແຂວງສະຫວັນນະເຂດ ທີຕັ້ງໜ້າໂຮງຮຽນປະຖົມ",
};

const FormSupplier = () => {
  const token = useJimStore((state) => state.token);
  const getSupplier = useJimStore((state) => state.getSupplier);
  const suppliers = useJimStore((state) => state.suppliers);
  const [form, setForm] = useState(inirialState);
  const [selectedSupplier, setSelectedSupplier] = useState(null); // สำหรับเก็บข้อมูลที่คลิก
  const [isModalOpen, setIsModalOpen] = useState(false); // สำหรับควบคุมการเปิด/ปิด modal

  useEffect(() => {
    getSupplier();
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 8) {
      return toast.error("ກະລຸນາປ້ອນເບີໂທໃຫ້ຄົບ 8 ເລກກ່ອນເຈົ້າ");
    }
    try {
      const res = await SaveSupplier(token, form);
      setForm(inirialState);
      toast.success(`ບັນທຶກ ${res.data.name} ສຳເລັດ`);
      getSupplier();
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
      const res = await removeSupplier(token, id);
      toast.success(`ລົບ ${res.data.name} ສຳເລັດ`);
      getSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier); // เก็บข้อมูลที่เลือก
    setIsModalOpen(true); // เปิด Modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // ปิด Modal
    setSelectedSupplier(null); // ล้างข้อมูลที่เก็บ
  };

  return (
    <div className="container mx-auto p-4 shadow-md bg-white">
      <form onSubmit={handleSubmit}>
        <h1>ລາຍການຜູ້ສະໜອງ</h1>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ຊື່ບໍລິສັດ"
          type="text"
          name="name"
          value={form.name}
          onChange={handleOnChange}
        />
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ຊື່ຜູ້ຕິດຕໍ່"
          type="text"
          name="contactName"
          value={form.contactName}
          onChange={handleOnChange}
        />
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ອີເມວ"
          type="email"
          name="email"
          value={form.email}
          onChange={handleOnChange}
        />
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ເບີ 9xxxxxxx"
          type="text"
          maxLength={8}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, ""); // ลบตัวอักษรที่ไม่ใช่ตัวเลขทันที
          }}
          inputMode="numeric"
          name="phone"
          value={form.phone}
          onChange={handleOnChange}
        />
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ທີ່ຕັ້ງບໍລິສັດ"
          type="text"
          name="address"
          value={form.address}
          onChange={handleOnChange}
        />
        <hr />
        <button className="bg-red-500  hover:bg-red-700 text-white p-2  rounded-md ml-4">
          ບັນທຶກຜູ່ສະໜອງ
        </button>
      </form>

      <hr />
      <br />
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white border">
            <tr>
              <th className="p-2">ລຳດັບ</th>
              <th className="p-2">ຊື່ບໍລິສັດ</th>
              <th className="p-2">ຊື່ຜູ້ຕິດຕໍ່</th>
              <th className="p-2">ອີເມວ</th>
              <th className="p-2">ເບີໂທຕິດຕໍ່</th>
              <th className="p-2">ທີ່ຕັ້ງບໍລິສັດ</th>
              <th className="p-2">ວັນທີອັບເດດ</th>
              <th className="p-2">ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((item, index) => {
              return (
                <tr
                  key={item.id || index}
                  className="border-t hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(item)} // เรียกใช้งาน handleRowClick
                >
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{item.name}</td>
                  <td className="p-2">{item.contactName}</td>
                  <td className="p-2 truncate max-w-xs">{item.email}</td>
                  <td className="p-2 truncate max-w-xs">{item.phone}</td>
                  <td className="p-2 truncate max-w-xs">{item.address}</td>
                  <td className="p-2 text-center">{item.updatedAt}</td>
                  <td className="p-2 text-center flex gap-2">
                    <p
                      onClick={(e) => {
                        e.stopPropagation(); // ป้องกันไม่ให้คลิกที่ปุ่มลบแล้วไปเรียก handleRowClick
                        handleRemove(item.id);
                      }}
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

      {/* Modal Popup */}
      {isModalOpen && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full"
          style={{ animation: "scaleUp 0.3s forwards" }}>
            <h2 className="text-xl mb-4">ລາຍລະອຽດຂອງຜູ້ສະໜອງ</h2>
            <p><strong>ຊື່ບໍລິສັດ:</strong> {selectedSupplier.name}</p>
            <p><strong>ຊື່ຜູ້ຕິດຕໍ່:</strong> {selectedSupplier.contactName}</p>
            <p><strong>ອີເມວ:</strong> {selectedSupplier.email}</p>
            <p><strong>ເບີໂທ:</strong> {selectedSupplier.phone}</p>
            <p><strong>ທີ່ຕັ້ງ:</strong> {selectedSupplier.address}</p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              onClick={handleCloseModal}
            >
              ປິດ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSupplier;
