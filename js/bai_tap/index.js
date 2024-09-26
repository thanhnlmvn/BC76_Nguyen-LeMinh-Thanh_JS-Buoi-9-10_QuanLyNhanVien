// Hàm xóa nhân viên
function xoaNhanVien(taiKhoan) {
  let index = DSNV.findIndex(function (nv) {
    return nv.taiKhoan == taiKhoan;
  });
  DSNV.splice(index, 1);
  let dataJson = JSON.stringify(DSNV);
  localStorage.setItem('DSNV_JSON', dataJson);
  renderDSNV(DSNV);
}

// hàm hiển thị thông tin nhân viên
function hienThiThongTinNV(data) {
  document.getElementById('tknv').value = data.taiKhoan;
  document.getElementById('name').value = data.hoVaTen;
  document.getElementById('email').value = data.email;
  document.getElementById('password').value = data.matKhau;
  document.getElementById('datepicker').value = data.ngayLam;
  document.getElementById('luongCB').value = data.luongCB;
  document.getElementById('chucvu').value = data.chucVu;
  document.getElementById('gioLam').value = data.gioLam;
}

// Hàm tính tổng lương cho nhân viên
function tinhTongLuong(chucVu, luongCB) {
  switch (chucVu) {
    case 'Sếp':
      return luongCB * 3;
    case 'Trưởng phòng':
      return luongCB * 2;
    case 'Nhân viên':
      return luongCB;
    default:
      return 0;
  }
}
// Hàm xếp loại nhân viên
function xepLoai(gioLam) {
  if (gioLam >= 192) return 'Xuất sắc';
  if (gioLam >= 176) return 'Giỏi';
  if (gioLam >= 160) return 'Khá';
  return 'Trung bình';
}

let DSNV = [];

let dataJson = localStorage.getItem('DSNV_JSON');
if (dataJson !== null) {
  let dataArray = JSON.parse(dataJson);
  DSNV = dataArray.map(function (item) {
    let nv = new NhanVien(
      item.taiKhoan,
      item.hoVaTen,
      item.email,
      item.matKhau,
      item.ngayLam,
      item.luongCB,
      item.chucVu,
      item.gioLam
    );
    return nv;
  });
  DSNV;
  renderDSNV(DSNV);
}

// hàm lấy thông tin
function layThongTin() {
  let taiKhoan = document.getElementById('tknv').value;
  let hoVaTen = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let matKhau = document.getElementById('password').value;
  let ngayLam = document.getElementById('datepicker').value;
  let luongCB = document.getElementById('luongCB').value;
  let chucVu = document.getElementById('chucvu').value;
  let gioLam = document.getElementById('gioLam').value;
  let nv = new NhanVien(
    taiKhoan,
    hoVaTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );
  return nv;
}

// Hàm hiển thị nhân viên
function renderDSNV(dsnv) {
  let contentHTML = '';
  for (let i = 0; i < dsnv.length; i++) {
    nv = dsnv[i];
    let trString = `<tr>
          <td>${nv.taiKhoan}</td>
          <td>${nv.hoVaTen}</td>
          <td>${nv.email}</td>
          <td>${nv.ngayLam}</td>
          <td>${nv.chucVu}</td>
          <td>${nv.tongLuong}</td>
          <td>${nv.loaiNV}</td>
          <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button><button class="btn btn-success" onclick="suaNV('${nv.taiKhoan}')">Cập nhật</button></td>
      </tr>`;
    contentHTML += trString;
  }
  document.getElementById('tableDanhSach').innerHTML = contentHTML;
}

document.getElementById('btnThemNV').onclick = function themNV() {
  let nhanVien = layThongTin();
  if (kiemTraHopLe()) {
    DSNV.push(nhanVien);
    let dataJson = JSON.stringify(DSNV);
    localStorage.setItem('DSNV_JSON', dataJson);
    renderDSNV(DSNV);
    alert('thêm thành công');
  } else {
    alert('vui lòng nhập lại');
  }
};

// hàm sửa NV
function suaNV(taiKhoan) {
  let index = DSNV.findIndex(function (item) {
    return item.taiKhoan == taiKhoan;
  });
  let nv = DSNV[index];
  hienThiThongTinNV(nv);
  document.getElementById('tknv').disabled = true;
}

function capNhatNV() {
  let nv = layThongTin();
  let index = DSNV.findIndex(function (item) {
    return item.taiKhoan == nv.taiKhoan;
  });
  if (kiemTraHopLe()) {
    DSNV[index] = nv;
    let dataJson = JSON.stringify(DSNV);
    localStorage.setItem('DSNV_JSON', dataJson);
    renderDSNV(DSNV);
    alert('cập nhật thành công');
  } else {
    alert('vui lòng nhập lại');
  }
}

document.getElementById('btnTimNV').onclick = function () {
  let loaiNhanVienCanTim = document.getElementById('searchName').value;
  console.log('🚀 [ loaiNhanVienCanTim:', loaiNhanVienCanTim);
  let danhSachNhanVienCanTim = DSNV.filter(function (nvCanTim) {
    return nvCanTim.loaiNV == loaiNhanVienCanTim;
  });
  console.log(
    '🚀 [ danhSachNhanVienCanTim [ danhSachNhanVienCanTim:',
    danhSachNhanVienCanTim
  );
  renderDSNV(danhSachNhanVienCanTim);
};
