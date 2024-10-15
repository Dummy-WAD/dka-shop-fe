import { BackIcon } from "../../icon/Icon";
import { Formik } from "formik";
import logo from "../../assets/logo.png";
import { handleSignUp } from "../../api/user";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { email, password, phoneNumber } from "../../validator/index";
import styles from "./SignUp.module.css";
const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await handleSignUp(values);
      if (response) {
        toast.success("Sign up successfully!");
        navigate("/login");
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          toast.error("Bad request!");
          break;
        case 409:
          toast.error("Email already exists!");
          break;
        default:
          toast.error("Sign up failed!");
          break;
      }
    }
  };

  return (
    <>
      <div className={styles.headerSignup}>
        <div onClick={() => navigate("/")}>
          <BackIcon />
          <span>Home</span>
        </div>
        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      <hr />
      <div className={styles.mainContainerSignup}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.title}>Sign Up</div>
        <div className={styles.containerFormSignup}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              firstName: "",
              lastName: "",
            }}
            validate={(values) => {
              let errors = {};

              // Validate first name
              if (!values.firstName) {
                errors.firstName = "First name is required.";
              }

              // Validate last name
              if (!values.lastName) {
                errors.lastName = "Last name is required.";
              }

              // Validate email
              if (!values.email) {
                errors.email = "Email is required.";
              } else if (!email(values.email)) {
                errors.email = "Invalid email format.";
              }

              // Validate phone number
              if (!values.phoneNumber) {
                errors.phoneNumber = "Phone number is required.";
              } else if (!phoneNumber(values.phoneNumber)) {
                errors.phoneNumber = "Invalid phone number.";
              }

              // Validate password
              if (!values.password) {
                errors.password = "Password is required.";
              } else if (!password(values.password)) {
                errors.password =
                  "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.";
              }

              // Validate confirm password
              if (!values.confirmPassword) {
                errors.confirmPassword = "Confirm password is required.";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match.";
              }

              return errors;
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
              handleChange,
              handleBlur,
            }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div id={styles.divName}>
                  <div className={styles.containerItemInput}>
                    <label htmlFor="firstName">
                      First Name <span className={styles.textRequired}>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className={styles.errorMessage}>
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className={styles.containerItemInput}>
                    <label htmlFor="lastName">
                      Last Name <span className={styles.textRequired}>*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className={styles.errorMessage}>
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.containerItemInput}>
                  <label htmlFor="email">
                    Email <span className={styles.textRequired}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className={styles.errorMessage}>{errors.email}</div>
                  )}
                </div>
                <div className={styles.containerItemInput}>
                  <label htmlFor="phoneNumber">
                    Phone number <span className={styles.textRequired}>*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className={styles.errorMessage}>
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
                <div className={styles.containerItemInput}>
                  <label htmlFor="password">
                    Password <span className={styles.textRequired}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={styles.errorMessage}>{errors.password}</div>
                  )}
                </div>
                <div className={styles.containerItemInput}>
                  <label htmlFor="confirmPassword">
                    Confirm Password{" "}
                    <span className={styles.textRequired}>*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className={styles.errorMessage}>
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.buttonSignUp}
                >
                  Sign Up
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default SignUp;
