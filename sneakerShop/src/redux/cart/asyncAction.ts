import { createAsyncThunk } from '@reduxjs/toolkit';
import { calculateTotalPrice } from '../../utils/calcTotalPrice';

export const fetchTotalPricing = createAsyncThunk(
  'cart/fetchCartPrice',
  async () => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(cartData)
    const totalPrice = cartData.reduce((acc: number, item: { price: number }) => acc + item.price, 0);
    console.log("Сумма" + totalPrice)
    return totalPrice;
},
);
export const fetchCartItem = createAsyncThunk(
  'cart/fetchCartItem',
  async () => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    return cartData;
},
);