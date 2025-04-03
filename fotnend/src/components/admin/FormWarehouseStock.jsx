import React,{useEffect, useState} from "react";
import useJimStore from "../../store/jim-store";

const FormWarehouseStock = () => {
  const getWarehouseStocks = useJimStore((state) => state.getWarehouseStocks);
  const WarehouseStocks = useJimStore((state) => state.WarehouseStocks);
  const getProduct = useJimStore((state) => state.getProduct);
  const getCategory = useJimStore((state) => state.getCategory);
  const getUnit = useJimStore((state) => state.getUnit);
  const getWarehouse = useJimStore((state) => state.getUnit);
  const categories = useJimStore((state) => state.categories);
  const units = useJimStore((state) => state.units);
  const products = useJimStore((state) => state.products);
  const warehouses = useJimStore((state) => state.warehouses);

  useEffect(() => {
    getWarehouse();
    getUnit();
    getCategory();
    getProduct ();
    getWarehouseStocks();
  }, []);
  return (
    <div>
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
            {WarehouseStocks.map((item, index) => {
              // console.log(item);
              return (
                <tr key={item.id || index} className="border-t">
                  <td className="p-2 text-center">{index + 1}</td>
                  {/* <td className="p-2 text-center">
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
                  </td> */}
                  <td className="p-2">
                    {warehouses.find((s) => s.id === item.warehouseId)?.name ||
                      "ບໍ່ມີຂໍ້ມູນ"}
                  </td>
                  <td className="p-2">
                    {products.find((s) => s.id === item.productId)?.name ||
                      "ບໍ່ມີຂໍ້ມູນ"}
                  </td>
                  <td className="p-2">
                    {units.find((s) => s.id === item.unitIdUt)?.name ||
                      "ບໍ່ມີຂໍ້ມູນ"}
                  </td>
                  <td className="p-2 text-center">{item.totalQuantity}</td>
                  <td className="p-2">
                    {categories.find((s) => s.id === item.categoryIdCt)?.name ||
                      "ບໍ່ມີຂໍ້ມູນ"}
                  </td>
                  <td className="p-2 truncate max-w-xs"> {item.reservedQuantity}</td>
                  <td className="p-2">{item.minimumStock}</td>
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
    </div>
  );
};

export default FormWarehouseStock;
