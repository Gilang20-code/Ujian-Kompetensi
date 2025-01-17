class Reservasi {
  constructor(nama, no_telp, tanggal, menu, waktu) {
    this.nama = nama;
    this.no_telp = no_telp;
    this.tanggal = tanggal;
    this.menu = menu;
    this.waktu = waktu;
  }

  static getData() {
    //Ambil data dari localStorage
    let data = JSON.parse(localStorage.getItem("Reservasi")) || [];
    return data;
  }

  saveData() {
    let existingData = JSON.parse(localStorage.getItem("Reservasi")) || [];
    existingData.push({
      nama: this.nama,
      no_telp: this.no_telp,
      tanggal: this.tanggal,
      menu: this.menu,
      waktu: this.waktu,
    });
    localStorage.setItem("Reservasi", JSON.stringify(existingData));
    alert("Data Berhasil Disimpan!");
  }

  static editData(index, newData) {
    let existingData = JSON.parse(localStorage.getItem("Reservasi")) || [];
    if (index >= 0 && index < existingData.length) {
      existingData.splice(index, 1);
      localStorage.setItem("Reservasi", JSON.stringify(existingData));
      existingData.push(newData);
      localStorage.setItem("Reservasi", JSON.stringify(existingData));
    }
  }

  static deleteData(index) {
    let existingData = JSON.parse(localStorage.getItem("Reservasi")) || [];
    if (index >= 0 && index < existingData.length) {
      existingData.splice(index, 1);
      localStorage.setItem("Reservasi", JSON.stringify(existingData));
      alert("Data berhasil dihapus!");
    }
  }
}

let displayData = () => {
  let data = Reservasi.getData();
  let tableBody = document.querySelector("#reservation-table tbody");
  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    let row = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nama}</td>
          <td>${item.no_telp}</td>
          <td>${item.tanggal}</td>
          <td>${item.menu}</td>
          <td>${item.waktu}</td>
          <td>
            <button onclick="handleEdit(${index})">EDIT</button>
            <button onclick="handleDelete(${index})">HAPUS</button>
          </td>
        </tr>
      `;
    tableBody.innerHTML += row;
  });
};

let handleEdit = (index) => {
  let data = Reservasi.getData();
  let item = data[index];
  $("#nama").val(item.nama);
  $("#no_telp").val(item.no_telp);
  $("#tanggal").val(item.tanggal);
  $("#menu").val(item.menu);
  $("#waktu").val(item.waktu);
  $("#edit-index").val(index);
  $("#input-data").attr("data-editing", true);
};

let handleDelete = (index) => {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    Reservasi.deleteData(index);
    displayData();
  }
};

$(document).ready(function () {
  displayData();
});

$(document).on("submit", "#input-data", function (e) {
  e.preventDefault();
  let nama = $("#nama").val();
  let no_telp = $("#no_telp").val();
  let tanggal = $("#tanggal").val();
  let menu = $("#menu").val();
  let waktu = $("#waktu").val();
  if (nama && no_telp && tanggal && menu && waktu) {
    let index = $("#edit-index").val();
    if ($("#input-data").attr("data-editing")) {
      let updatedData = new Reservasi(nama, no_telp, tanggal, menu, waktu);
      Reservasi.editData(index, updatedData);
      $("#input-data").removeAttr("data-editing");
    } else {
      let newData = new Reservasi(nama, no_telp, tanggal, menu, waktu);
      newData.saveData();
    }
    displayData();
    $("#input-data")[0].reset();
  } else {
    alert("Silahkan isi semua form");
  }
});
