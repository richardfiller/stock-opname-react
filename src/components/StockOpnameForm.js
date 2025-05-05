import React, { useState, useCallback, useEffect } from 'react';
import './StockOpnameForm.css';
import barangData from './data/dataBarang.json'; // Import data barang dari file JSON

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyvvPo1pUSFS_eUxjz3RNf7YK7kdEILuskBCi99yFS84iaKxgp3Es4Ri8OTAS13WiESug/exec';

function StockOpnameForm({ onBackToMenu }) {
  // State form
  const [namaUser, setNamaUser] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kodeCabang, setKodeCabang] = useState(''); // State untuk kode cabang
  const [kodeBarang, setKodeBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [expDate, setExpDate] = useState('');
  const [nomorLot, setNomorLot] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [keterangan, setKeterangan] = useState('');

  // State untuk error validasi
  const [errors, setErrors] = useState({});

  // State untuk suggestion
  const [kodeSuggestions, setKodeSuggestions] = useState([]);
  const [namaSuggestions, setNamaSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);

  // Daftar pilihan Kode Cabang - Nama Cabang
  const daftarCabang = [
    "C049-Pontianak",
    "C039-Tangerang",
    "C041-Bogor",
    "C013-Bandung",
    "C006-Jakarta",
    "C035-Bekasi",
    // Tambahkan daftar lengkap cabang Anda di sini
  ];

  // Ambil daftar kode dan nama barang dari data JSON
  const mockKodeBarang = barangData
    .map(item => item ? item.Code : undefined)
    .filter(kode => typeof kode === 'string');

  const mockNamaBarang = barangData
    .map(item => item ? item.Product : undefined)
    .filter(nama => typeof nama === 'string');

  const findBarangByKode = useCallback((kode) => {
    return barangData.find(barang => typeof barang?.Code === 'string' && barang.Code.toLowerCase() === kode?.toLowerCase());
  }, []);

  const findBarangByNama = useCallback((nama) => {
    return barangData.find(barang => typeof barang?.Product === 'string' && barang.Product.toLowerCase() === nama?.toLowerCase());
  }, []);

  const resetForm = useCallback(() => {
    setNamaUser('');
    setLokasi('');
    setKodeCabang(''); // Reset kodeCabang
    setKodeBarang('');
    setNamaBarang('');
    setExpDate('');
    setNomorLot('');
    setJumlah('');
    setKeterangan('');
    setErrors({});
  }, [setNamaUser, setLokasi, setKodeCabang, setKodeBarang, setNamaBarang, setExpDate, setNomorLot, setJumlah, setKeterangan, setErrors]);

 const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    switch (name) {
      // ... bagian lain dari switch case ...
      case 'kodeBarang':
        setKodeBarang(value);
        if (value.trim().length > 2) {
          const filteredKode = mockKodeBarang.filter(kode =>
            kode && typeof kode === 'string' && kode.toLowerCase().includes(value.toLowerCase().replace(/[{}\.()\-]/g, ''))
          ).slice(0, 5);
          setKodeSuggestions(filteredKode);
        } else {
          setKodeSuggestions([]);
        }
        break;
      case 'namaBarang':
        setNamaBarang(value);
        if (value.trim().length > 2) {
          const filteredNama = mockNamaBarang.filter(nama =>
            nama && typeof nama === 'string' && nama.toLowerCase().includes(value.toLowerCase().replace(/[{}\.()\-]/g, ''))
          ).slice(0, 5);
          setNamaSuggestions(filteredNama);
        } else {
          setNamaSuggestions([]);
        }
        break;
		switch (name) {
      case 'namaUser':
        setNamaUser(value);
        break;
      case 'lokasi':
        setLokasi(value);
        break;
      case 'kodeCabang': // Handle perubahan pada dropdown kode cabang
        setKodeCabang(value);
        break;
      case 'kodeBarang':
        setKodeBarang(value);
        if (value.trim().length > 2) {
          const filteredKode = mockKodeBarang.filter(kode =>
            kode && typeof kode === 'string' && kode.toLowerCase().includes(value.toLowerCase().replace(/[{}\.()\-]/g, ''))
          ).slice(0, 5);
          setKodeSuggestions(filteredKode);
        } else {
          setKodeSuggestions([]);
        }
        break;
      case 'namaBarang':
        setNamaBarang(value);
        if (value.trim().length > 2) {
          const filteredNama = mockNamaBarang.filter(nama =>
            nama && typeof nama === 'string' && nama.toLowerCase().includes(value.toLowerCase().replace(/[{}\.()\-]/g, ''))
          ).slice(0, 5);
          setNamaSuggestions(filteredNama);
        } else {
          setNamaSuggestions([]);
        }
        break;
      case 'expDate':
        const numbersOnly = value.replace(/[^0-9]/g, '');
        let formattedValue = '';
        if (numbersOnly.length > 0) {
          if (numbersOnly.length <= 2) {
            formattedValue = numbersOnly;
          } else if (numbersOnly.length <= 4) {
            formattedValue = `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
          } else if (numbersOnly.length <= 8) {
            formattedValue = `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}/${numbersOnly.slice(4)}`;
          } else {
            formattedValue = `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}/${numbersOnly.slice(4, 8)}`;
          }
        }
        if (formattedValue.length <= 10) {
          setExpDate(formattedValue);
        }
        break;
      case 'nomorLot':
        setNomorLot(value);
        break;
      case 'jumlah':
        setJumlah(value);
        break;
      case 'keterangan':
        setKeterangan(value);
        break;
      default:
        break; // Tambahkan default case di sini
    }
      // ... bagian lain dari switch case ...
    }
  }, [setNamaUser, setLokasi, setKodeCabang, setKodeBarang, setNamaBarang, setExpDate, setNomorLot, setJumlah, setKeterangan, setErrors, mockKodeBarang, mockNamaBarang]);

  const handleKodeSuggestionClick = useCallback((suggestion) => {
    setKodeBarang(suggestion);
    setKodeSuggestions([]);
    const barang = findBarangByKode(suggestion);
    if (barang) {
      setNamaBarang(barang.Product || '');
    }
  }, [setKodeBarang, findBarangByKode, setNamaBarang]);

  const handleNamaSuggestionClick = useCallback((suggestion) => {
    setNamaBarang(suggestion);
    setNamaSuggestions([]);
    const barang = findBarangByNama(suggestion);
    if (barang) {
      setKodeBarang(barang.Code || '');
    }
  }, [setNamaBarang, findBarangByNama, setKodeBarang]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    if (!namaUser.trim()) {
      newErrors.namaUser = 'Nama User wajib diisi';
      isValid = false;
    }
    if (!lokasi.trim()) {
      newErrors.lokasi = 'Lokasi wajib diisi';
      isValid = false;
    }
    if (!kodeCabang) { // Validasi kode cabang
      newErrors.kodeCabang = 'Kode Cabang wajib dipilih';
      isValid = false;
    }
    if (!kodeBarang.trim()) {
      newErrors.kodeBarang = 'Kode Barang wajib diisi';
      isValid = false;
    }
    if (!namaBarang.trim()) {
      newErrors.namaBarang = 'Nama Barang wajib diisi';
      isValid = false;
    }

    if (expDate.trim()) {
      const dateParts = expDate.split('/');
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);

        if (isNaN(day) || isNaN(parseInt(dateParts[1], 10)) || isNaN(parseInt(dateParts[2], 10))) {
          newErrors.expDate = 'Format Tanggal tidak valid (DD/MM/YYYY)';
          isValid = false;
        } else if (parseInt(dateParts[1], 10) < 1 || parseInt(dateParts[1], 10) > 12) {
          newErrors.expDate = 'Bulan harus antara 1 dan 12';
          isValid = false;
        } else {
          const daysInMonth = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10), 0).getDate();
          if (day < 1 || day > daysInMonth) {
            newErrors.expDate = `Tanggal harus antara 1 dan ${daysInMonth} untuk bulan ${parseInt(dateParts[1], 10)}`;
            isValid = false;
          }
        }
      } else if (expDate.trim()) {
        newErrors.expDate = 'Format Tanggal tidak valid (DD/MM/YYYY)';
        isValid = false;
      }
    }

    if (!jumlah.trim()) {
      newErrors.jumlah = 'Jumlah wajib diisi';
      isValid = false;
    } else if (isNaN(jumlah) || parseInt(jumlah, 10) <= 0) {
      newErrors.jumlah = 'Jumlah harus berupa angka positif';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);
      try {
        // Format expDate menjadiYYYY-MM-DD
        let formattedExpDate = expDate;
        if (expDate.includes('/')) {
          const [day, month, year] = expDate.split('/');
          formattedExpDate = `${year}-${month}-${day}`;
        }

        const response = await fetch(WEB_APP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            namaUser,
            lokasi,
            kodeCabang,
            kodeBarang,
            namaBarang,
            expDate: formattedExpDate,
            nomorLot,
            jumlah: parseInt(jumlah, 10),
            keterangan,
          }),
        });

        console.log('Response Status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Data saved successfully:', data);
          console.log('resetForm() dipanggil dari handleSubmit');
          resetForm();
        } else {
          console.error('Failed to save data:', response.status);
          const errorData = await response.json();
          console.error('Error details:', errorData);
        }
      } catch (error) {
        console.error('There was an error sending data:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [namaUser, lokasi, kodeCabang, kodeBarang, namaBarang, expDate, nomorLot, jumlah, keterangan, errors, setErrors, resetForm, setLoading]); // findBarangByKode, findBarangByNama dihapus dari dependencies

  const [backButtonStyle, setBackButtonStyle] = useState({});

  useEffect(() => {
    setBackButtonStyle({
      backgroundColor: '#6c757d',
      color: 'white',
      padding: '8px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9em',
      marginRight: '10px',
      '&:hover': { backgroundColor: '#5a6268' },
    });
  }, []);

  return (
    <div className="container">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <button type="button" onClick={onBackToMenu} style={backButtonStyle}>
          Kembali
        </button>
        <h2>
          Form Stock Opname {loading && ' (Loading...)'}
        </h2>
        <div></div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Pindahkan Kode Cabang ke atas Nama User */}
        <div className="form-group">
          <label htmlFor="kodeCabang">Kode Cabang:</label>
          <select
            id="kodeCabang"
            name="kodeCabang"
            value={kodeCabang}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">-- Pilih Cabang --</option>
            {daftarCabang.map(cabang => (
              <option key={cabang.split('-')[0]} value={cabang.split('-')[0]}>{cabang}</option>
            ))}
          </select>
          {errors.kodeCabang && <p className="error-message">{errors.kodeCabang}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="namaUser">Nama User:</label>
          <input
            type="text"
            id="namaUser"
            name="namaUser"
            value={namaUser}
            onChange={handleInputChange}
            required
          />
          {errors.namaUser && <p className="error-message">{errors.namaUser}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lokasi">Lokasi:</label>
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            value={lokasi}
            onChange={handleInputChange}
            required
          />
          {errors.lokasi && <p className="error-message">{errors.lokasi}</p>}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="kodeBarang">Kode Barang:</label>
          <input
            type="text"
            id="kodeBarang"
            name="kodeBarang"
            value={kodeBarang}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {kodeSuggestions.length > 0 && (
            <ul className="suggestions">
              {kodeSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleKodeSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {errors.kodeBarang && <p className="error-message">{errors.kodeBarang}</p>}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="namaBarang">Nama Barang:</label>
          <input
            type="text"
            id="namaBarang"
            name="namaBarang"
            value={namaBarang}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {namaSuggestions.length > 0 && (
            <ul className="suggestions">
              {namaSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleNamaSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {errors.namaBarang && <p className="error-message">{errors.namaBarang}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="expDate">EXP. Date:</label>
          <input
            type="text"
            id="expDate"
            name="expDate"
            value={expDate}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
            maxLength={10}
          />
          {errors.expDate && <p className="error-message">{errors.expDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="nomorLot">Nomor Lot:</label>
          <input
            type="text"
            id="nomorLot"
            name="nomorLot"
            value={nomorLot}
            onChange={handleInputChange}
          />
          {errors.nomorLot && <p className="error-message">{errors.nomorLot}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="jumlah">Jumlah:</label>
          <input
            type="number"
            id="jumlah"
            name="jumlah"
            value={jumlah}
            onChange={handleInputChange}
            required
            pattern="[0-9]+"
          />
          {errors.jumlah && <p className="error-message">{errors.jumlah}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="keterangan">Keterangan:</label>
          <textarea
            id="keterangan"
            name="keterangan"
            value={keterangan}
            onChange={handleInputChange}
          />
          {errors.keterangan && <p className="error-message">{errors.keterangan}</p>}
        </div>

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default StockOpnameForm;