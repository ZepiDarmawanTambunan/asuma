import React, { useState } from 'react';
import Dashboard from '../components/ui/Dashboard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { collection, doc, getDoc, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { firebase } from '../config/firebaseConfig';

const SuratMasukDetail= () => {
  const { id } = useParams();
  const db = getFirestore(firebase);
  // SURAT
  const suratRef = doc(db, 'surat', id);
  const [suratData, setSuratData] = useState(null);
  
  // BAGIAN
  const bagianRef = collection(db, 'bagian');
  const [bagianList, setBagianList] = useState([]);

  // GET SURAT (ID) DATA 
  const fetchSuratData = async () => {
    try {
      const docSnap = await getDoc(suratRef);
      if (docSnap.exists) {
        setSuratData(docSnap.data());
      } else {
        // Handle not found case
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  useEffect(() => {
    fetchSuratData();
  }, [id]);

    // GET BAGIAN LIST
    useEffect(() => {
      const querybagian = query(bagianRef);
      onSnapshot(querybagian, (querySnapshot) => {
        const bagianData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          bagianData.push({
            value: doc.id,
            label: data.nama,
          });
        });
        setBagianList(bagianData);
      });
    });
  
    // HANDLE CONVERT TUJUAN BAG ID TO TUJUAN NAMA
    const convertTujuanBagianIdToTujuanNama = (tujuanBagianId) => {
      if(bagianList.length > 0){
        const result = bagianList.filter((e) => e.value === tujuanBagianId)[0]?.label;
        return result;
      }
      return '';
    }
  
    // HANDLE CONVERT ASAL BAG ID TO ASAL NAMA
    const convertAsalBagianIdToAsalNama = (asalBagianId) => {
      if(bagianList.length > 0){
        const result = bagianList.filter((e) => e.value === asalBagianId)[0]?.label;
        return result;
      }
      return '';
    }

  return (
    <Dashboard>
      <main className="p-4 md:p-8 rounded mt-16 mb-8 md:mt-20 md:mb-12">
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Detail Surat Masuk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!suratData ? (
            <div>Loading...</div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 transition duration-300 transform hover:scale-105">
              <div className="mb-4">
                <strong>No. Surat:</strong> {suratData.noSurat}
              </div>
              <div className="mb-4">
                <strong>No. Agenda:</strong> {suratData.noAgenda}
              </div>
              <div className="mb-4">
                <strong>Tanggal Surat:</strong> {suratData.tglSurat}
              </div>
              <div className="mb-4">
                <strong>Tanggal Terima:</strong> {suratData.tglTerima}
              </div>
              <div className="mb-4">
                <strong>Asal:</strong> {convertAsalBagianIdToAsalNama(suratData.asal)}
              </div>
              <div className="mb-4">
                <strong>Tujuan:</strong> {convertTujuanBagianIdToTujuanNama(suratData.tujuan)}
              </div>
            </div>
          )}
          {!suratData ? (
            <div>Loading...</div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 transition duration-300 transform hover:scale-105">
              <div className="mb-4">
                <strong>Perihal:</strong> {suratData.perihal}
              </div>
              <div className="mb-4">
                <strong>Disposisi:</strong> {suratData.disposisi}
              </div>
              <div className="mb-4">
                <strong>Lampiran:</strong> {suratData.lampiran}
              </div>
              <div className="mb-4">
                <strong>File:</strong>
                <br />
                <iframe src={suratData.fileURL} title="File Viewer" className="w-full h-64 border" />
              </div>
            </div>
          )}
        </div>
      </main>
    </Dashboard>
  );
};

export default SuratMasukDetail;