import { useEffect, useState } from "react";
import MyHeader from "./MyHeader";
import ProductCard from "./ProductCard";
import { Flex, Spin } from "antd";

function Products() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(12);

	useEffect(() => {
		fetch(`https://dummyjson.com/products?limit=${page}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.products);
				setLoading(false);
			});
	}, [page]);

	function handleScroll() {
		// console.log(document.documentElement.scrollHeight)
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >=
			document.documentElement.scrollHeight
		) {
			setPage((pre) => pre + 1);
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<MyHeader />

			{loading ? (
				<Flex
					align="center"
					className="flex items-center justify-center h-screen"
					gap="middle"
				>
					<Spin size="large" />
				</Flex>
			) : (
				<section className="mt-10 grid grid-cols-3 gap-5 w-[1100px] mx-auto">
					{products.map((data) => (
						<ProductCard data={data} key={data.id} />
					))}
				</section>
			)}
		</>
	);
}

export default Products;
