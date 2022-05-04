import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "@remix-run/react";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "Remix + MongoDB",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100 text-slate-800 font-sans p-4">
        <header className="pb-3 mb-4 border-b-2">
          <MenuLink to="/">Home</MenuLink>
          <MenuLink to="/books/new" className="ml-3">
            New book
          </MenuLink>
          <MenuLink to="/login" className="ml-3">
            Login
          </MenuLink>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function MenuLink({ to, className, children }) {
  return (
    <NavLink
      end
      to={to}
      className={({ isActive }) =>
        [className, "hover:underline text-blue-600", isActive && "font-bold"]
          .filter(Boolean)
          .join(" ")
      }>
      {children}
    </NavLink>
  );
}
