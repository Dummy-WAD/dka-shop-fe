import { createBrowserRouter, useNavigate } from "react-router-dom";
import CreateCategory from "../pages/CreateCategory/CreateCategory";
import Home from "../pages/Home/Home";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin";
import LayoutUser from "../layout/LayoutUser/LayoutUser";
import Login from "../pages/Login/Login";
import { useSelector } from "react-redux";
import SignUp from "../pages/SignUp/SignUp";
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  if (!isAuthenticated) return navigate("/login");
  return children;
};

const publicRoutes = [
  { path: "/", page: Home, layout: LayoutUser },
  { path: "/signup", page: SignUp },
  { path: "/login", page: Login, layout: LayoutUser },
];

const privateRoutes = [
  { path: "/admin/create-category", page: CreateCategory, layout: LayoutAdmin },
];

const router = createBrowserRouter(
  publicRoutes
    .map((route) => {
      const { path, page, layout } = route;
      const Page = page;
      const Layout = layout;
      return {
        path,
        element: Layout ? (
          <Layout>
            <Page />
          </Layout>
        ) : (
          <>
            <Page />
          </>
        ),
      };
    })
    .concat(
      privateRoutes.map((route) => {
        const { path, page, layout } = route;
        const Page = page;
        const Layout = layout;
        return {
          path,
          element: Layout ? (
            <PrivateRoute>
              <Layout>
                <Page />
              </Layout>
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Page />
            </PrivateRoute>
          ),
        };
      })
    )
);
export default router;
