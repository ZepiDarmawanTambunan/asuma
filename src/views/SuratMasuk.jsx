import React, { useState, useEffect } from 'react';
import Dashboard from '../components/ui/Dashboard';
import ModalSuratMasuk from '../components/ui/ModalSuratMasuk';
import { firebase } from '../config/firebaseConfig';
import { getFirestore, collection, onSnapshot, deleteDoc, doc, query, where, limit, orderBy } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { Link } from 'react-router-dom';
import Pagination from '../components/ui/Pagination';
import SearchBar from '../components/ui/SearchBar';

function SuratMasuk() {
  // FIREBASE INIT
  const db = getFirestore(firebase);
  const suratRef = collection(db, 'surat');

  // MODAL INIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suratList, setSuratList] = useState([]);
  const [editedSurat, setEditedSurat] = useState(null);
  
  // PAGINATION INIT
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = suratList.slice(indexOfFirstItem, indexOfLastItem);

  // SEARCH INIT
  const [isSearching, setIsSearching] = useState(false);

  // MODAL METHOD 
  const openModalTambah = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedSurat(null);
  };

  const openModalEdit = (surat) => {
    setIsModalOpen(true);
    setEditedSurat(surat);
  };

  // USE EFFECT
  useEffect(() => {
    const querySurat = query(suratRef, where('jenisSurat', '==', 'surat-masuk'));
    onSnapshot(querySurat, (querySnapshot) => {
      const suratCount = querySnapshot.size;
      setTotalPages(Math.ceil(suratCount/itemsPerPage));
    });
  });

  useEffect(() => {
    const querySurat = query(suratRef, 
      where('jenisSurat', '==', 'surat-masuk'),
      orderBy('tglSurat', 'desc'), 
      limit(itemsPerPage * currentPage));

    onSnapshot(querySurat, (querySnapshot) => {
      const suratData = [];
      querySnapshot.forEach((doc) => {
        suratData.push({ id: doc.id, ...doc.data() });
      });
      setSuratList(suratData);
    });
  }, [currentPage]);

  const handleDeleteSurat = async (id, fileURL) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus surat ini beserta filenya?')) {
      try {
        const db = getFirestore(firebase);
        const suratRef = doc(db, 'surat', id);
        await deleteDoc(suratRef);
        const decodedFileURL = decodeURIComponent(fileURL);
        const fileName = decodedFileURL.substring(decodedFileURL.lastIndexOf("/") + 1, decodedFileURL.indexOf("?"));
        const storage = getStorage(firebase);
        const fileRef = ref(storage, `surat/${fileName}`);
        await deleteObject(fileRef);
        alert('berhasil');
      } catch (error) {
        alert(`error :${error}`);
      }
    }
  };

  // PAGINATION METHOD
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // SEARCH METHOD
  const handleSearch = (searchTerm) => {
    let querySurat = collection(db, 'surat');
  
    if (searchTerm) {
      querySurat = query(
        querySurat,
        where('jenisSurat', '==', 'surat-masuk'),
        where('noSurat', '==', searchTerm));
        setIsSearching(true);
      } else {
        querySurat = query(
          querySurat,
          where('jenisSurat', '==', 'surat-masuk'),
          orderBy('tglSurat', 'desc')
          );
        setIsSearching(false);
      }
  
    onSnapshot(querySurat, (querySnapshot) => {
      const suratData = [];
      querySnapshot.forEach((doc) => {
        suratData.push({ id: doc.id, ...doc.data() });
      });
      setSuratList(suratData);
    });
  };
  
  return (
    <Dashboard>
      <main className="p-4 md:p-8 rounded mt-16 mb-8 md:mt-20 md:mb-12">
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Daftar Surat Masuk</h2>

        <button onClick={openModalTambah} className="bg-[#435334] hover:bg-[#263A29] text-white px-4 py-2 mb-5 rounded shadow-md transition duration-300">
          Tambah Surat
        </button>

        <SearchBar onSearch={handleSearch} placeholder="Cari no surat masuk" />

        <div className="overflow-x-auto mt-4">
  <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
    <thead>
      <tr className="bg-gray-100">
        <th className="py-2 px-4 border-b border-gray-300 text-center">No Surat</th>
        <th className="py-2 px-4 border-b border-gray-300 text-center">No Agenda</th>
        <th className="py-2 px-4 border-b border-gray-300 text-center">Tgl Surat</th>
        <th className="py-2 px-4 border-b border-gray-300 text-center">Tgl Terima</th>
        <th className="py-2 px-4 border-b border-gray-300 text-center">Asal</th>
        <th className="py-2 px-4 border-b border-gray-300 text-center">Perihal</th>
        <th className="py-2 px-4 border-b border-gray-300 text-center">Aksi</th>
      </tr>
    </thead>
    <tbody>
      {
        currentItems.length > 0
        ? currentItems.map((surat) => (
          <tr
            key={surat.id}
            className="bg-white hover:bg-gray-100 transition duration-300"
          >
            <td className="py-2 px-4 border-b border-gray-300 text-center">{surat.noSurat}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">{surat.noAgenda}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">{surat.tglSurat}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">{surat.tglTerima}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">{surat.asal}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">{surat.perihal}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center flex items-center justify-evenly">
              <Link className="bg-blue-500 p-1 rounded-md text-white hover:bg-blue-600 transition duration-300 transform hover:scale-110 inline-block" to={`/surat-masuk/${surat.id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='currentColor'><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
              </Link>
              <button className="bg-yellow-500 p-1 rounded-md text-white hover:bg-yellow-600 transition duration-300 transform hover:scale-110" onClick={() => openModalEdit(surat)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='currentColor'><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
              </button>
              <button
                className="text-white p-1 rounded-md bg-red-500 hover:bg-red-700 transition duration-300 transform hover:scale-110"
                onClick={() => handleDeleteSurat(surat.id, surat.fileURL)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='currentColor'><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              </button>
            </td>
          </tr>
        ))
        : 
        <tr className='bg-white hover:bg-gray-100 transition duration-300'>
            <td className="py-2 px-4 border-b border-gray-300 text-center" colSpan={7}>
              Surat kosong
            </td>
        </tr>
      }
    </tbody>
  </table>
        </div>
        <ModalSuratMasuk isOpen={isModalOpen} onClose={closeModal} surat={editedSurat}/>
        {!isSearching && totalPages > 1 ? (
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        ) : null}
      </main>
    </Dashboard>
  );
}

export default SuratMasuk;