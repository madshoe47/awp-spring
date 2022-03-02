import db from "~/db/beauty/db.server.js";
import { json } from "remix";

export async function loader() {
  return db.data.products ?? [];
}

export async function action({ request }) {
  if (request.method === "POST") {
    const body = await request.json();
    db.data.products?.push(body);
    db.write();
  }
  return json(body, {
    status: 201,
  });
}
