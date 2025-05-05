<!DOCTYPE html>
<html>
<head>
  <title>Stock Opname Form</title>
</head>
<body>
  <h1>Form Stock Opname</h1>
  <form id="myForm">
    <label>Nama User: <input type="text" name="namaUser" required></label><br>
    <label>Lokasi: <input type="text" name="lokasi" required></label><br>
    <label>Kode Cabang: <input type="text" name="kodeCabang" required></label><br>
    <label>Kode Barang: <input type="text" name="kodeBarang" required></label><br>
    <label>Nama Barang: <input type="text" name="namaBarang" required></label><br>
    <label>EXP Date: <input type="date" name="expDate" required></label><br>
    <label>Nomor Lot: <input type="text" name="nomorLot" required></label><br>
    <label>Jumlah: <input type="number" name="jumlah" required></label><br>
    <label>Keterangan: <input type="text" name="keterangan"></label><br>
    <button type="submit">Submit</button>
  </form>

  <pre id="response"></pre>

  <script>
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzZ7ra9CDH4fyIoiXmIsFRAXv5E_8LhYcgUCeIZT5--HbvkfFb0IHB9ABv4bX4M5ZL8Hg/exec'; // GANTI DENGAN URL DEPLOY ANDA

    document.getElementById('myForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);

      fetch(scriptURL, {
        method: 'POST',
        body: formData  // ⬅️ TANPA set header Content-Type
      })
      .then(response => response.json())
      .then(json => {
        document.getElementById('response').textContent = JSON.stringify(json, null, 2);
      })
      .catch(error => {
        document.getElementById('response').textContent = 'Error: ' + error;
      });
    });
  </script>
</body>
</html>
