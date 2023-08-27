import React, { useEffect, useRef, useState } from 'react';
import { firebase } from '../../config/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import InputCustom from './Input';
import SelectCustom from './SelectCustom';
import { sifatSurat } from '../../constants/sifatSurat';

const ModalSuratKeluar = ({ isOpen, onClose, surat }) => {
  
  const now = new Date();
  const [noSurat, setNoSurat] = useState('');
  const [noAgenda, setNoAgenda] = useState('');
  const [asal, setAsal] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [tglSurat, setTglSurat] = useState(now.toISOString().substr(0, 10));
  const [tglKeluar, setTglKeluar] = useState(now.toISOString().substr(0, 10));
  const [perihal, setPerihal] = useState('');
  const [disposisi, setDisposisi] = useState('');
  const [tembusan, setTembusan] = useState('');
  const [sifat, setSifat] = useState('');
  const [jenisSurat, setJenisSurat] = useState('surat-keluar');
  const [lampiran, setLampiran] = useState(0);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const [sifatOption, setSifatOption] = useState('');
  const handleSifatChange = (event) => {
    setSifatOption(event.target.value);
  };

  console.log(sifatOption);

  useEffect(() => {
    if (surat) {
      setNoSurat(surat.noSurat);
      setNoAgenda(surat.noAgenda);
      setAsal(surat.asal);
      setTujuan(surat.tujuan);
      setTglSurat(surat.tglSurat);
      setTglKeluar(surat.tglKeluar);
      setPerihal(surat.perihal);
      setDisposisi(surat.disposisi);
      setSifat(surat.sifat);
      setSifatOption(surat.sifat);
      setTembusan(surat.tembusan);
      setLampiran(surat.lampiran);
    } else {
      reset();
    }
  }, [surat]);

  const handleFileChange = ()=> {
    const selectedFile = inputRef.current.files[0];
    setFile(selectedFile);
  };

  const generateRandomFileName = () => {
    const randomString = Math.random().toString(36).substring(7);
    return `file_${randomString}`;
  };

  const handleSubmit = async () => {
    try {
      const storage = getStorage(firebase);
      const db = getFirestore(firebase);
      const suratRef = collection(db, 'surat');

      if(surat){
        const suratDocRef = doc(db, 'surat', surat.id);
        if(file){
          // CREATE FILE NEW
          const randomFileName = generateRandomFileName();
          const fileExtension = file.name.split(".")[1];
          const storageRef = ref(storage, `surat/${randomFileName}.${fileExtension}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          if(surat.fileURL){
            // DELETE FILE OLD
            const decodedFileURL = decodeURIComponent(surat.fileURL);
            const fileName = decodedFileURL.substring(decodedFileURL.lastIndexOf("/") + 1, decodedFileURL.indexOf("?"));
            const fileRef = ref(storage, `surat/${fileName}`);
            await deleteObject(fileRef);
          }

          // INSERT DATA TO FIRESTORE
          await updateDoc(suratDocRef, {
            noSurat,
            noAgenda,
            asal,
            tujuan,
            tglSurat,
            tglKeluar,
            perihal,
            disposisi,
            tembusan,
            lampiran,
            sifat,
            fileURL: downloadURL
          });

        }else{
          await updateDoc(suratDocRef, {
            noSurat,
            noAgenda,
            asal,
            tujuan,
            tglSurat,
            tglKeluar,
            perihal,
            disposisi,
            tembusan,
            lampiran,
            sifat,
          });
        }
      }else{
        if(file){
          const randomFileName = generateRandomFileName();
          const fileExtension = file.name.split(".")[1];
          const storageRef = ref(storage, `surat/${randomFileName}.${fileExtension}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          await addDoc(suratRef, {
            noSurat,
            noAgenda,
            asal,
            tujuan,
            tglSurat,
            tglKeluar,
            perihal,
            disposisi,
            sifat,
            tembusan,
            lampiran,
            jenisSurat,
            fileURL: downloadURL
          });   
        }else{
          await addDoc(suratRef, {
            noSurat,
            noAgenda,
            asal,
            tujuan,
            tglSurat,
            tglKeluar,
            perihal,
            disposisi,
            sifat,
            tembusan,     
            lampiran,     
            jenisSurat,
          });   
        }
      }
      reset();
      alert('berhasil');
      onClose();
    } catch (error) {
      alert(`Error adding document: ${error}`);
    }
  };

  const reset = () => {
    setNoSurat('');
    setNoAgenda('');
    setAsal('');
    setTujuan('');
    setPerihal('');
    setDisposisi('');
    setSifat('');
    setTembusan('');
    setLampiran(0);
    setTglSurat(now.toISOString().substr(0, 10));
    setTglKeluar(now.toISOString().substr(0, 10));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setFile(null);
  }


    return (
        <div className={`fixed inset-0 ${isOpen ? 'flex' : 'hidden'} justify-center items-center z-50`}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md h-3/4 overflow-y-auto shadow-xl z-10 relative">
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
            <h2 className="text-xl font-semibold mb-4">{surat ? 'Edit Surat' : 'Tambah Surat'}</h2>
            <InputCustom type='text' id="no_surat" placeholder="No Surat" value={noSurat} handleChange={setNoSurat} />
            <InputCustom type='text' id="no_agenda" placeholder="No Agenda" value={noAgenda} handleChange={setNoAgenda} />
            <InputCustom type='text' id="asal" placeholder="Asal" value={asal} handleChange={setAsal} />
            <InputCustom type='text' id="tujuan" placeholder="Tujuan" value={tujuan} handleChange={setTujuan} />
            <InputCustom type='date' id="tgl_surat" placeholder="Tanggal Surat" value={tglSurat} handleChange={setTglSurat} label="Tanggal Surat" />
            <InputCustom type='date' id="tgl_keluar" placeholder="Tanggal Keluar" value={tglKeluar} handleChange={setTglKeluar} label="Tanggal Keluar" />
            <InputCustom type='textarea' id="perihal" placeholder="Perihal" value={perihal} handleChange={setPerihal} />
            <InputCustom type='textarea' id="disposisi" placeholder="Disposisi" value={disposisi} handleChange={setDisposisi} />
            <InputCustom type='number' id="lampiran" placeholder="Jumlah Lampiran" value={lampiran} handleChange={setLampiran} label="Jumlah Lampiran" />
            <InputCustom type='file' id="file" placeholder="File" inputRef={inputRef} handleChange={handleFileChange} />
            <SelectCustom id="sifatSurat" label="Sifat Surat" options={sifatSurat} value={sifatOption} onChange={handleSifatChange} />
            {/* <input type='file' onChange={(e) => handleFileChange(e)} className="mb-2 p-2 border rounded w-full" /> */}
            <button
              className="bg-[#435334] hover:bg-[#263A29] text-white px-4 py-2 rounded w-full mt-2"
              onClick={handleSubmit}
            >
              {surat ? 'Edit' : 'Tambah'}
            </button>
          </div>
        </div>
      );
    };
    
    export default ModalSuratKeluar;