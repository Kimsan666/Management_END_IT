import axios from "axios";

export const currentUser = async (token) =>
  await axios.post(
    "http://localhost:5003/api/current-User",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currentAdmin = async (token) => {
  return await axios.post(
    "http://localhost:5003/api/current-Admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
