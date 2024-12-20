import { handleLogin } from "../../api/user";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import authSlice from "../../redux/slice/authSlice";
import styles from "./Login.module.css";
import { email, password } from "../../validator";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { BackIcon } from "../../icon/Icon";
import { toast } from "react-toastify";
import { ADMIN, CUSTOMER } from "../../config/roles";
import { getTotalCartItems } from "../../api/cart";
import { setTotalCartItems } from "../../redux/slice/cartSlice";
import { getTotalNotifications } from "../../api/notification";
import { setTotalNotificationItems } from "../../redux/slice/notificationSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .test("Email test", "Email is invalid.", email),
  password: Yup.string().required("Password is required."),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.headerLogin}>
        <div onClick={() => navigate("/")}>
          <BackIcon />
          <span>Home</span>
        </div>
        <div>
          <Link to="/signup">Create a new account</Link>
        </div>
      </div>
      <hr />
      <div className={styles.mainContainerLogin}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.title}>Sign In</div>
        <div className={styles.containerFormLogin}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const { email, password } = values;
                const res = await handleLogin(email.trim(), password.trim());
                const { tokens, user } = res;
                dispatch(
                  authSlice.actions.setAuthInfo({
                    isAuthenticated: true,
                    userInfo: user,
                  })
                );
                localStorage.setItem("accessToken", tokens?.access?.token);
                localStorage.setItem("refreshToken", tokens?.refresh?.token);
                if (user.role === CUSTOMER) {
                  const response = await getTotalCartItems();
                  if (response) {
                    dispatch(setTotalCartItems(response.totalCartItems));
                  }
                }
                const notificationCount = await getTotalNotifications(
                  user.role
                );
                if (notificationCount)
                  dispatch(
                    setTotalNotificationItems(
                      notificationCount.notificationsCount
                    )
                  );
                return user.role === ADMIN ? navigate("/admin") : navigate("/");
              } catch (err) {
                console.error(err);
                toast.error("Incorrect email or password!");
              }
            }}
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
                <div className={styles.containerItemInput}>
                  <label htmlFor="email">
                    Email <span className={styles.textRequired}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address..."
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <ErrorMessage content={errors.email} />
                  )}
                </div>
                <div className={styles.containerItemInput}>
                  <label htmlFor="password">
                    Password <span className={styles.textRequired}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password..."
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage content={errors.password} />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.buttonLogin}
                >
                  Sign In
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Login;
