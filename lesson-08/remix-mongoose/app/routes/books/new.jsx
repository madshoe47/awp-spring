import { Form, redirect, json, useActionData } from "remix";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();

  try {
    const newBook = await db.models.Book.create({ title: form.get("title") });
    return redirect(`/books/${newBook._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
    // console.log("ERROR:", error);
  }
}

export default function CreateBook() {
  const actionData = useActionData();
  return (
    <div>
      <h1>Create Book</h1>
      <Form method="post">
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text "
          name="title"
          id="title"
          defaultValue={actionData?.values.title}
          className={
            actionData?.errors.title ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.title && (
          <p className="text-red-500">{actionData.errors.title.message}</p>
        )}
        <br />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

{
  /* <input type="text" name="title" errorMessage={actionData?.errors.title}/>
function Input({type, name, errorMessage}); */
}
