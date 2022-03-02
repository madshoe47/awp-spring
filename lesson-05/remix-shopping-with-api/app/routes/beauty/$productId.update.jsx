import { Link, useLoaderData } from "remix";
import Breadcrumb from "~/components/Breadcrumb";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import { redirect } from "remix";

export async function loader({ params }) {
  return await fetch(`http://localhost:3000/api/beauty/${params.productId}`);
}

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const img = form.get("img");
  const price = form.get("price");

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

  return (
    <>
      <Breadcrumb links={[{ to: "/update", title: "Update" }]} />
      <PageHeader title="Update product" subtitle="Make it a good one" />
      <div>
        <form method="post" className="w-64">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={product.title}
            className="border p-1 border-gray-200 w-full"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"
            defaultValue={product.description}
          ></textarea>
          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            name="img"
            id="img"
            className="border p-1 border-gray-200 w-full"
            defaultValue={product.img}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            className="border p-1 border-gray-200 w-full"
            defaultValue={product.price}
          />
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </form>
      </div>
    </>
  );
}
