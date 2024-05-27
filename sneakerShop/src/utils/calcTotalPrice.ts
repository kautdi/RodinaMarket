import { CartItem } from '../redux/cart/types';

export const calculateTotalPrice = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.price, 0);
}