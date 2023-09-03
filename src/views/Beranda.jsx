import React from 'react';
import Dashboard from '../components/ui/Dashboard';
import banner from '../assets/images/banner.jpg'

function Beranda() {
  return (
    <Dashboard>
      <main className="p-4 md:p-8 rounded mt-16 mb-8 md:mt-20 md:mb-12">
      <h2 className="text-xl text-[#263A29] md:text-2xl font-semibold mb-2 md:mb-4">Beranda</h2>
      <img
          src={banner}
          alt="Banner"
          className="w-full md:h-40 object-cover object-top transition-transform transform hover:scale-105"
        />
      <p className="mt-6 text-lg text-justify leading-relaxed text-gray-700">
        Selamat datang di aplikasi <span className="font-semibold text-[#435334]">SUMA (Surat Mattaher)</span>, tempat di mana kemudahan dan efisiensi bertemu dalam dunia pengarsipan dan persuratan. Kami menyediakan beragam fitur canggih yang akan membantu Anda mengelola surat-menyurat dengan lebih efektif dan efisien. Nikmati kenyamanan dalam mengarsipkan dan mencari surat, baik itu surat masuk maupun keluar, sehingga Anda dapat fokus pada hal-hal yang lebih penting.

        Dari sistem pengarsipan yang terstruktur hingga notifikasi otomatis, kami hadir untuk memudahkan proses bisnis dan administrasi Anda. Tidak hanya itu, kami juga terus berinovasi untuk memberikan tambahan fitur-fitur menarik yang akan memberikan nilai lebih pada pengalaman Anda.
      </p>
      </main>
    </Dashboard>
  );
}

export default Beranda;