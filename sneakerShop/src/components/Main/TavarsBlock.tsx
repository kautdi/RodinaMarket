import { FC, useEffect, useState } from 'react';
import { SneakerItem } from './SneakerItem';
import TovarsService from '../../service/TovarsService';
import { ISneaker } from '../../models/ISneaker';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSneakers } from '../../redux/pizza/asyncAction';
import { selectSneakerData } from '../../redux/pizza/selectors';
import { useAppDispatch } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';

export const TovarsBlock: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sneakers } = useSelector(selectSneakerData);
  const { brandId, brands, sizes, price, idcompanys } = useSelector(selectFilter);


  const getSneakers = async () => {
    dispatch(
      fetchSneakers({ sizes, brands, idcompanys, colors: [], name: '', brandId: 0 , price}),
    );
  };
  useEffect(()=>{
    getSneakers()
    console.log(sneakers)
  }, [brandId, brands, sizes, price, idcompanys])


    return (
      <div className="content__items">
        {
          sneakers.map((sneaker, index) => (
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
  );
}
export default TovarsBlock