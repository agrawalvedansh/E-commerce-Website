import { FaPlus } from "react-icons/fa";
import { cartItem } from "../types/types";

type productProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: (cartItem: cartItem) => string | undefined;
};

const productCard = (
    { productId,
        price,
        name,
        photo,
        stock,
        handler, }: productProps
) => {
    return (
        <div className="productCard">
            <img src={photo} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>
            <div>
                <button onClick={() => handler({ productId,price,name,photo,stock, quantity: 1})}>
                    <FaPlus />
                </button>
            </div>
        </div>


    )
}

export default productCard