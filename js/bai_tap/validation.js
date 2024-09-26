function validateTKNV(tknv) {
  const regex = /^\d{4,6}$/; // 4-6 ký số
  return regex.test(tknv) && tknv.trim() !== '';
}

function validateName(name) {
  const regex = /^[A-Za-z ]+$/; // Chỉ chứa chữ cái và khoảng trắng
  return regex.test(name) && name.trim() !== '';
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email hợp lệ
  return regex.test(email) && email.trim() !== '';
}

function validatePassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).{6,10}$/; // 6-10 ký tự, ít nhất 1 số, 1 chữ hoa, 1 ký tự đặc biệt
  return regex.test(password) && password.trim() !== '';
}

function validateDate(date) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/; // Định dạng mm/dd/yyyy
  return regex.test(date) && date.trim() !== '';
}

function validateLuongCB(luongCB) {
  const luong = parseFloat(luongCB);
  return !isNaN(luong) && luong >= 1000000 && luong <= 20000000; // Lương từ 1,000,000 đến 20,000,000
}

function validateChucVu(chucvu) {
  const validPositions = ['Sếp', 'Trưởng Phòng', 'Nhân Viên']; // Các chức vụ hợp lệ
  return validPositions.includes(chucvu);
}

function validateGioLam(gioLam) {
  const gio = parseInt(gioLam, 10);
  return !isNaN(gio) && gio >= 80 && gio <= 200; // Số giờ làm từ 80 đến 200
}
