import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cartItem } from '../types/types';

type cartItemProps = {
    cartItem: any;
    incrementHandler: (cartItem: cartItem) => void;
    decrementHandler: (cartItem: cartItem) => void;
    removeHandler: (productId: string) => void;
};

const CartItemCard = ({cartItem, incrementHandler, decrementHandler, removeHandler}:cartItemProps) => {
    const {productId, photo, name, price, quantity} = cartItem;
  return (
    <div className="cartItem">
        <img src={photo} alt={name} />
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span>₹{price}</span>
        </article>
        <div>
            <button onClick={() => decrementHandler(cartItem)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => incrementHandler(cartItem)}>+</button>
        </div>
        <button onClick={() => removeHandler(productId)}><FaTrash /></button>
    </div>
  )
}

export default CartItemCard