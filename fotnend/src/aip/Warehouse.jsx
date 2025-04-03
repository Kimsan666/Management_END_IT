import axios from "axios";

export const SaveWarehouse = async (token, form) => {
  return await axios.post("http://localhost:5003/api/warehouse", form, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};
export const listWarehouse = async () => {
  return await axios.get("http://localhost:5003/api/warehouses", {
    
  });
};

export const removeWarehouse = async (token, id) => {
  return await axios.delete("http://localhost:5003/api/warehouse/" + id, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const UploadImagesWH = async (token, form) => {
  return await axios.post(
    "http://localhost:5003/api/imageswh",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
};

export const RemoveImageWH = async (token, public_id) => {
  return await axios.post(
    "http://localhost:5003/api/removeimagewh",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
};


export const updateWarehouse = async (token, id, form) => {
    return await axios.put("http://localhost:5003/api/warehouse/" + id, form, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  };
  export const readWarehouse = async (token, id) => {
    return await axios.get("http://localhost:5003/api/warehouse/" + id, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  };