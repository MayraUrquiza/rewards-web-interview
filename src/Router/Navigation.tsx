import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { FC, Suspense } from "react";
import { routes } from "./routes";

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: FC<ILayoutProps> = ({ children }: ILayoutProps) => (
  <>
    <NavBar />
    <div id="layout">{children}</div>
  </>
);

const navItemStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link-active" : "nav-link-inactive";

const NavBar = () => (
  <nav>
    {routes.map(({ path, name }) => (
      <NavLink key={path} className={navItemStyle} to={path}>
        {name}
      </NavLink>
    ))}
  </nav>
);

const Router = () => (
  <Routes>
    {routes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
    <Route path="/*" element={<Navigate to="/" replace />} />
  </Routes>
);

export const Navigation = () => (
  <Suspense fallback={<span>Loading...</span>}>
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  </Suspense>
);
