import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { redirect, useNavigate } from 'react-router-dom';
import { cartReducerInitialState, userReducerInitialState } from '../types/reducer-types';
import { useDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';
import axios from 'axios';
import { saveShippingInfo } from '../redux/reducer/cartReducer';
import { newOrderRequest } from '../types/api-types';
import { useNewOrderMutation } from '../redux/api/orderAPI';

const Shipping = () => {
    const {cartItems, subtotal, tax, discount, shippingCharges, total} = useSelector((state: {cartReducer: cartReducerInitialState}) => state.cartReducer);
    const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newOrder] = useNewOrderMutation();

    useEffect(() => {
        if(cartItems.length <= 0) return navigate("/cart")
    }, [cartItems])

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]:e.target.value}));
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(saveShippingInfo(shippingInfo));

        const orderData: newOrderRequest = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: user?._id!
        }

        const {data: {order}} = await axios.post("http://localhost:3000/api/v1/payment/create", {
            "amount": String(total) 
        })

        const options = {
            key: "rzp_test_Y5JdZo6US4lQYx", // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Vedansh Corp",
            description: "Test Transaction",
            image: "https://lh3.googleusercontent.com/a/ACg8ocIjDi9bVYkmzvxkRF1kDKPF-N9Qk6NfksPOLkQVoEPFSCJ9XHSL=s360-c-no",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `http://localhost:3000/api/v1/payment/verification?orderData=${encodeURIComponent(JSON.stringify(orderData))}`, 
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        
        const razor = new (window as any).Razorpay(options);
        razor.open();
    }

    return (
        <div className="shipping">
            <button className="back-btn" onClick={() => {navigate("/cart")}}>
                <BiArrowBack />
            </button>

            <form onSubmit={submitHandler}>
                <h1>Shipping Address</h1>
                <input required type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler} />
                <input required type="text" placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler} />
                <input required type="text" placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler} />
                <input required type="number" placeholder="Pin Code" name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler} />
                <select name='country' required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Choose Country</option>
                    <option value="India">India</option>
                </select>

                <button type='submit'>Pay Now</button>
            </form>
        </div>
    )
}

export default Shipping