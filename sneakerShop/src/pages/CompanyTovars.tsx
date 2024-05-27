import { FC, useEffect, useState } from 'react';
import CompanyService from '../service/CompanyService';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/selectors';
import { ISneaker } from '../models/ISneaker';
import { SneakerItem } from '../components/Main/SneakerItem';
import { TovarItem } from '../components/Company/TovarsItem';
import SortingBlock from '../components/Company/Sorting';
import { selectCompanyFilter } from '../redux/companyfilter/selectors';
import TovarsService from '../service/TovarsService';


const CompanyTovars: FC = () => {
  const { idcompany } = useSelector(selectAuth)
  const [sneakers, setSneakers] = useState<ISneaker[]>([])
  const dispatch = useDispatch();
  const {search, brands} = useSelector(selectCompanyFilter);


  useEffect(() => {
    async function getSneakers(){
      const brandsArray = [];
      brandsArray.push(brands)
      console.log(brandsArray)
      const response =  await TovarsService.getSneakers([], brandsArray, [idcompany], [], search, 0);
      setSneakers(response.data)
    }
    getSneakers();
}, [search, brands, idcompany]);

  return (
    <>
    <SortingBlock/>
    <div className="content__items">
      {
        sneakers.map((sneaker, index) => {
          return (
            <>
            <TovarItem key={sneaker.idtovar || index}
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
            brand_name={sneaker.brand_name} />
            </>
          );
        })
      }

    </div>
    </>
  );
}

export default CompanyTovars

