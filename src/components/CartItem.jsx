import { Image } from "antd";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartItem({ pro }) {
	const { increaseQuantity } = useContext(CartContext);
	return (
		<>
			<div className=""></div>
			<div className=" mb-4 cart-item py-6 px-4 border shadow-2xl border-gray-300 rounded flex items-center gap-10">
				<Image
					preview={false}
					src={pro.thumbnail}
					alt={pro.name}
					width={100}
					height={100}
					className="border border-green-100"
				/>
				<div className="content">
					<h2 className="font-medium">{pro.title}</h2>
					<p className="text-gray-400 font-semibold mb-2">${pro.price}</p>
					<div className="quantity flex gap-2 items-center">
						<button
							onClick={() => increaseQuantity(pro.id, "plus")}
							className="py-1 px-4 bg-gray-300 font-medium flex items-center text-sm"
						>
							Add{" "}
						</button>
						<p>{pro.quantity}</p>
						{pro.quantity <= 1 ? (
							<button
								disabled
								className="py-1 px-4 bg-gray-300  font-medium flex items-center text-sm text-gray-600"
							>
								Minus
							</button>
						) : (
							<button
								onClick={() => increaseQuantity(pro.id)}
								className="py-1 px-4 bg-gray-300  font-medium flex items-center text-sm"
							>
								Minus
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
export default CartItem;
