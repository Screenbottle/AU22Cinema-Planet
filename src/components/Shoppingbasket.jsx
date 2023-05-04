    import React from "react";
    import { useEffect, useState } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import { actions } from "../features/counter";

    const ShoppingBasket = ({data }) => {
    const value = useSelector((state) => state.counter);
        
    const dispatch = useDispatch();
    const add = () => dispatch(actions.addToBasket());
    const decrease = () => dispatch(actions.removeFromBasket());

    return (
        <div>
        value: {value}
        <button onClick={() => add()}>+</button>
        <button onClick={() => decrease()}>-</button>
        </div>
    );
    };
    export default ShoppingBasket;
