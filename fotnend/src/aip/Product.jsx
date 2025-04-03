import axios from "axios";

export const SaveProduct = async (token, form) => {
  return await axios.post("http://localhost:5003/api/product", form, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};
export const listProduct = async (count = 20) => {
  return await axios.get("http://localhost:5003/api/products/" + count, {});
};
export const readProduct = async (token, id) => {
  return await axios.get("http://localhost:5003/api/product/" + id, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return await axios.put("http://localhost:5003/api/product/" + id, form, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

//aip images
export const UploadImages = async (token, form) => {
  return await axios.post(
    "http://localhost:5003/api/images",
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
export const removeProduct = async (token, id) => {
  return await axios.delete("http://localhost:5003/api/product/" + id, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const RemoveImage = async (token, public_id) => {
  return await axios.post(
    "http://localhost:5003/api/removeimage",
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

export const SeachProducts = async (arg) => {
  return await axios.post("http://localhost:5003/api/search/filters", arg);
};
