import { Link, useLoaderData } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";
import star from "~/resources/assets/star.svg";

export async function loader() {
  return await fetch("http://localhost:3000/api/beauty");
}

export default function BeautyItems() {
  const products = useLoaderData();
  console.log(products);

  return (
    <div>
      <PageHeader
        title="Beauty and personal care"
        subtitle="Curated by Kasia and Mads"
      >
        <LinkButton to="new">New product</LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-5">
        {products.map((product) => (
          <li
            key={product.id}
            className="rounded border border-gray-200 bg-gray-50 p-5"
          >
            <Link to={product.id} className="font-semibold">
              <img src={product.img} className="h-3/4 w-full object-cover" />
              <h3 className="mt-2">{product.title}</h3>
              <div className="flex justify-between">
                <p>{product.price} DKK</p>
                <div className="flex items-center">
                  <p>{product.rating}</p>
                  <img src={star} className="h-4 ml-1" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
