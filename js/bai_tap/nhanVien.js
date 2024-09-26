class NhanVien {
  tknv = '';
  name = '';
  email = '';
  password = '';
  datepicker = '';
  luongCB = '';
  chucvu = '';
  gioLam = '';
  xepLoai = '';

  tinhTongLuong = function () {
    switch (this.chucvu) {
      case 'Sếp':
        return this.luongCB * 3;
      case 'Trưởng Phòng':
        return this.luongCB * 2;
      case 'Nhân Viên':
        return this.luongCB;
      default:
        return 0;
    }
  };
  tinhXepLoai = function () {
    if (this.gioLam >= 192) {
      this.xepLoai = 'Xuất sắc';
    } else if (this.gioLam >= 176) {
      this.xepLoai = 'Giỏi';
    } else if (this.gioLam >= 160) {
      this.xepLoai = 'Khá';
    } else {
      this.xepLoai = 'Trung bình';
    }
    return this.xepLoai;
  };
}
