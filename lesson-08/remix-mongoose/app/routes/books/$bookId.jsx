import { useLoaderData, useCatch, json } from "remix";
import connectDb from "~/db/connectDb.server.js";

// <code>
//     <pre>{JSON.stringify(book, null, 2)}</pre>
//  </code>

export async function loader({ params }) {
  const db = await connectDb();
  const book = await db.models.Book.findById(params.bookId);

  if (!book) {
    throw new Response(`Couldn't find book with ${params.bookId}`, {
      status: 404,
    });
  } else {
    return json(book);
  }
}

export default function BookPage() {
  const book = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-m mb-4">Author: {book.author}</p>
      <p className="text-m mb-4">Language: {book.language}</p>
      <p className="text-m mb-4">Published {book.publicationDate}</p>
      <p className="text-m mb-4">
        Price: {book.price} {book.currency}
      </p>

      <p className="text-m mb-4">
        Description: <br></br>
        {book.description}
      </p>

      <p>Reviews:</p>

      {book.reviews.map((reviews) => {
        return (
          <p className="text-m mb-4">
            Review Author: {reviews.author}
            <br></br>
            Stars given: {reviews.starRating}
            <br></br>
            Description: <br></br>
            {reviews.description}
          </p>
        );
      })}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1>
      {error.name}: {error.message}
    </h1>
  );
}
