import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Selected.module.scss';
import { IBrand } from '../../../../models/IBrand';
import TovarsService from '../../../../service/TovarsService';
import { useAppDispatch } from '../../../../redux/store';
import { selectCompanyFilter } from '../../../../redux/companyfilter/selectors';
import { setBrands } from '../../../../redux/companyfilter/slice';

export const SelectedBrand: React.FC = () => {
  const [branding, setBranding] = useState<IBrand[]>([]);
  const dispatch = useAppDispatch();
  const { brands } = useSelector(selectCompanyFilter);

  async function getBrands() {
    const brandsData = await TovarsService.getBrands();
    setBranding(brandsData.data);
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    dispatch(setBrands(parseInt(selectedBrand)))
    console.log(brands)
  };

  return (
    <select className={styles.selectedBrand} onChange={handleSelectChange}>
      <option value="">Все</option>
      {branding.map((item, index) => (
        <option key={index} value={item.idbrand}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
