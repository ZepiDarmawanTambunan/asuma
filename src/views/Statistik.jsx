import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import Dashboard from '../components/ui/Dashboard'
import { firebase } from '../config/firebaseConfig';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistik = () => {
  const [dataSuratMasuk, setDataSuratMasuk] = useState([]);
  const [dataSuratKeluar, setDataSuratKeluar] = useState([]);
  const db = getFirestore(firebase);
  const suratRef = collection(db, 'surat');
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const fetchData = async () => {
    try {
      const querySuratMasuk = query(suratRef, where('jenisSurat', '==', 'surat-masuk'));
      const querySnapshotSuratMasuk = await getDocs(querySuratMasuk);
      const suratMasukData = querySnapshotSuratMasuk.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDataSuratMasuk(suratMasukData);

      const querySuratKeluar = query(suratRef, where('jenisSurat', '==', 'surat-keluar'));
      const querySnapshotSuratKeluar = await getDocs(querySuratKeluar);
      const suratKeluarData = querySnapshotSuratKeluar.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDataSuratKeluar(suratKeluarData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const suratMasukData = labels.map(month => {
    const count = dataSuratMasuk.filter(item => new Date(item.tglTerima).getMonth() === labels.indexOf(month)).length;
    return count;
  });

  
  const suratKeluarData = labels.map(month => {
    const count = dataSuratKeluar.filter(item => new Date(item.tglKeluar).getMonth() === labels.indexOf(month)).length;
    return count;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistik pengarsipan data surat masuk & keluar',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Surat Masuk',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1, 
        data: suratMasukData,
      },
      {
        label: 'Surat Keluar',
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1, 
        data: suratKeluarData,
      },
    ],
  };

  return (
    <Dashboard>
    <main className="p-4 md:p-8 rounded mt-16 mb-8 md:mt-20 md:mb-12">
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Statistik</h2>
        <div className='h-96'>
         <Bar data={data} options={options}/>
        </div>
    </main>
    </Dashboard>
  )
}

export default Statistik