import React, { useEffect, useState } from 'react';
import { firebase } from '../config/firebaseConfig';
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { months, years } from '../constants/dateOptions';
import Dashboard from '../components/ui/Dashboard';

function LaporanSuratMasuk() {
  const [laporanData, setLaporanData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const db = getFirestore(firebase);
  const suratRef = collection(db, 'surat');
  const querySuratMasuk = query(suratRef, where('jenisSurat', '==', 'surat-masuk'));

  useEffect(() => {
    if(selectedMonth == "" && selectedYear == ""){
      fetchData();
    }
  }, [selectedMonth, selectedYear]);

  const fetchData = async () => {
    const laporanSnapshot = await getDocs(querySuratMasuk);
    const laporanArray = laporanSnapshot.docs.map(doc => doc.data());
  
    let filteredLaporanArray = laporanArray;
    console.log(selectedYear);
  
    if (selectedMonth && selectedYear) {
      filteredLaporanArray = laporanArray.filter(laporan => {
        const tglSuratMonth = laporan.tglSurat.split('-')[1];
        const tglSuratYear = laporan.tglSurat.split('-')[0];
        return tglSuratMonth === selectedMonth && tglSuratYear === selectedYear;
      });
    } else if (selectedMonth) {
      filteredLaporanArray = laporanArray.filter(laporan => {
        const tglSuratMonth = laporan.tglSurat.split('-')[1];
        return tglSuratMonth === selectedMonth;
      });
    } else if (selectedYear) {
      filteredLaporanArray = laporanArray.filter(laporan => {
        const tglSuratYear = laporan.tglSurat.split('-')[0];
        return tglSuratYear === selectedYear;
      });
    }
  
    setLaporanData(filteredLaporanArray);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <Dashboard>
      <div className="p-4 md:p-8 rounded mt-16 mb-8 md:mt-20 md:mb-12">
        <h2 className="text-2xl font-semibold mb-4">Laporan Surat Masuk</h2>
        
        <div className="flex space-x-4 mb-4 print:hidden">
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            {years.map(year => (
              <option key={year.value} value={year.value}>{year.label}</option>
            ))}
          </select>
          <button
            onClick={fetchData}
            className="bg-[#435334] hover:bg-[#263A29] text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">No. Surat</th>
              <th className="border px-4 py-2">No. Agenda</th>
              <th className="border px-4 py-2">Tgl Surat</th>
              <th className="border px-4 py-2">Tgl Terima</th>
              <th className="border px-4 py-2">Asal</th>
              <th className="border px-4 py-2">Tujuan</th>
              <th className="border px-4 py-2">Perihal</th>
            </tr>
          </thead>
          <tbody>
            {laporanData.length === 0 ? (
              <tr>
                <td colSpan="6" className="border px-4 py-2 text-center">
                  Tidak ada data yang cocok dengan filter yang diterapkan.
                </td>
              </tr>
            ) : (
              laporanData.map((laporan, index) => (
                <tr key={index} className="odd:bg-gray-50 even:bg-white">
                  <td className="border px-4 py-2">{laporan.noSurat}</td>
                  <td className="border px-4 py-2">{laporan.noAgenda}</td>
                  <td className="border px-4 py-2">{laporan.tglSurat}</td>
                  <td className="border px-4 py-2">{laporan.tglTerima}</td>
                  <td className="border px-4 py-2">{laporan.asal}</td>
                  <td className="border px-4 py-2">{laporan.tujuan}</td>
                  <td className="border px-4 py-2">{laporan.perihal}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-6 text-center print:hidden">
          <button onClick={printReport} className="bg-[#435334] hover:bg-[#263A29] text-white py-2 px-4 rounded-lg">Cetak Laporan</button>
        </div>
      </div>
    </Dashboard>
  );
}

export default LaporanSuratMasuk;