import { FC, useEffect, useState } from 'react';
import CompanyService from '../service/CompanyService';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/selectors';
import { ITax } from '../models/ITaxs';
import { TaxItem } from '../components/Company/TaxItem';

const CompanyTax: FC = () => {
  const [taxList, setTaxList] = useState<ITax[]>([])
  const { idcompany } = useSelector(selectAuth)

  // Функция для получения списка товаров с налогом от компании
  async function getTaxTovars() {
    const response = await CompanyService.taxList(idcompany);
    setTaxList(response.data);
  }

  // Используем useEffect для вызова функции getTaxTovars() при загрузке компонента
  useEffect(() => {
    getTaxTovars();
  }, [])

  return (
    <div className="content__items">
      {
        taxList.map((tax) => (
          <TaxItem 
            key={tax.idtovar} 
            idtovar={tax.idtovar}
            tovar_description={tax.tovar_description} 
            tovar_img={tax.tovar_img} 
            tovar_name={tax.tovar_name} 
            tovar_price={tax.tovar_price} 
            company_name={tax.company_name} 
            brand_name={tax.brand_name} 
            color_name={tax.color_name} 
            size_value={tax.size_value} 
          />
        ))
      }
    </div>
  );
}

export default CompanyTax;