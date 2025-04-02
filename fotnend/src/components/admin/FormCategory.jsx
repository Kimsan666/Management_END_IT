import React, { useState, useEffect} from "react";
import { SaveCategory, listCategory, removeCategory } from "../../aip/Category";
import useJimStore from "../../store/jim-store";
import { toast } from "react-toastify";
const FormCategory = () => {
  const token = useJimStore((state) => state.token);
  const [name, setName] = useState("");

  // const [categories, setCategories] = useState([]);
  const categories = useJimStore((state) => state.categories);
  const getCategory = useJimStore((state) => state.getCategory);
  useEffect(() => {
    getCategory(token);
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await SaveCategory(token, { name });
      console.log(res.data.nameCt);
      toast.success(`ບັນທຶກ ${res.data.nameCt} ສຳເລັດ`);
      getCategory(token)
    } catch (err) {
      toast.error(`ມີຊື່ປະເພດສິນຄ້ານິ້ແລ້ວ`);
    }
  };

  const handleRemove = async (idCt) => {
    try {
      console.log(idCt);
      const res = await removeCategory(token, idCt);
      console.log(res);
      getCategory(token);
      toast.success(`ລົບ ${res.data.nameCt} ສຳເລັດ`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-md bg-white">
      <h1>Category</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border-2 p-2 rounded-md"
          placeholder="Name Category"
          type="text"
        ></input>
        <button className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-md ml-4">
          ບັນທຶກ
        </button>

        

      </form>
      <hr />
      <h1 className="text-2xl">ລາຍການປະເພດ</h1>
      {categories.map((item, index) => (
        <span
          key={index}
          className="flex justify-between my-2 items-center p-2 border-2 rounded-md"
        >
          {item.nameCt}

          <button
            onClick={() => handleRemove(item.idCt)}
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

export default FormCategory;
