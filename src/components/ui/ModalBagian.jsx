import React, { useEffect, useRef, useState } from 'react';
import { firebase } from '../../config/firebaseConfig';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import InputCustom from './Input';
import { statusBagian } from '../../constants/statusBagian';
import SelectCustom from './SelectCustom';

const ModalBagian = ({ isOpen, onClose, bagian, bagianParent }) => {
  
  const [nama, setNama] = useState('');
  const [status, setStatus] = useState('1');
  const [parentId, setParentId] = useState('0');

  useEffect(() => {
    if (bagian) {
      setNama(bagian.nama);
      setStatus(bagian.status);
      setParentId(bagian.parentId);
    } else {
      reset();
    }
  }, [bagian]);

  const handleSubmit = async () => {
    try {
      const db = getFirestore(firebase);
      const bagianRef = collection(db, 'bagian');

      if(bagian){
          // UPDATE   
          const bagianDocRef = doc(db, 'bagian', bagian.id);
          await updateDoc(bagianDocRef, {
            nama,
            status,
            parentId,
          });
      }
      else{
        // ADD PARENT OR CHILDREN
        const parentBagianId = bagianParent.id || '0'; // Default to '0' if id is undefined
        await addDoc(bagianRef, {
          nama,
          status,
          parentId: parentBagianId,
        });
      }
      reset();
      alert('berhasil');
      onClose();
    } catch (error) {
      alert(`Error : ${error}`);
    }
  };

  const reset = () => {
    setNama('');
    setStatus('1');
    setParentId('0');
  }

    return (
        <div className={`fixed inset-0 ${isOpen ? 'flex' : 'hidden'} justify-center items-center z-50`}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md h-fit overflow-y-auto shadow-xl z-10 relative">
            <button
              className="absolute p-1 rounded-full border-2 border-red-600 top-0 right-0 mt-2 mr-2 text-red-600 hover:text-red-700"
              onClick={onClose}
              >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                  />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">{bagian ? 'Edit Bagian' : 'Tambah Bagian'}</h2>
            <InputCustom type='text' id="nama" placeholder="Nama" value={nama} handleChange={setNama} />
            <SelectCustom id="status" label="Status" value={status} options={statusBagian} onChange={(e) => setStatus(e.target.value)} />
            <button
              className="bg-[#435334] hover:bg-[#263A29] text-white px-4 py-2 rounded w-full mt-2"
              onClick={handleSubmit}
            >
              {bagian ? 'Edit' : 'Tambah'}
            </button>
          </div>
        </div>
      );
    };
    
    export default ModalBagian;