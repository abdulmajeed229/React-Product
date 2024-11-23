import { Badge, Image } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

function MyHeader() {
	const { cart } = useContext(CartContext);
	const logOut = () => {
		signOut(auth)
			.then(() => {
				alert("succes fully sign out");
			})
			.catch((error) => {
				alert("err===> " + error);
			});
	};
	return (
		<header>
			<div className="container py-6  flex items-center justify-between w-3/4 mx-auto ">
				<div className="logo">
					<Link to={"/"}>
						<Image
							preview={false}
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz46CDHCaeDW3jMK92SQ9MgGuEIb98gUZCvw&s"
							height={50}
							width={50}
						/>
					</Link>
				</div>
								<div className="user-cart flex items-center gap-3">
					
					
					<Link to={"/order"}>
						<Badge count={cart.length}>
							<ShoppingCartOutlined
								style={{
									fontSize: 30,
									color: "blue",
								}}
							/>
						</Badge>
					</Link>
				</div>
			</div>
		</header>
	);
}

export default MyHeader;
