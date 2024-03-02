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
import {useFormik} from "formik"
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup.number().positive().min(6 , "Incorrect Zipcode").required("Zipcode is required"),
})


// const initialState = {
//   address: "",
//   city: "",
//   state: "",
//   zipcode: "",
// };



const AddressModalLayout = ({ openModal, setOpenModal, updateAddres }) => {
  const [formState, setFormState] = useState({}); //initialState
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




  const handleSubmitForm = async (values) => {
    try {
      if(updateAddres && updateAddres.type === "update"){
        const res = await updateDoc(doc(db, "posts", updateAddres.id), {
          ...values,
          updatedAt: serverTimestamp(),
        });
        handleCloseModal();
        SuccessToast("Address updated successfully");
        return;
      }
      const collectionRef = collection(db, "posts");
      const docRef = await addDoc(collectionRef, {
        ...values,
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

  const formikInstance = useFormik({
    initialValues : {
      address: updateAddres.address || "",
      city: updateAddres.city || "",
      state: updateAddres.state || "",
      zipcode: updateAddres.zipcode || "",
    },
    enableReinitialize: true,
    validationSchema : validationSchema,
    onSubmit : async(values, { resetForm }) => {
      console.log(values);
      await handleSubmitForm(values);
    }
  })

  // const {
  //   handleSubmit,
  //   handleChange,
  // } = formikInstance;

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
            <form onSubmit={formikInstance.handleSubmit}>
              <InputWrapper
                type="text"
                name="address"
                label="Address"
                value={formikInstance.values.address}
                handleOnChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                error={formikInstance.errors.address}
                touched={formikInstance.touched.address}
              />
              <InputWrapper
                type="text"
                name="city"
                label="City"
                value={formikInstance.values.city}
                handleOnChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                error={formikInstance.errors.city}
                touched={formikInstance.touched.city}
              />
              <InputWrapper
                type="text"
                name="state"
                label="State"
                value={formikInstance.values.state}
                handleOnChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                error={formikInstance.errors.state}
                touched={formikInstance.touched.state}
              />
              <InputWrapper
                type="number"
                name="zipcode"
                label="Zipcode"
                value={formikInstance.values.zipcode}
                handleOnChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                error={formikInstance.errors.zipcode}
                touched={formikInstance.touched.zipcode}
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
