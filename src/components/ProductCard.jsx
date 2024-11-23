import { Image } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ProductCard(product) {
  const { isAdded } = useContext(CartContext);
  const data = product.data;
  const isAddedItem = isAdded(data.id) ? true : false;

  return (
    <Link to={`/product/${data.id}`}>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-10 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="h-56 w-full">
          {isAddedItem && (
            <ShoppingCartOutlined className="text-1xl text-white" />
          )}
          <Image
            width={300}
            className="mx-auto h-full"
            preview={false}
            src={data.thumbnail}
            alt={data.description}
          />
        </div>
        <div className="pt-6 mt-[65px]">
          <div className="mb-4 flex items-center justify-between gap-4 flex-wrap shadow-2xl">
            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-white-800 dark:bg-white-900 dark:text-white-300">
              Up to {data.discountPercentage}% off
            </span>
          </div>
          <a
            href="#"
            className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
          >
            {data.title}
          </a>
          <div className="mt-2 flex items-center gap-2"></div>
          <div className="mt-4 flex items-center justify-between">
            <p>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${data.price}
              </span>
              <span className="text-sm font-medium text-gray-500 line-through dark:text-gray-400">
                ${data.originalPrice}
              </span>
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
