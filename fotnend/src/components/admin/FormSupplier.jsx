import React, { useEffect, useState } from "react";
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
  // const categories = useJimStore((state) => state.categories);
  // const getCategory = useJimStore((state) => state.getCategory);
  const getSupplier = useJimStore((state) => state.getSupplier);
  const suppliers = useJimStore((state) => state.suppliers);
  console.log(suppliers);

  const [form, setForm] = useState(inirialState);

  useEffect(() => {
    getSupplier(token);
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
    if (form.phone.length !== 8) {
      return toast.error("ກະລຸນາປ້ອນເບີໂທໃຫ້ຄົບ 8 ເລກກ່ອນເຈົ້າ");
    }
    console.log(form);
    try {
      const res = await SaveSupplier(token, form);
      console.log(res);
      setForm(inirialState);
      toast.success(`ບັນທຶກ ${res.data.name} ສຳເລັດ`);
      getSupplier(token);
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
      console.log(id);
      const res = await removeSupplier(token, id);
      console.log(res);
      toast.success(`ລົບ ${res.data.name} ສຳເລັດ`);
      getSupplier(token);
    } catch (err) {
      console.log(err);
    }
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
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ຊື່ຜູ້ຕິດຕໍ່"
          type="text"
          name="contactName"
          value={form.contactName}
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
          placeholder="ເບີ 9xxxxxxx"
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
          name="phone"
          value={form.phone}
          onChange={handleOnChange}
        ></input>
        <input
          className="border-2 p-2 rounded-md"
          placeholder="ທີ່ຕັ້ງບໍລິສັດ"
          type="text"
          name="address"
          value={form.address}
          onChange={handleOnChange}
        ></input>
        <hr />
        <button className="bg-red-500  hover:bg-red-700 text-white p-2  rounded-md ml-4">
          ບັນທຶກຜູ້ສະໜອງ
        </button>
      </form>

      <hr />
      <h1 className="text-2xl">ລາຍການປະເພດ</h1>
      {suppliers.map((item, index) => (
        <span
          key={index}
          className="flex justify-between my-2 items-center p-2 border-2 rounded-md"
        >
          {item.id}
          {item.name}
          {item.contactName}
          {item.email}
          {item.phone}
          {item.address}

          <button
            onClick={() => handleRemove(item.id)}
            className="bg-red-500  hover:bg-red-700 text-white p-2  rounded-md ml-4"
          >
            ລົບ
          </button>
        </span>
      ))}
      <ul></ul>
    </div>
  );
};

export default FormSupplier;
