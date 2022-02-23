import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";
import RecipesStylesUrl from "~/styles/Recipes.css";

export async function loader() {
  return db.data.recipes;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: RecipesStylesUrl,
    },
  ];
}

export default function PostItems() {
  const recipes = useLoaderData();

  return (
    <div>
      <div className="page-header">
        <h1>Recipes</h1>
        <Link to="/recipes/new" className="btn">
          New recipe
        </Link>
      </div>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li className="recipe-item" key={recipe.id}>
            <Link to={recipe.id}>
              <h3>{recipe.title}</h3>
              <img className="img" src={recipe.img} style={{width:"100%", height:"200px", objectFit:"cover", borderRadius:"px"}} ></img>
              <p className="page-content">Author: {recipe.author}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
