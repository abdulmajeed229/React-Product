import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
function CheckOutModal({ isOpen, handleConfirm, handleCancel, checkOutOrder }) {
	// orderConfirm as props
	const [guestUser, setGuestUser] = useState(false);
	useEffect(() => {
		return setGuestUser(false);
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
			[email]: value,
			[phone]: value,
			[address]: value,
		});

		console.log("update", formData);
	};
	// console.log(GoogleAuthProvider);

	const googleSign = () => {
		const provider = new GoogleAuthProvider();
		provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				alert("error====> " + errorCode + "\n" + "error====> " + errorMessage);
			});
	};

	// console.log(getAuth(app));
	const isLogin = auth.currentUser;
	console.log(isLogin);
	// console.log((isLogin || guestUser));

	return (
		<>
			<Modal
				title="Proceed Order"
				centered
				open={isOpen}
				onOk={handleConfirm}
				onClose={false}
				onCancel={handleCancel}
				footer={null}
				width={800}
			>
				{!isLogin && !guestUser && (
					<div className="flex items-center justify-center flex-col gap-6 my-10">
						<Button onClick={googleSign} className="py-6 px-8">
							<GoogleOutlined /> Continue as Google
						</Button>
						<p>---------- OR ----------</p>
						<Button onClick={() => setGuestUser(true)} className="py-6 px-8">
							Continue as Guest
						</Button>
					</div>
				)}

				{isLogin || guestUser ? (
					<form onSubmit={(e) => checkOutOrder(e, formData)}>
						<label htmlFor="userName">Name</label>
						<input
							type="text"
							onChange={handleChange}
							defaultValue={isLogin?.displayName}
							name="name"
							id="userName"
						/>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							onChange={handleChange}
							defaultValue={isLogin?.email}
							name="email"
						/>
						<label htmlFor="phone">Email</label>
						<input
							id="phone"
							type="number"
							onChange={handleChange}
							name="phone"
							placeholder="Enter your phone number "
						/>
						<label htmlFor="address">Address</label>
						<textarea
							name="address"
							onChange={handleChange}
							id="address"
							placeholder="Enter ship address"
						></textarea>
						<button type="submit">Order Place</button>
					</form>
				) : (
					<h1>Not Found any data</h1>
				)}
			</Modal>
		</>
	);
}

export default CheckOutModal;
