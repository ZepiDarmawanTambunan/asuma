import React, { useEffect, useState } from 'react';
import { firebase } from '../config/firebaseConfig';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Dashboard from '../components/ui/Dashboard';
import { months, years } from '../constants/dateOptions';

function LaporanSuratKeluar() {
  const [laporanData, setLaporanData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const db = getFirestore(firebase);
  const suratRef = collection(db, 'surat');
  const querySuratKeluar = query(suratRef, where('jenisSurat', '==', 'surat-keluar'));

  useEffect(() => {
    if(selectedMonth == "" && selectedYear == ""){
      fetchData();
    }
  }, [selectedMonth, selectedYear]);

  const fetchData = async () => {
    const laporanSnapshot = await getDocs(querySuratKeluar);
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
        <h2 className="text-2xl font-semibold mb-4">Laporan Surat Keluar</h2>

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

        <table className="w-full border table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 w-1/8">No. Surat</th>
              <th className="border px-4 py-2">No. Agenda</th>
              <th className="border px-4 py-2">Tgl Surat</th>
              <th className="border px-4 py-2">Tgl Keluar</th>
              <th className="border px-4 py-2 w-1/6">Asal</th>
              <th className="border px-4 py-2 w-1/6">Tujuan</th>
              <th className="border px-4 py-2 w-1/4">Perihal</th>
            </tr>
          </thead>
          <tbody>
          {laporanData.length === 0 ? (
              <tr>
                <td colSpan="7" className="border px-4 py-2 text-center">
                  Tidak ada data yang cocok dengan filter yang diterapkan.
                </td>
              </tr>
            ) : (
            laporanData.map((laporan, index) => (
              <tr key={index} className="odd:bg-gray-50 even:bg-white">
                <td className="print:px-1 print:py-1 border px-4 py-2 break-words">
                  {laporan.noSurat}
                </td>
                <td className="print:px-1 print:py-1 border px-4 py-2 break-words">
                  {laporan.noAgenda}
                </td>
                <td className="print:px-1 print:py-1 border px-4 py-2 break-words">
                  {laporan.tglSurat}
                </td>
                <td className="print:px-1 print:py-1 border px-4 py-2 break-words">
                  {laporan.tglKeluar}
                </td>
                <td className="print:px-1 print:py-1 border px-4 py-2 break-words">
                  {laporan.asal}
                </td>
                <td className="print:px-1 print:py-1 border px-4 py-2 break-words">
                  {laporan.tujuan}
                </td>
                <td className="print:px-1 print:py-1 border px-4 py-2 break-words">
                  {laporan.perihal}
                </td>
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

export default LaporanSuratKeluar;