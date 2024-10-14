import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  TwitterIcon,
} from "../../../icon/Icon";
import css from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={css.container}>
      <footer className={css.footer}>
        <section className={css.section}>
          <div className={css.sectionTitle}>Bạn cần hỗ trợ</div>
          <div className={css.sectionContent}>
            <div className={css.sectionDetail}>
              <PhoneIcon />
              <div className={css.sectionText}>Thứ 2 - Chủ nhật: 08am-9pm</div>
            </div>
            <div className={css.sectionDetail}>
              <EmailIcon />
              <div className={css.sectionText}>dekanshop@gmail.com</div>
            </div>
          </div>
        </section>
        <section className={css.section}>
          <div className={css.sectionTitle}>Hãy để chúng tôi giúp bạn</div>
          <div className={css.sectionContent}>
            <a className={css.sectionText}>Khả năng tiếp cận</a>
            <a className={css.sectionText}>Đơn hàng của bạn</a>
            <a className={css.sectionText}>Trả hàng & Hoàn tiền</a>
            <a className={css.sectionText}>Chính sách giao hàng</a>
            <a className={css.sectionText}>Chính sách quyền riêng tư</a>
            <a className={css.sectionText}>Điều khoản & Điều kiện</a>
            <a className={css.sectionText}>Cài đặt Cookie</a>
            <a className={css.sectionText}>Trung tâm trợ giúp</a>
          </div>
        </section>
        <section className={css.section}>
          <div className={css.sectionTitle}>Về chúng tôi</div>
          <div className={css.sectionContent}>
            <a className={css.sectionText}>Đánh giá của đối tác</a>
            <a className={css.sectionText}>Trách nhiệm pháp lí</a>
            <a className={css.sectionText}>Trách nhiệm xã hội</a>
            <a className={css.sectionText}>Lịch sử pháp triển</a>
          </div>
        </section>
        <section className={css.section}>
          <div className={css.sectionTitle}>Về chúng tôi</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
