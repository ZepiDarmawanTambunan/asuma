export const months = [
    { value: '', label: 'Pilih Bulan' },
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];
  
  export const years = (() => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [{ value: '', label: 'Pilih Tahun' }];
  
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      yearOptions.push({ value: i.toString(), label: i.toString() });
    }
  
    return yearOptions;
  })();