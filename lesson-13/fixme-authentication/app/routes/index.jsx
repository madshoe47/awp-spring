import { useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";
import { requireUserSession, getSession } from "../sessions.server";

export async function loader({ request }) {
  await requireUserSession(request);
  // TODO: Verify that the user is authenticated, otherwise redirect to login page
  const db = await connectDb();

  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  // TODO: Get the `userId` from the session and filter the books to only return
  // those belonging to the current user
  const books = await db.models.Book.find({
    userId: userId,
  });
  return books;
}

export default function Index() {
  const books = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Remix + Mongoose</h1>
      <h2 className="text-lg font-bold mb-3">
        Here are a few of my favorite books:
      </h2>
      <ul className="ml-5 list-disc">
        {books.map((book) => {
          return (
            <li key={book._id}>
              <Link
                to={`/books/${book._id}`}
                className="text-blue-600 hover:underline"
              >
                {book.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
