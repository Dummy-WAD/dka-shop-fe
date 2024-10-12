import "./Footer.css";
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Support Section */}
          <div className="col-md-3">
            <h6>Ban cần hỗ trợ?</h6>
            <p>
              <i className="bi bi-telephone-fill"></i> Thứ 2 - Chủ nhật:
              08am-9pm
              <br />
              <strong>097 xxx xxxx</strong>
              <br />
              <i className="bi bi-envelope-fill"></i> vulinhtruongxxx@gmail.com
            </p>
          </div>

          {/* Help Section */}
          <div className="col-md-3">
            <h6>Hãy để chúng tôi giúp bạn</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Khả năng tiếp cận
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Đơn hàng của bạn
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Trả hàng & Hoàn tiền
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Chính sách quyền riêng tư
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Điều khoản & Điều kiện
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Cài đặt Cookie
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Trung tâm trợ giúp
                </a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="col-md-3">
            <h6>Về chúng tôi</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Đánh giá của đối tác
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Trách nhiệm pháp lý
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Trách nhiệm xã hội
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Lịch sử phát triển
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="col-md-3">
            <h6>Theo dõi chúng tôi</h6>
            <div className="d-flex">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
