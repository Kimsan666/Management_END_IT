import React, { useState, useEffect} from "react";
import { SaveUnit,  removeUnit } from "../../aip/Unit";
import useJimStore from "../../store/jim-store";
import { toast } from "react-toastify";
const FormUnit = () => {
  const token = useJimStore((state) => state.token);
  const [name, setName] = useState("");

  // const [categories, setCategories] = useState([]);
  const units = useJimStore((state) => state.units);
  const getUnit= useJimStore((state) => state.getUnit);
  useEffect(() => {
    getUnit(token);
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await SaveUnit(token, { name });
      console.log(res.data.nameUt);
      toast.success(`ບັນທຶກ ${res.data.nameUt} ສຳເລັດ`);
      getUnit(token)
    } catch (err) {
      toast.error(`ມີຊື່ຫົວໜ່ວຍສິນຄ້ານິ້ແລ້ວ`);
    }
  };

  const handleRemove = async (idUt) => {
    try {
      console.log(idUt);
      const res = await removeUnit(token, idUt);
      console.log(res);
      getUnit(token);
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
      <h1 className="text-2xl">ລາຍການປະເພດ</h1>
      {units.map((item, index) => (
        <span
          key={index}
          className="flex justify-between my-2 items-center p-2 border-2 rounded-md"
        >
          {item.nameUt}

          <button
            onClick={() => handleRemove(item.idUt)}
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

export default FormUnit;
