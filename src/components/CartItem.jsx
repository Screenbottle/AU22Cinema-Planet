
import { ChevronDowon } from "../features/Icon";
import { ChevronUp } from "../features/Icon";
import { removeItem } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, img, title, price, amount }) => {
    const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title}></img>
      <div>
        <h4>
          {title}
          <h4 className="item-price">€{price}</h4>
          <button className="remove-btn" onClick={()=>dispatch(removeItem(id))
        }>remove</button>
        </h4>
      </div>
      <div>
        <button className="amount-btn">
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn">
          <ChevronDowon />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
