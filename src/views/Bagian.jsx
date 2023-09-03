import React, { useState, useEffect } from 'react';
import Dashboard from '../components/ui/Dashboard';
import { firebase } from '../config/firebaseConfig';
import { getFirestore, collection, onSnapshot, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import BagianList from '../components/ui/BagianList';
import ModalBagian from '../components/ui/ModalBagian';

function Bagian() {
  // FIREBASE INIT
  const db = getFirestore(firebase);
  const bagianRef = collection(db, 'bagian');

  // MODAL INIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bagianList, setBagianList] = useState([]);
  const [editedbagian, setEditedbagian] = useState(null);
  const [bagianParent, setBagianParent] = useState(null);

  // MODAL METHOD 
  const openModalTambah = (bagianParent) => {
    setIsModalOpen(true);
    if(bagianParent){
      setBagianParent(bagianParent);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedbagian(null);
  };

  const openModalEdit = (bagian) => {
    setIsModalOpen(true);
    setEditedbagian(bagian);
  };

  useEffect(() => {
    const querybagian = query(bagianRef);

    onSnapshot(querybagian, (querySnapshot) => {
      const bagianData = [];
      querySnapshot.forEach((doc) => {
        bagianData.push({ id: doc.id, ...doc.data() });
      });
      setBagianList(bagianData);
    });
  }, []);

  const handleDelete = async (bagianId, isTopLevel = true) => {
    if (isTopLevel && !window.confirm('Apakah Anda yakin ingin menghapus bagian ini ?')) {
      return; // Tidak melanjutkan jika konfirmasi tidak di-setuju
    }
  
    try {
      const db = getFirestore(firebase);
      const bagianRef = collection(db, 'bagian');
      const querySnapshot = await getDocs(query(bagianRef, where('parentId', '==', bagianId)));
      const deletePromises = [];
      
      querySnapshot.forEach((doc) => {
        deletePromises.push(
          deleteDoc(doc.ref),
          handleDelete(doc.id, false)
        );
      });
  
      deletePromises.push(deleteDoc(doc(db, 'bagian', bagianId)));
      
      await Promise.all(deletePromises);
  
      if (isTopLevel) {
        alert('berhasil');
      }
    } catch (error) {
      alert(`error :${error}`);
    }
  };

  return (
    <Dashboard>
      <main className="p-4 md:p-8 rounded mt-16 mb-8 md:mt-20 md:mb-12">
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Daftar Bagian</h2>

        <button onClick={openModalTambah} className="bg-[#435334] hover:bg-[#263A29] text-white px-4 py-2 mb-5 rounded shadow-md transition duration-300">
          Tambah bagian
        </button>

        <BagianList bagians={bagianList} onTambah={openModalTambah} onEdit={openModalEdit} onDelete={handleDelete} />

        <ModalBagian isOpen={isModalOpen} onClose={closeModal} bagian={editedbagian} bagianParent={bagianParent}/>  

      </main>
    </Dashboard>
  );
}

export default Bagian;