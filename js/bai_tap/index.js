let arrNhanVien = [];
document.getElementById('formQLNV').onsubmit = function (event) {
  event.preventDefault();
  let nhanVien = getValueForm();
  if (!nhanVien) {
    return;
  }
  arrNhanVien.push(nhanVien);
  setLocalStorage('arrNhanVien', arrNhanVien);
  readerDataNhanVien();

  // Reset
  // trỏ tới thẻ form đang chạy onsubmit
  event.target.reset();
};

// -------- Get value form ---------
function getValueForm() {
  let arrField = document.querySelectorAll('#formQLNV input,#formQLNV select');
  let nhanVien = new NhanVien();
  let isValid = true;
  for (let field of arrField) {
    let { value, id } = field;
    console.log(value);
    nhanVien[id] = value;

    switch (id) {
      case 'tknv':
        if (!validateTKNV(value)) {
          alert('Tài khoản phải từ 4-6 ký số và không để trống.');
          isValid = false;
        }
        break;
      case 'name':
        if (!validateName(value)) {
          alert('Tên nhân viên phải là chữ và không để trống.');
          isValid = false;
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          alert('Email không hợp lệ hoặc không để trống.');
          isValid = false;
        }
        break;
      case 'password':
        if (!validatePassword(value)) {
          alert(
            'Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 số, 1 chữ hoa và 1 ký tự đặc biệt.'
          );
          isValid = false;
        }
        break;
      case 'datepicker':
        if (!validateDate(value)) {
          alert('Ngày làm không để trống và phải theo định dạng mm/dd/yyyy.');
          isValid = false;
        }
        break;
      case 'luongCB':
        if (!validateLuongCB(value)) {
          alert(
            'Lương cơ bản phải từ 1,000,000 đến 20,000,000 và không để trống.'
          );
          isValid = false;
        }
        break;
      case 'chucvu':
        if (!validateChucVu(value)) {
          alert('Chức vụ phải chọn hợp lệ (Sếp, Trưởng Phòng, Nhân Viên).');
          isValid = false;
        }
        break;
      case 'gioLam':
        if (!validateGioLam(value)) {
          alert(
            'Số giờ làm trong tháng phải từ 80 - 200 giờ và không để trống.'
          );
          isValid = false;
        }
        break;
    }
  }
  nhanVien.tinhXepLoai();

  return isValid ? nhanVien : null;
}

function setLocalStorage(key, value) {
  let dataString = JSON.stringify(value);
  localStorage.setItem(key, dataString);
}

function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}

window.onload = function () {
  let dataLocal = getLocalStorage('arrNhanVien');
  if (dataLocal) {
    arrNhanVien = dataLocal;
    readerDataNhanVien();
  }
};

function readerDataNhanVien(arr = arrNhanVien) {
  let content = '';

  for (let nhanVien of arr) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = newNhanVien;
    content += `
    <tr>
    <td>${tknv}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${datepicker}</td>
    <td>${chucvu}</td>
    <td>${newNhanVien.tinhTongLuong()}</td> 
    <td>${newNhanVien.tinhXepLoai()}</td> 
    <td>
    <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xóa</button>
    <button onclick="getInfoNhanVien('${tknv}')" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Sửa</button>
    </td>
    </tr>
    `;
  }
  document.getElementById('tableDanhSach').innerHTML = content;
}

function deleteNhanVien(maNV) {
  let index = arrNhanVien.findIndex((item, i) => item.tknv == maNV); // -1
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    readerDataNhanVien();
    setLocalStorage('arrNhanVien', arrNhanVien);
  }
}

function getInfoNhanVien(maNV) {
  // console.log(maNV);
  let nhanVien = arrNhanVien.find((item, index) => item.tknv == maNV); //
  if (nhanVien) {
    let arrField = document.querySelectorAll('form input, form select');
    for (let field of arrField) {
      // field đại diện cho các input và select tìm kiếm được trong form
      field.value = nhanVien[field.id];
      if (field.id == 'tknv') {
        field.readOnly = true;
      }
    }
  }
}

document.getElementById('btnCapNhat').onclick = function () {
  let nhanVien = getValueForm();
  if (nhanVien) {
    let index = arrNhanVien.findIndex(
      (item, index) => item.tknv == nhanVien.tknv
    );
    if (index != -1) {
      arrNhanVien[index] = nhanVien;
      readerDataNhanVien();
      setLocalStorage('arrNhanVien', arrNhanVien);
      document.getElementById('tknv').readOnly = false;
      document.getElementById('formQLNV').reset();
    }
  }
};

document.getElementById('searchName').oninput = function (event) {
  let keyWord = event.target.value.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyWord);

  let arrSearch = arrNhanVien.filter((item, index) => {
    let newTenSv = removeVietnameseTones(item.xepLoai.trim().toLowerCase());
    return newTenSv.includes(newKeyWord);
  });
  readerDataNhanVien(arrSearch);
};
