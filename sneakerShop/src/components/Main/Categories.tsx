import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';
import { setBrandId, setBrands } from '../../redux/filter/slice';
import { IBrand } from '../../models/IBrand';
import TovarsService from '../../service/TovarsService';

const Categories:FC = () => {
  const [branding, setBranding] = useState<IBrand[]>([])

    const dispatch = useAppDispatch();
    const { brands } = useSelector(selectFilter);

    const getBrands = async () => {
      const response = await TovarsService.getBrands();
      setBranding(response.data)
    };
    const onChangeBrandId = useCallback((idx: number) => {
      if (idx === 0){
        dispatch(setBrands([]));
      }
      else{
        const newBrands = [idx];
        dispatch(setBrands(newBrands));
      }
    }, []);


    useEffect(() => {
      getBrands()
    }, [])
  return (
    <div className="categories">
        <ul>
        <li className={ brands[0] === undefined ? 'active' : ''} onClick={() => onChangeBrandId(0)}>
    Все
</li>
            {branding.slice(0, 10).map((branding) => (
            <li key={branding.idbrand} 
            className={brands.includes(branding.idbrand) ? 'active' : ''}
            onClick={() => onChangeBrandId(branding.idbrand)}>
                          {branding.name}
            </li>
        ))}
        </ul>
    </div>
  );
};

export default Categories;

