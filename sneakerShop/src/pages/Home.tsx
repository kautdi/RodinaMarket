import { FC, useEffect, useState } from "react"
import Categories from "../components/Main/Categories"
import Sorting from "../components/Main/Sorting"
import TovarsBlock from "../components/Main/TavarsBlock"
import TovarsService from "../service/TovarsService"
import { IBrand } from "../models/IBrand"
import { Link } from "react-router-dom"
import { SneakerItem } from "../components/Main/SneakerItem"
import { fetchSneakers } from "../redux/pizza/asyncAction"
import { useSelector } from "react-redux"
import { selectFilter } from "../redux/filter/selectors"
import { selectSneakerData } from "../redux/pizza/selectors"
import { useAppDispatch } from "../redux/store"



export const Home: FC = () => {
    const [branding, setBranding] = useState<IBrand[]>([])
    const dispatch = useAppDispatch();
    const { sneakers } = useSelector(selectSneakerData);
    const { brandId, brands, sizes, price, idcompanys } = useSelector(selectFilter);
    async function getBrands() {
        const brandsData = await TovarsService.getBrands();
        setBranding(brandsData.data);
        console.log(brandsData.data)
        return brandsData.data;
    }
    const getSneakers = async () => {
        dispatch(
          fetchSneakers({ sizes, brands, idcompanys, colors: [], name: '', brandId: 0 , price}),
        );
      };
      useEffect(()=>{
        getSneakers()
        console.log(sneakers)
      }, [brandId, brands, sizes, price, idcompanys])
    useEffect(() => {
        getBrands();
    }, [])
    return (
        <div className="content">
            <div className="container">
                <h2 className="content__title">Категории</h2>
                <div className="brands">
                    <Link to={"/home"} className="brand-block">
                        <div className="pic-block">
                            <img src="https://rodinastore.ru/upload/iblock/368/rges74qnmvgh494bwqghwufq6qquigam.jpg" alt="" />
                        </div>
                        <div className="brand-name">
                            Все товары
                        </div>
                    </Link>
                    {
                        branding.map((brand) => (
                            <a href={`/category/${brand.idbrand}`} className="brand-block">
                                <div className="pic-block">
                                    <img src={`http://localhost:5050/images/category/${brand.img}`} alt="" />
                                </div>
                                <div className="brand-name">
                                    {brand.name}
                                </div>
                            </a>
                        ))
                    }
                </div>
                 <div className="popular">
                    <h2 className="content__title">Популярные товары</h2>
                    <div className="content__items">
        {
          sneakers.slice(0, 8).map((sneaker, index) => (
            <SneakerItem 
              key={sneaker.idtovar || index}
              idtovar={sneaker.idtovar}
              idcompany={sneaker.idcompany}
              description={sneaker.description}
              idbrand={sneaker.idbrand}
              company_name={sneaker.company_name}
              name={sneaker.name} 
              price={sneaker.price} 
              img={sneaker.img} 
              sizes={sneaker.sizes} 
              colors={sneaker.colors} 
              brand_name={sneaker.brand_name} 
            />
          ))
        }
    </div>
                 </div>
            </div>
        </div>
    )
}