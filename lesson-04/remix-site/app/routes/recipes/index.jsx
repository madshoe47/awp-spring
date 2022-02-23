import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";

export async function loader() {
  return db.data.recipes;
}

export default function PostItems() {
  const recipes = useLoaderData();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="main-heading">Recipes</h1>
        <Link to="/recipes/new" className="btn">
          New recipe
        </Link>
      </div>
      <ul className="flex flex-row flex-wrap gap-4">
        {recipes.map((recipe) => (
          <li
            className="bg-stone-700 px-8 py-4 rounded-md w-96"
            key={recipe.id}
          >
            <Link to={recipe.id}>
              <h3 className="mb-2">{recipe.title}</h3>
              <img
                className="img"
                src={recipe.img}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "px",
                }}
              ></img>
              <p className="mt-2">Author: {recipe.author}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
