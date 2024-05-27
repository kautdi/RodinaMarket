import { FC, useEffect, useState } from "react"
import CartItem from "../components/Cart/CartItem"
import { useSelector } from "react-redux";
import { fetchTotalPricing, fetchCartItem } from "../redux/cart/asyncAction";
import { selectCart } from "../redux/cart/selectors";
import { useAppDispatch } from "../redux/store";
import { selectAuth } from "../redux/auth/selectors";
import { Link } from "react-router-dom";
import { IUser } from "../models/IUser";
import UserService from "../service/UserService";
import ZakazService from "../service/ZakazService";
import { setCart } from "../redux/cart/slice";
export const Order: FC = () => {
    const [userInfo, setUserInfo] = useState<IUser>();
    const { items, totalPrice, count } = useSelector(selectCart);
    const { iduser } = useSelector(selectAuth);
    const [city, setCity] = useState<string>(userInfo?.city || "");
    const [country, setCountry] = useState<string>(userInfo?.country || "");
    const [home, setHome] = useState<string>(userInfo?.home || "");
    const [street, setStreet] = useState<string>(userInfo?.street || "");
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchData() {
            const userData = await UserService.getOneuser(iduser);
            setUserInfo(userData.data);
            setCity(userData.data?.city || "");
            setCountry(userData.data?.country || "");
            setHome(userData.data?.home || "");
            setStreet(userData.data?.street || "");
        }
        fetchData();
    }, [iduser]);
    useEffect(() => {
        dispatch(fetchTotalPricing());
        dispatch(fetchCartItem());
    }, []);
    const handleDeleteCart = () => {
        const cartItem = localStorage.removeItem('cart');
        dispatch(fetchCartItem());
        dispatch(fetchTotalPricing());
    }
    async function createZakaz (){
        const zakaz ={
            iduser:iduser,
            country: country,
            city:city,
            street:street,
            home: home,
            tovars:items
        }
        const response = await ZakazService.createZakaz(zakaz)
        console.log(response)
        localStorage.removeItem('cart');
        window.location.href = "/";
    }
    return (
        <div className="cart">
            <div className="cart__top">
                <h2 className="content__title">
                    Оформление заказа</h2>
                <div className="cart__clear">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span onClick={handleDeleteCart}>Очистить корзину</span>
                </div>
            </div>
            <div className="cart__body">
            <div className="items">
                <div className="table-info">
                    <div className="table-info__row">
                        <div className="table-info__name">Наименование</div>
                        <div className="table-info__size">Размер</div>
                        <div className="table-info__color">Цвет</div>
                        <div className="table-info__cell">Цена</div>
                    </div>
                </div>
            {
                items.map((item:any) => (
                    <CartItem
                        idtovar={item.idtovar}
                        image={item.img}
                        name={item.name}
                        sizes={Array.isArray(item.sizes) ? item.sizes : []}
                        colors={Array.isArray(item.colors) ? item.colors : []} // Проверяем, является ли colors массивом
                        price={item.price}
                        count={0}
                    />
                ))
            }
            </div>
            <div className="form-data">
                <h2 className="head">Ваш заказ</h2>
                <div className="form-data__details">
                    <p>Кол-во</p>
                    <p><b>{count} шт.</b></p>
                </div>
                <div className="form-data__details">
                    <p>Товары</p>
                    <p><b>{totalPrice}₽</b></p>
                </div>
                <div className="cart__bottom-buttons">
                    <div className="button pay-btn">
                            <span onClick={createZakaz}> Оплатить сейчас</span>
                    </div>
                </div>
              
            </div>
            </div>
            <div className="cart__bottom">
               
                <br />
                <br />
                <div className="delivery-history client-profile__delivery-history">
            <div className="delivery-info">
            <h2 className="contet-title delivery-info__contet-title">Адрес доставки</h2>
            <div className="adress-info delivery-info__adress-info">
                <div className="inputBlock inputBlock__edit">
                    <p>Страна:</p>
                    <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} id="country" placeholder="Страна" />
                  
                </div>
                <div className="inputBlock inputBlock__edit">
                    <p>Улица:</p>
                    <input type="text" name="email" id="email" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Улица" />
                   
                </div>
                <div className="inputBlock inputBlock__edit">
                    <p>Город:</p>
                    <input type="text" name="email" id="email" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" />
                    
                </div>
                <div className="inputBlock inputBlock__edit">
                    <p>Дом:</p>
                    <input type="text" name="email" value={home} onChange={(e) => setHome(e.target.value)} id="email" placeholder="Дом" />

                </div>
            </div>
        </div>
                
            </div>
               
            </div>
        </div>
    )
}
