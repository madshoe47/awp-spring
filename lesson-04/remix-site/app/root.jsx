import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
import globalStylesUrl from "~/styles/global.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: globalStylesUrl,
  },
];

export const meta = () => ({
  description: "A recipe blog",
  keywords: "recipes, food, jummy",
});

export default function App() {
  return (
    <Document title="Recipes Blog">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        <Scripts />
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Recipes Blog
        </Link>
        <ul className="nav">
          <Link to="/recipes">Recipes</Link>
        </ul>
      </nav>
      <div className="container">{children}</div>
    </>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
