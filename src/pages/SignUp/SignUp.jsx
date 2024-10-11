import { BackIcon } from "../../icon/Icon";
import { Formik } from "formik";
import "./SignUp.css";
import logo from "../../assets/logo.png";
const SignUp = () => {
  const testEmailRegex = (email) => {
    const emailRegex = /^[\w.+-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const testPasswordRegex = (password) => {
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return regexPassword.test(password);
  };

  const validatePhoneNumberWithRegex = (phoneNumber) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return regexPhoneNumber.test(phoneNumber);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="header-signup">
        <div>
          <BackIcon />
          <span>Back</span>
        </div>
        <div>
          Already have an account? <a href="">Login</a>
        </div>
      </div>
      <hr />
      <div className="main-container-signup">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="title">
          Unlock your style – Sign up now for exclusive fashion deals!
        </div>
        <div className="container-form-signup">
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
              } else if (!testEmailRegex(values.email)) {
                errors.email = "Invalid email format.";
              }

              // Validate phone number
              if (!values.phoneNumber) {
                errors.phoneNumber = "Phone number is required.";
              } else if (!validatePhoneNumberWithRegex(values.phoneNumber)) {
                errors.phoneNumber = "Invalid phone number.";
              }

              // Validate password
              if (!values.password) {
                errors.password = "Password is required.";
              } else if (!testPasswordRegex(values.password)) {
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
              <form className="form" onSubmit={handleSubmit}>
                <div id="div-name">
                  <div className="container-item-input">
                    <label htmlFor="firstName">First Name</label>
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
                      <div className="error-message">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="container-item-input">
                    <label htmlFor="lastName">Last Name</label>
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
                      <div className="error-message">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="container-item-input">
                  <label htmlFor="email">Email</label>
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
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>
                <div className="container-item-input">
                  <label htmlFor="phoneNumber">Phone number</label>
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
                    <div className="error-message">{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="container-item-input">
                  <label htmlFor="password">Password</label>
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
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>
                <div className="container-item-input">
                  <label htmlFor="confirmPassword">Confirm Password</label>
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
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting}>
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
