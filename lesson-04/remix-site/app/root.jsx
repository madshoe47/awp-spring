import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
import styles from "./tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

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
      <body className="bg-stone-800 text-white mx-36 my-8">
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
      <nav className="flex justify-between items-center mb-8">
        <Link to="/" className="text-xl">
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
