import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../layout/LayoutUser";
import CreateCategory from "../pages/CreateCategory/CreateCategory";
import Home from "../pages/Home/Home";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin";
import SignUp from "../pages/SignUp/SignUp";

const routes = [
  { path: "/", page: Home, layout: LayoutUser },
  { path: "/signup", page: SignUp },
  { path: "/admin/create-category", page: CreateCategory, layout: LayoutAdmin },
];

const router = createBrowserRouter(
  routes.map((route) => {
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
);
export default router;
