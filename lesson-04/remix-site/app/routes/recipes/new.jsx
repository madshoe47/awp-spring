import { Link, redirect } from "remix";
import db from "~/db/db.server";
import NewRecipeStylesUrl from "~/styles/NewRecipe.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: NewRecipeStylesUrl,
    },
  ];
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const ingredients = form.get("ingredients");
  const seperatedIngredients = ingredients.split(",");
  const author = form.get("author");
  const img = form.get("img");

  const uuid = new Date().getTime().toString(16);
  db.data.recipes.push({ id: uuid, title, body, seperatedIngredients, author, img });
  db.write();
  return redirect(`/recipes/${uuid}`);
};

export default function NewRecipe() {
  return (
    <>
      <div className="page-header">
        <h1>New Recipe</h1>
        <Link to="/recipes" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Recipe body</label>
            <textarea name="body" id="body"></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="ingredients">Ingredients</label>
            <input type="text" name="ingredients" id="ingredients" />
          </div>
          <div className="form-control">
            <label htmlFor="author">Author</label>
            <input type="text" name="author" id="author" />
          </div>
          <div className="form-control">
            <label htmlFor="img">Picture URL</label>
            <input type="text" name="img" id="img" />
          </div>
          <button className=" btn btn-block" type="submit">
            Add Recipe
          </button>
        </form>
      </div>
    </>
  );
}
