function kiemTraHopLe() {
  // Lấy giá trị từ các trường nhập liệu
  let taiKhoan = document.getElementById('tknv').value;
  let hoTen = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let matKhau = document.getElementById('password').value;
  let ngayLam = document.getElementById('datepicker').value;
  let luongCB = document.getElementById('luongCB').value;
  let chucVu = document.getElementById('chucvu').value;
  let gioLam = document.getElementById('gioLam').value;

  // 1. Kiểm tra tài khoản (4-6 ký số, không để trống)
  if (taiKhoan.length < 4 || taiKhoan.length > 6 || isNaN(taiKhoan)) {
    alert('Tài khoản phải có độ dài từ 4 đến 6 ký số và không được để trống');
    return false;
  }

  // 2. Kiểm tra họ tên (phải là chữ, không để trống)
  if (!/^[a-zA-Z\s]+$/.test(hoTen)) {
    alert('Tên nhân viên phải là chữ và không được để trống');
    return false;
  }

  // 3. Kiểm tra email (đúng định dạng, không để trống)
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    alert('Email không hợp lệ và không được để trống');
    return false;
  }

  // 4. Kiểm tra mật khẩu (6-10 ký tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt, không để trống)
  let matKhauPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,10}$/;
  if (!matKhauPattern.test(matKhau)) {
    alert(
      'Mật khẩu phải có độ dài từ 6 đến 10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và không được để trống'
    );
    return false;
  }

  // 5. Kiểm tra ngày làm (đúng định dạng mm/dd/yyyy, không để trống)
  let ngayLamPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!ngayLamPattern.test(ngayLam)) {
    alert('Ngày làm phải theo định dạng mm/dd/yyyy và không được để trống');
    return false;
  }

  // 6. Kiểm tra lương cơ bản (1.000.000 - 20.000.000, không để trống)
  luongCB = parseFloat(luongCB);
  if (luongCB < 1000000 || luongCB > 20000000 || isNaN(luongCB)) {
    alert(
      'Lương cơ bản phải nằm trong khoảng 1.000.000 - 20.000.000 và không được để trống'
    );
    return false;
  }

  // 7. Kiểm tra chức vụ (phải chọn chức vụ hợp lệ)
  if (chucVu === 'Chọn chức vụ') {
    alert('Vui lòng chọn chức vụ hợp lệ');
    return false;
  }

  // 8. Kiểm tra giờ làm (80 - 200 giờ, không để trống)
  gioLam = parseInt(gioLam);
  if (gioLam < 80 || gioLam > 200 || isNaN(gioLam)) {
    alert('Giờ làm phải nằm trong khoảng 80 - 200 giờ và không được để trống');
    return false;
  }

  // Nếu tất cả đều hợp lệ
  return true;
}
