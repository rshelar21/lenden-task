import React, { useState, useEffect } from "react";
import InputWrapper from "./InputWrapper";
import { IoMdClose } from "react-icons/io";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import db from "../../lib/firebase";
import { SuccessToast, ErrorToast } from "../../utils/index";

const initialState = {
  address: "",
  city: "",
  state: "",
  zipcode: "",
};
const AddressModalLayout = ({ openModal, setOpenModal, updateAddres }) => {
  const [formState, setFormState] = useState(initialState);
  console.log(updateAddres);

  useEffect(() => {
    if (updateAddres && updateAddres.type === "update") {
      setFormState((prev) => {
        return {
          ...prev,
          address: updateAddres.address,
          city: updateAddres.city,
          state: updateAddres.state,
          zipcode: updateAddres.zipcode,
        };
      });
    }
  }, [updateAddres]);

  const handleOnChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidation = () => {
    if (  
      !formState.address.trim() ||
      !formState.city.trim() ||
      !formState.state.trim() ||
      !formState.zipcode.trim()
      ) {
      ErrorToast("All fields are required");
      return false;
    }
    return true;
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formState);
    if (!handleValidation()) return;
    try {
      if(updateAddres && updateAddres.type === "update"){
        const res = await updateDoc(doc(db, "posts", updateAddres.id), {
          address: formState.address,
          city: formState.city,
          state: formState.state,
          zipcode: formState.zipcode,
          updatedAt: serverTimestamp(),
        });
        console.log(res);
        handleCloseModal();
        SuccessToast("Address updated successfully");
        return;
      }
      const collectionRef = collection(db, "posts");
      const docRef = await addDoc(collectionRef, {
        ...formState,
        createdAt: serverTimestamp(),
      });
      handleCloseModal();
      SuccessToast("Address added successfully");
    } catch (error) {
      console.log(error);
      ErrorToast("Something went wrong");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full inset-0 fixed z-30 bg-[rgba(0,0,0,0.7)] ">
        <div className="relative p-6 rounded-lg shadow-md bg-white opacity-100 w-full max-w-[400px] popup">
          <h3 className="text-center text-lg font-semibold text-black">
            Add Address
          </h3>
          <div
            onClick={handleCloseModal}
            className="absolute p-2 border border-gray-300 z-50 top-2 rounded-full cursor-pointer right-2"
          >
            <IoMdClose />
          </div>
          <div className="flex flex-col gap-y-2">
            <form action="" onSubmit={handleSubmitForm}>
              <InputWrapper
                type="text"
                name="address"
                label="Address"
                value={formState.address}
                handleOnChange={handleOnChange}
              />
              <InputWrapper
                type="text"
                name="city"
                label="City"
                value={formState.city}
                handleOnChange={handleOnChange}
              />
              <InputWrapper
                type="text"
                name="state"
                label="State"
                value={formState.state}
                handleOnChange={handleOnChange}
              />
              <InputWrapper
                type="number"
                name="zipcode"
                label="Zipcode"
                value={formState.zipcode}
                handleOnChange={handleOnChange}
              />

              <button
                type="submit"
                className="bg-blue-500 w-full mt-2 text-white rounded-md py-2 hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModalLayout;
