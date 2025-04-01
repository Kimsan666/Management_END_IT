import React, { useEffect, useState } from "react";
import useJimStore from "../store/jim-store";
import { currentAdmin } from "../aip/auth";
import LoadingToredirect from "./LoadingToredirect";
const ProtectRouadmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useJimStore((state) => state.user);
  const token = useJimStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    }
  }, []);

  return ok ? element : <LoadingToredirect />;
};

export default ProtectRouadmin;
