import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { RemoveImage, UploadImages } from "../../aip/Product";
import useJimStore from "../../store/jim-store";
import { SquareX } from "lucide-react";
import { LoaderCircle } from 'lucide-react';
const UploadFile = ({ form, setForm }) => {
  const token = useJimStore((state) => state.token);

  const [isloading, setIsLoading] = useState(false);
  const handleOnCange = (e) => {

    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          return toast.error(`ໄຟລ໌ທີ່ເຈົ້າເລືອກ ${file.name} ບໍ່ແມ່ນຮູບພາບ`);
          continue;
        }

        //Image resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPG",
          100,
          0,
          (data) => {
            //funtion
            UploadImages(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success(`ອັບໂຫຼດສຳເລັດ`);

              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    // console.log(public_id);
    setIsLoading(true);
    const images = form.images;
    RemoveImage(token, public_id)
      .then((res) => {
        const filterImages = images.filter((item)=>{
          return item.public_id !== public_id
        })
        
        setForm({
          ...form,
          images: filterImages
        })
        setIsLoading(false);
        toast.error(`ລົບຮູບພາບສຳເລັດ`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-4 border-2 ">
      <div className="flex mx-4 gap-4 my-4">
        {
          isloading && <LoaderCircle className="animate-spin w-16 h-16"/>
        }
        
        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img
              className="w-24 h-24 hover:scale-105 transition-all duration-300 rounded-md"
              src={item.url}
            />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 bg-white rounded transition-all duration-300 hover:bg-red-500 hover:scale-125"
            >
              <SquareX />
            </span>
          </div>
        ))}
      </div>
      <div className="mx-4">
        <input
          className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          name="images"
          type="file"
          multiple //Select many images
          onChange={handleOnCange}
        />
      </div>
    </div>
  );
};

export default UploadFile;
