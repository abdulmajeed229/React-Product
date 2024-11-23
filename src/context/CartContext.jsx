import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [isLoad, setIsLoad] = useState(true);

	useEffect(() => {
		const localItems = localStorage.getItem("cartItems");
		if (localItems) {
			setCart([...JSON.parse(localItems)]);
		}
		setIsLoad(false);
	}, []);

	useEffect(() => {
		if (!isLoad) {
			localStorage.setItem("cartItems", JSON.stringify(cart));
		}
	}, [cart]);

	function addCart(item) {
		const arr = [...cart];
		const itemInd = arr.findIndex((data) => data.id == item.id);
		if (itemInd == -1) {
			arr.push({ ...item, quantity: 1 });
		} else {
			arr[itemInd].quantity++;
		}
		setCart([...arr]);
	}

	function increaseQuantity(id, type) {
		const arr = [...cart];
		const itemInd = arr.findIndex((data) => data.id == id);
		if (type == "plus") {
			arr[itemInd].quantity++;
		} else {
			arr[itemInd].quantity--;
		}

		setCart([...arr]);
	}

	function removeCart(id) {
		const arr = [...cart];
		const itemInd = arr.findIndex((data) => data.id == id);
		arr.splice(itemInd, 1);
		setCart([...arr]);
	}

	function clearCart() {
		setCart([]);
	}

	function isAdded(id) {
		const arr = [...cart];
		const itemInd = arr.findIndex((data) => data.id == id);
		if (itemInd == -1) {
			return null;
		} else {
			return arr[itemInd];
		}
	}
	return (
		<CartContext.Provider
			value={{
				cart,
				addCart,
				increaseQuantity,
				isAdded,
				removeCart,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export default CartContextProvider;
