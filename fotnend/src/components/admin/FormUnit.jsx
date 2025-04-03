import React, { useState, useEffect } from "react";
import { SaveUnit, removeUnit } from "../../aip/Unit";
import useJimStore from "../../store/jim-store";
import { toast } from "react-toastify";
const FormUnit = () => {
  const token = useJimStore((state) => state.token);
  const [name, setName] = useState("");

  // const [categories, setCategories] = useState([]);
  const units = useJimStore((state) => state.units);
  const getUnit = useJimStore((state) => state.getUnit);
  useEffect(() => {
    getUnit(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("ກະລຸນາປ້ອນຊື່ຫົວໜ່ວຍສິນຄ້າ");
    }
    try {
      const res = await SaveUnit(token, { name });
      console.log(res.data.nameUt);
      toast.success(`ບັນທຶກ ${res.data.nameUt} ສຳເລັດ`);
      getUnit();
      setName("");
    } catch (err) {
      toast.error(`ມີຊື່ຫົວໜ່ວຍສິນຄ້ານິ້ແລ້ວ`);
    }
  };

  const handleRemove = async (idUt) => {
    try {
      console.log(idUt);
      const res = await removeUnit(token, idUt);
      console.log(res);
      getUnit();
      toast.success(`ລົບ ${res.data.nameUt} ສຳເລັດ`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-md bg-white">
      <h1>Unit</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 p-2 rounded-md"
          placeholder="Name Unit"
          type="text"
        ></input>
        <button className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-md ml-4">
          ບັນທຶກ
        </button>
      </form>

      <hr />
      <br />
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white border">
            <tr className="text-white my-4 mx-4">
              <th scope="col">ລຳດັບ</th>
              <th scope="col">ຊື່ປະເພດສິນຄ້າ</th>
              <th scope="col">ວັນທີອັບເດດ</th>
              <th scope="col">ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            {units.map((item, index) => {
              // console.log(item);
              return (
                <tr key={item.id || index} className="border-t">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{item.nameUt}</td>
                  <td className="p-2 text-center">{item.updatedDT}</td>
                  <td className="p-2 text-center flex gap-2">
                    {/* <Link
                      to={"/admin/warehouse/" + item.id}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                    >
                      ແກ້ໄຂ
                    </Link> */}
                    <p
                      onClick={() => handleRemove(item.idUt)}
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
    </div>
  );
};

export default FormUnit;
