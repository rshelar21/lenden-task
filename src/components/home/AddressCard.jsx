import React from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const AddressCard = ({handleDeleteAddress, data, handleUpdate}) => {
  return (
    <>
      <div className="border rounded-md border-gray-200 w-fit p-5">
        <div className="flex justify-between pb-4">
          <h3>User Information</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 border border-gray-300 rounded-md" onClick={() => handleUpdate(data)}>
              <MdModeEdit className="" />
            </button>
            <button className="p-1 border border-gray-300 rounded-md" onClick={() => handleDeleteAddress(data?.id)}>
              <MdDelete className="text-red-500" />
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-black font-semibold">
            Address:- <span className="font-normal">{data.address}</span>
          </h3>
          <h3 className="text-black font-semibold">
            State:- <span className="font-normal">{data.state}</span>
          </h3>
          <h3 className="text-black font-semibold">
            City:- <span className="font-normal">{data.city}</span>
          </h3>
          <h3 className="text-black font-semibold">
            Zipcode:- <span className="font-normal">{data.zipcode}</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
