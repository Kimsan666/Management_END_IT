export const listWarehouseStock = async () => {
    return await axios.get("http://localhost:5003/api/warehousestocks", {
      
    });
  };