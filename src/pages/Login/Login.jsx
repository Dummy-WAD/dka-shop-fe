import { handleLogin } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import authSlice from "../../redux/slice/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) return navigate("/");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      const login = async (email, password) => {
        try {
          const res = await handleLogin(email, password);
          const { tokens, user } = res;
          dispatch(
            authSlice.actions.setAuthInfo({
              isAuthenticated: true,
              userInfo: user,
            })
          );
          localStorage.setItem("accessToken", tokens?.access?.token);
          localStorage.setItem("refreshToken", tokens?.refresh?.token);
          return navigate("/");
        } catch (err) {
          console.error(err);
        }
      };
      login(email, password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4 d-flex flex-column row-gap-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter email..."
        />
        {formik.errors.email ? (
          <div className="text-danger">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-4 d-flex flex-column row-gap-2">
        <label htmlFor="email">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Enter password..."
        />
        {formik.errors.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit" className="btn btn-dark">
        Submit
      </button>
    </form>
  );
}

export default Login;
