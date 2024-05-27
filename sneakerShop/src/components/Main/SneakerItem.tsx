
import { FC, useState } from 'react';
import { ISneaker } from '../../models/ISneaker';
import { useAppDispatch } from '../../redux/store';
import { fetchCartItem, fetchTotalPricing } from '../../redux/cart/asyncAction';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/selectors';
import { Link } from 'react-router-dom';

export const SneakerItem: FC<ISneaker> = ({ idtovar, name, price, img, sizes, colors }) => {
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeColor, setActiveColor] = useState<string>(colors[0]);

  const dispatch = useAppDispatch();
  
  // async function addToCart() {
  //   const item = {
  //     idtovar,
  //     name,
  //     img: img,
  //     price: Number(price),
  //     sizes: [activeSize],
  //     colors: [activeColor],
  //   };
  //   const cartItem = localStorage.getItem('cart');
  //   const currentCart = cartItem ? JSON.parse(cartItem) : [];

  //   const existingIndex = currentCart.findIndex((cartItem: any) => cartItem.idtovar === idtovar && cartItem.sizes[0] === activeSize && cartItem.colors[0] === activeColor);
  //   if (existingIndex !== -1) {
  //     currentCart.splice(existingIndex, 1); // Remove existing item
  //   } else {
  //     currentCart.push(item); // Add new item
  //   }

  //   localStorage.setItem('cart', JSON.stringify(currentCart));
  //   dispatch(fetchCartItem());
  //   dispatch(fetchTotalPricing());
  // }
  return (
    <div className="pizza-block">
      <Link to={`/sneaker-details/${idtovar}`}>
        <div className="pic-block-tovar">
          <img
            className="pizza-block__image"
            src={`http://127.0.0.1:5050/images/${img}`}
            alt="Pizza"
          />
        </div>
      </Link>
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        
        <Link to={`/sneaker-details/${idtovar}`} className={`button button--outline button--add `}>
          <span>
            Перейти
          </span>
        </Link>
      </div>
    </div>
  );
}