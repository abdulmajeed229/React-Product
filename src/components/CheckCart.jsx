import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import MyHeader from "./MyHeader";
import { Button, message } from "antd";
import CheckOutModal from "./CheckOutModal";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import emailjs from "emailjs-com";
function CheckCart() {
	const { cart, clearCart } = useContext(CartContext);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);

	const totalItemsQuantity = cart.reduce(
		(value, items) => value + items.quantity,
		0
	);
	const totalItemsPrice = cart.reduce(
		(value, items) => value + items.quantity * items.price,
		0
	);

	const checkOutOrder = async (event, values) => {
		event.preventDefault();
		const { name, email, address } = values;
		const orderObj = {
			...values,
			totalItemsPrice,
			totalItemsQuantity,
			user: {
				userID: auth.currentUser ? auth.currentUser.uid : "guest user",
				userName: auth.currentUser ? auth.currentUser.displayName : "guest",
				userPhoto: auth.currentUser ? auth.currentUser.photoURL : "Guest",
				userEmail: auth.currentUser ? auth.currentUser.email : "guest user",
			},
			status: "pending",
			items: cart.map(
				(data) =>
					`Item: ${data.title}, Price: ${data.price}, Quantity: (${data.quantity})`
			),
		};
	

		const templateEmail = {
			to_name: name,
			to_email: email,
			order_details: `Address: ${address}, Total: ${totalItemsPrice}, Items Quantity: ${totalItemsQuantity}, Your Items: ${cart.map(
				(data) => `Item Name${data.title}, Price: ${data.price}`
			)} `, // The order details
		};

		emailjs
			.send(
				"service_623ultd", // Replace with your EmailJS Service ID
				"template_14bp94r", // Replace with your EmailJS Template ID
				templateEmail,
				"lTyuv-fRcZtaSQv6b" // Replace with your EmailJS User ID
			)
			.then((response) => {
				console.log("SUCCESS!", response.status, response.text);
				message.success("Order confirmation email sent!");
			})
			.catch((err) => {
				console.log("FAILED...", err);
				message.error("Failed to send email.");
			});
		clearCart();
		setTimeout(() => setIsOpen(false), 5000);
	};

	return (
		<>
			<MyHeader />
			<CheckOutModal
				isOpen={isOpen}
				handleConfirm={() => setIsOpen(true)}
				handleCancel={() => setIsOpen(false)}
				checkOutOrder={checkOutOrder}
			/>
			<div className="flex gap-10 mx-auto w-3/4 mt-6">
				<div className="quantity flex items-center justify-center h-28 rounded border border-gray-500 w-[100%]  flex-col">
					<span>Total Items Quantity</span>
					<span className="text-2xl font-bold flex gap-2">
						{" "}
						{totalItemsQuantity}
					</span>
				</div>
				<div className="price flex items-center flex-col justify-center h-28 rounded border border-gray-500 w-[100%]">
					<span>Total Items Price</span>
					<span className="text-2xl font-bold ">
						{" "}
						<span className="text-3xl">$</span>
						{totalItemsPrice}
					</span>
				</div>
				<div className="proceed flex items-center justify-center h-28 rounded border border-gray-500 w-[100%]">
					<Button className="py-6 px-8 font-medium" onClick={openModal}>
						Proceed your order
					</Button>
				</div>
			</div>
			<div className="mx-auto w-3/4 mt-6">
				{cart.map((item, index) => (
					<CartItem pro={item} key={index} />
				))}
			</div>
		</>
	);
}

export default CheckCart;
