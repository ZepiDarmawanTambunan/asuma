import React, { useEffect, useState } from 'react';
import Dashboard from '../components/ui/Dashboard';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { firebase } from '../config/firebaseConfig';
import SelectCustom from '../components/ui/SelectCustom';

const Users = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedBagian, setSelectedBagian] = useState('');
  const [bagianList, setBagianList] = useState([]);

  const db = getFirestore(firebase);
  const bagianRef = collection(db, 'bagian');

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebase);

    try {
      // Mendaftarkan pengguna baru dengan email dan kata sandi
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Menyimpan semua data pengguna ke Firestore dalam koleksi "users"
      const firestore = getFirestore();
      const usersCollection = collection(firestore, 'users');
      await setDoc(doc(usersCollection, userCredential.user.uid), {
        username: username,
        email: email,
        bagianId: selectedBagian,
      });

      // Reset input fields dan pilihan "Bagian" setelah pendaftaran berhasil
      setUsername('');
      setEmail('');
      setPassword('');
      setSelectedBagian('');

      // Menampilkan pesan sukses atau mengarahkan pengguna ke halaman lain
      alert('Pendaftaran berhasil!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Pendaftaran gagal. Mohon coba lagi.');
    }
  };

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
      setSelectedBagian(bagianData[0].value);
    });
  }, []);

  return (
    <Dashboard>
      <main className="p-4 md:p-8 rounded mt-16 mb-8 md:mt-20 md:mb-12">
        <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Daftar Users</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nama Pengguna</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <SelectCustom id="bagian_id" label="Bagian" onChange={(e) => setSelectedBagian(e.target.value)} options={bagianList} value={selectedBagian} />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-3"
          >
            Daftar
          </button>
        </form>
      </main>
    </Dashboard>
  );
};

export default Users;