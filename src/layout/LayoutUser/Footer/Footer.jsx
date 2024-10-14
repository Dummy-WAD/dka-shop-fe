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
          <div className={css.sectionTitle}>Support hotline</div>
          <div className={css.sectionContent}>
            <div className={css.sectionDetail}>
              <PhoneIcon />
              <div className={css.sectionText}>097 xxx xxxx</div>
            </div>
            <div className={css.sectionDetail}>
              <EmailIcon />
              <div className={css.sectionText}>support@dekanshop.com</div>
            </div>
          </div>
        </section>
        <section className={css.section}>
          <div className={css.sectionTitle}>Let us help you</div>
          <div className={css.sectionContent}>
            <a className={css.sectionText}>Accessibility</a>
            <a className={css.sectionText}>Shipping policy</a>
            <a className={css.sectionText}>Privacy policy</a>
            <a className={css.sectionText}>Terms & conditions</a>
            <a className={css.sectionText}>Cookie settings</a>
            <a className={css.sectionText}>Help center</a>
          </div>
        </section>
        <section className={css.section}>
          <div className={css.sectionTitle}>About us</div>
          <div className={css.sectionContent}>
            <a className={css.sectionText}>Partner reviews</a>
            <a className={css.sectionText}>Legal responsibility</a>
            <a className={css.sectionText}>Social responsibility</a>
            <a className={css.sectionText}>Company history</a>
          </div>
        </section>
        <section className={css.section}>
          <div className={css.sectionTitle}>Follow us</div>
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
