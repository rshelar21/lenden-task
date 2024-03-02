import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/global/Navbar";
import { IoMdAdd } from "react-icons/io";
import AddressModalLayout from "../components/global/AddressModalLayout";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../lib/firebase";
import AddressCard from "../components/home/AddressCard";

const Home = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [postData, setPostsData] = useState([]);
  const [updateAddres, setUpdateAddress] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const queryRef = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const getData = async () => {
    const docRef = await onSnapshot(queryRef, (querySnapshot) => {
      setPostsData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  };

  console.log(postData);

  const handleDeleteAddress = async (id) => {
    console.log(id);
    try {
      const res = await deleteDoc(doc(db, "posts", id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (data) => {
    console.log(data);
    setUpdateAddress({...data, type : "update"});
    setOpenModal(true)
  }

  return (
    <>
      {openModal && (
        <AddressModalLayout setOpenModal={setOpenModal} openModal={openModal} updateAddres={updateAddres} />
      )}
      <div className="w-full h-screen flex flex-col">
        <Navbar />

        <div className="pt-5 px-4">
          {postData &&
            postData.map((item, index) => (
              <AddressCard
                key={item?.id}
                handleDeleteAddress={handleDeleteAddress}
                data={item}
                handleUpdate={handleUpdate}
              />
            ))}
        </div>
        {postData.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <button
              onClick={() => setOpenModal(!openModal)}
              className="border border-gray-400 px-4 py-2 rounded-lg flex items-center justify-center gap-x-2"
            >
              <IoMdAdd />
              Add Address
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
