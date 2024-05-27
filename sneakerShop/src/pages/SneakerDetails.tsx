import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TovarsService from "../service/TovarsService";
import { ISneaker } from "../models/ISneaker";
import { useAppDispatch } from "../redux/store";
import { fetchCartItem, fetchTotalPricing } from "../redux/cart/asyncAction";
import { useSelector } from "react-redux";
import { selectCart } from '../redux/cart/selectors';
import CompanyService from "../service/CompanyService";

export const SneakerDetails: FC = () => {
    const [sneaker, setSneaker] = useState<ISneaker>();
    const [activeColor, setActiveColor] = useState<string>(sneaker?.colors[0] ?? '');
    const [activeSize, setActiveSize] = useState<number>(sneaker?.sizes[0] ?? 0);
    const [comapnyName, setCompanyName] = useState<string>("");
    const [comapnyDesc, setCompanyDesc] = useState<string>("");
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const { items } = useSelector(selectCart);



    function translateColorToEnglish(color: string): string {
        switch (color) {
            case 'Красные':
                return 'red';
            case 'Синий':
                return 'blue';
            case 'Черный':
                return 'black';
            case 'Розовые':
                return 'pink';
            case 'Серые':
                return 'gray';
            case 'Оранжевые':
                return 'orange';
            case 'Белый':
                return 'white';
            case 'Зеленые':
                return 'green';
            default:
                return color;
        }

    }
    async function getDetailsSneaker() {
        console.log(parseInt(id ?? '0'))
        const data = await TovarsService.getOneSneaker(parseInt(id ?? '0'));
        console.log(data.data)
        setSneaker(data.data)
        getCompany(data.data.idcompany);
    }
    async function getCompany(idCompany: number) {
        const res = await CompanyService.getOnecompany(idCompany);
        setCompanyName(res.data.name)
        setCompanyDesc(res.data.description)
    }
    async function addToCart() {
        const item = {
            idtovar: sneaker?.idtovar,
            name: sneaker?.name,
            img: sneaker?.img,
            price: parseInt(sneaker?.price ?? '0'),
            sizes: activeSize !== 0 ? [activeSize] : [sneaker?.sizes[0]],
            colors: activeColor !== '' ? [activeColor] : [sneaker?.colors[0]]
        };

        const cartItem = localStorage.getItem('cart');
        const currentCart = cartItem ? JSON.parse(cartItem) : [];
        const existingIndex = currentCart.findIndex((cartItem: any) => cartItem.idtovar === sneaker?.idtovar && cartItem.sizes[0] === activeSize && cartItem.colors[0] === activeColor);
        if (existingIndex !== -1) {
            currentCart.splice(existingIndex, 1); // Remove existing item
        } else {
            currentCart.push(item); // Add new item
        }
        localStorage.setItem('cart', JSON.stringify(currentCart));
        dispatch(fetchCartItem());
        dispatch(fetchTotalPricing());

    }



    useEffect(() => {
        getDetailsSneaker()
        console.log(activeColor)
        console.log(activeSize)
        console.log(items)
    }, [])
    return (
        <div className="tovarPage">
            <div className="tovar-picture">
                <div className="tovarPage__mainPic">
                    <img src={`http://127.0.0.1:5050/images/${sneaker?.img}`} alt="" />
                </div>
            </div>
            <div className="tovar-desc">
                <div className="nameBlock tovarPage__nameblock">
                    <h2 className="content__title tovarPage__title">{sneaker?.name}</h2>
                </div>
                <div className="descBlock tovarPage__descblock">
                    <h2 className="content__title">Описание</h2>
                    <p className="content__desc">
                        {sneaker?.description}
                    </p>
                </div>
                <div className="companyBlock tovarPage__company">
                        <h2 className="content__title">Продавец:</h2>
                        <p className="content__desc">
                            {comapnyName}
                        </p>

                </div>
                <div className="colorblock tovarPage__colorblock">
                    <h2 className="content__title">Доступные цвета</h2>
                    <div className="colors-row">
                        {
                            sneaker?.colors.map((color) => (
                                <div className={`color color__${translateColorToEnglish(color)} ${activeColor === color ? 'color__active' : ''}`} onClick={() => setActiveColor(color)}></div>
                            ))
                        }

                    </div>
                </div>
                <div className="sizeblock tovarPage__sizeblock">
                    <h2 className="content__title">Доступные размеры</h2>
                    <div className="sizes-details">
                        {
                            sneaker?.sizes.map((size) => (
                                <div className={`size-block ${activeSize === size ? 'size-block__active' : ''}`} onClick={() => setActiveSize(size)}>
                                <p>{size}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="details-bottom">
                    <h3 className="content__title">
                        Цена: {sneaker?.price} руб.
                    </h3>
                <div className="button button--add-to-cart" onClick={() => addToCart()}>
                    <span>
                        {items.some(
                            (item: any) =>
                                Number(item.idtovar) === sneaker?.idtovar &&
                                item.sizes[0] === activeSize &&
                                item.colors[0] === activeColor
                        )
                            ? 'Удалить'
                            : 'Добавить'}
                    </span>
                </div>
                </div>
            </div>
        </div>
    )
}