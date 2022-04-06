let inGroupA = [], inGroupB = [], matrixA = [[], [], []], matrixB = [[], [], []]

// setting input
const inNum = document.querySelectorAll(".matrix input")
inNum.forEach(el => {
  el.value = 0
  el.addEventListener('blur', function () {
    if (this.value == "") {
      this.value = 0
    }
  })
  el.addEventListener('keyup', function () {
    const regex = /[^0-9.-]/g
    el.value = el.value.replace(regex, "")
  })
});

function hitung(callback) { //ketika tombol hitung diklik

  // reset variabel
  inGroupA = [], inGroupB = [], matrixA = [[], [], []], matrixB = [[], [], []]

  // pengisian variabel
  inNum.forEach((el, i) => {
    if (i < 9) {
      inGroupA.push(parseFloat(el.value)) //mewakili grup input
      matrixA[(i < 3) ? 0 : (i < 6) ? 1 : 2].push(inGroupA[i]) // mewakili matrix
    }
    // apabila ditemukan matrix B
    if (i >= 9 && i < 18) {
      inGroupB.push(parseFloat(el.value))
      matrixB[(i < 12) ? 0 : (i < 15) ? 1 : 2].push(inGroupB[i - 9])
    }
  })

  // menjalankan operasi
  callback()
}

function openModal(id) { //membuka modal dialog
  $('#' + id).modal()
}

function detail(value, matrix, row, col) { //menampilkan detail sel pada dialog
  const modalDialog = document.getElementById('detail')
  if (modalDialog) {
    document.getElementById('value').innerHTML = value
    document.getElementById('matrix').innerHTML = matrix
    document.getElementById('row').innerHTML = row
    document.getElementById('col').innerHTML = col
    openModal('detail')
  }
}

function clearMatrix() { //mereset input matrix
  inNum.forEach(el => {
    el.value = "0"
  });
  const determinan = document.getElementById('determinan')
  if (determinan) {
    determinan.innerHTML = ""
  }
}

// OPERASI HITUNG

function penjumlahan() {
  for (let i = 18; i < inNum.length; i++) {
    inNum[i].value = inGroupA[i - 18] + inGroupB[i - 18]
  }
}

function pengurangan() {
  for (let i = 18; i < inNum.length; i++) {
    inNum[i].value = inGroupA[i - 18] - inGroupB[i - 18]
  }
}

function perkalian() {
  let hasil = []
  // operasi perkalian
  let item = 0;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      for (k = 0; k < 3; k++) {
        item += matrixA[i][k] * matrixB[k][j];
      }
      hasil.push(item)
      item = 0
    }
  }
  // tampilkan
  for (let i = 18; i < inNum.length; i++) {
    inNum[i].value = hasil[i - 18]
  }
}

function kofaktor() {
  let hasil = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let minor = [];
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          if (k != i && l != j) {
            minor.push(matrixA[k][l])
          }
        }
      }
      let detMinor = minor[0] * minor[3] - minor[1] * minor[2]
      let baris = (i % 2 == 0) ? -1 : 1
      let kolom = (j % 2 == 0) ? -1 : 1
      hasil.push(detMinor * baris * kolom)
    }
  }
  return hasil
}

function determinan() {
  const kofA = kofaktor();
  return matrixA[0][0] * kofA[0] + matrixA[0][1] * kofA[1] + matrixA[0][2] * kofA[2]
}

function tampilkanDeterminan() {
  document.getElementById('determinan').innerHTML = determinan();
}

function adJoin() {
  const kofA = kofaktor()
  const TkofA = [...kofA]
  // atas
  TkofA[1] = kofA[3]
  TkofA[2] = kofA[6]
  TkofA[5] = kofA[7]
  // bawah
  TkofA[3] = kofA[1]
  TkofA[6] = kofA[2]
  TkofA[7] = kofA[5]

  return TkofA
}

function inverse() {
  // 1/detA * adJoin(A)
  const adjA = adJoin() //array
  const detA = determinan() // number

  // perkalian tiap-tiap elemen dengan 1/detA
  for (let i = 0; i < adjA.length; i++) {
    adjA[i] *= 1 / detA
  }

  // tampilkan
  for (let i = 9; i < inNum.length; i++) {
    inNum[i].value = adjA[i - 9]
  }
}

// mematikan tombol yang tidak terpakai selama proses pengembangan
document.querySelectorAll("a[href='#']").forEach(el => {
  el.addEventListener('click', function (e) { e.preventDefault() })
});

