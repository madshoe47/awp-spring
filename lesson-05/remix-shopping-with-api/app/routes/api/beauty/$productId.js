import db from "~/db/beauty/db.server.js";
import { json } from "remix";

export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}

export async function action({ request, params }) {
  if (request.method === "DELETE") {
    db.data.products = db.data.products?.filter(
      (p) => p.id !== params.productId
    );
    db.write();
    return json(body, {
      status: 201,
    });
  } else if (request.method === "PUT") {
    const body = await request.json();
    db.data.products.map((product) => {
      if (product.id === body.id) {
        product.title = body.title;
        product.description = body.description;
        product.price = body.price;
        product.img = body.img;
      }
    });
    db.write();
  }
  return json(body, {
    status: 201,
  });
}
