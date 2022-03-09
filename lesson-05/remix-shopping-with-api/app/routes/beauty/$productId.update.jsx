import {
  Link,
  useLoaderData,
  Form,
  useActionData,
  json,
  useTransition,
} from "remix";
import Breadcrumb from "~/components/Breadcrumb";
import PageHeader from "~/components/PageHeader";
import { redirect } from "remix";

export async function loader({ params }) {
  return await fetch(`http://localhost:3000/api/beauty/${params.productId}`);
}

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");
  const price = formData.get("price");

  const errors = {};
  if (!title) errors.title = true;
  if (!description) errors.description = true;
  if (!img) errors.img = true;
  if (!price) errors.price = true;

  if (Object.keys(errors).length > 0) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

  const updatedProduct = {
    id: params.productId,
    title,
    description,
    img,
    price,
  };

  const response = await fetch(
    `http://localhost:3000/api/beauty/${params.productId}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return redirect(`/beauty/${params.productId}`);
};

export default function Update() {
  const product = useLoaderData();
  const actionData = useActionData();
  let transition = useTransition();
  let isUpdating =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "update";

  return (
    <>
      <Breadcrumb links={[{ to: "/update", title: "Update" }]} />
      <PageHeader title="Update product" subtitle="Make it a good one" />
      <div>
        <Form method="post" className="w-64">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={product.title}
            className="border p-1 border-gray-200 w-full"
          />

          {actionData?.errors.title ? (
            <p style={{ color: "red" }}>You're missing a title</p>
          ) : null}

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"
            defaultValue={product.description}
          ></textarea>

          {actionData?.errors.description ? (
            <p style={{ color: "red" }}>You're missing a description</p>
          ) : null}

          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            name="img"
            id="img"
            className="border p-1 border-gray-200 w-full"
            defaultValue={product.img}
          />

          {actionData?.errors.img ? (
            <p style={{ color: "red" }}>You're missing a image</p>
          ) : null}

          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            className="border p-1 border-gray-200 w-full"
            defaultValue={product.price}
          />

          {actionData?.errors.price ? (
            <p style={{ color: "red" }}>You're missing a price</p>
          ) : null}

          <div className="mt-3">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-3 inline-block"
              type="submit"
              name="_action"
              value="update"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update product"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
