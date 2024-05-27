import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';
import { useAppDispatch } from '../../redux/store';
import TovarsService from '../../service/TovarsService';
import { IBrand } from '../../models/IBrand';
import { setBrands, setIdCompanys, setPrice, setSize } from '../../redux/filter/slice';
import { privateDecrypt } from 'crypto';
import { parse } from 'path';
import CompanyService from '../../service/CompanyService';
import { ICompany } from '../../models/ICompany';


const Sorting: FC = () => {
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedBranding, setSelectedBranding] = useState<number[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number[]>([]);

  const [pricing, setPricing] = useState<string>("");
  const [openPop, setOpenPop] = useState<boolean>(false)

  const [branding, setBranding] = useState<IBrand[]>([])
  const [companies, setCompanies] = useState<ICompany[]>([])
  const sizings = [36, 37, 38, 39, 40, 41, 42, 43, 44]

  const dispatch = useAppDispatch();
  const { brands, sizes, price, idcompanys } = useSelector(selectFilter);

  const handleSelectSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
    // console.log(selectedSizes);
  };

  const handleSelectBrand = (idbrand: number) => {
    if (selectedBranding.includes(idbrand)) {
      setSelectedBranding(selectedBranding.filter((b) => b !== idbrand));
    } else {
      setSelectedBranding([...selectedBranding, idbrand]);
    }
    console.log(selectedBranding)
  };

  const handleSelectCompany = (idcompany: number) => {
    if (selectedCompany.includes(idcompany)) {
      setSelectedCompany(selectedCompany.filter((b) => b !== idcompany));
    } else {
      setSelectedCompany([...selectedCompany, idcompany]);
    }
    console.log(selectedCompany)
  };
  const handleChangeSorting = (e: any) => {
    e.preventDefault();
    dispatch(setBrands(selectedBranding));
    dispatch(setIdCompanys(selectedCompany));
    console.log("Redux companys: " + idcompanys)

    if (pricing === ''){
      dispatch(setPrice(0))
    }
    else{
      dispatch(setPrice(parseInt(pricing)))
    }
    dispatch(setSize(selectedSizes));
    
    console.log(sizes)
    console.log(brands)
    setOpenPop(false)
  };

  const getBrands = async () => {
    const response = await TovarsService.getBrands();
    setBranding(response.data)
  };
  const getCompany = async () => {
    const response = await CompanyService.getAllCompanies("");
    console.log(response.data)
    setCompanies(response.data)
  }
  useEffect(() => {
    getBrands()
    getCompany()
  }, [])

  return (
    <div className="sort">
      <div className="sort__label">
        <button className="btn btn-sorting" onClick={()=>setOpenPop(!openPop)}>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.3663 9.96874C22.9705 9.96874 23.4538 9.4854 23.4538 8.88124V3.26249C23.4538 2.65832 22.9705 2.17499 22.3663 2.17499C21.7621 2.17499 21.2788 2.65832 21.2788 3.26249V8.88124C21.2788 9.47332 21.7742 9.96874 22.3663 9.96874Z" fill="#FFF" />
            <path d="M14.5001 19.0312C13.8959 19.0312 13.4126 19.5146 13.4126 20.1187V25.7375C13.4126 26.3417 13.8959 26.825 14.5001 26.825C15.1043 26.825 15.5876 26.3417 15.5876 25.7375V20.1187C15.5876 19.5267 15.1043 19.0312 14.5001 19.0312Z" fill="#FFF" />
            <path d="M6.63364 9.96874C7.23781 9.96874 7.72114 9.4854 7.72114 8.88124V3.26249C7.72114 2.65832 7.23781 2.17499 6.63364 2.17499C6.02948 2.17499 5.54614 2.65832 5.54614 3.26249V8.88124C5.54614 9.47332 6.02948 9.96874 6.63364 9.96874Z" fill="#FFF" />
            <path d="M8.88133 12.2888H4.38633C3.78216 12.2888 3.29883 12.7721 3.29883 13.3763C3.29883 13.9804 3.78216 14.4638 4.38633 14.4638H5.54633V25.7375C5.54633 26.3417 6.02966 26.825 6.63383 26.825C7.23799 26.825 7.72133 26.3417 7.72133 25.7375V14.4638H8.88133C9.48549 14.4638 9.96883 13.9804 9.96883 13.3763C9.96883 12.7721 9.47341 12.2888 8.88133 12.2888Z" fill="#FFF" />
            <path d="M24.6138 12.2888H20.1187C19.5146 12.2888 19.0312 12.7721 19.0312 13.3763C19.0312 13.9804 19.5146 14.4638 20.1187 14.4638H21.2788V25.7375C21.2788 26.3417 21.7621 26.825 22.3663 26.825C22.9704 26.825 23.4537 26.3417 23.4537 25.7375V14.4638H24.6138C25.2179 14.4638 25.7013 13.9804 25.7013 13.3763C25.7013 12.7721 25.2179 12.2888 24.6138 12.2888Z" fill="#FFF" />
            <path d="M16.7475 14.5362H15.5875V3.26249C15.5875 2.65832 15.1042 2.17499 14.5 2.17499C13.8959 2.17499 13.4125 2.65832 13.4125 3.26249V14.5362H12.2525C11.6484 14.5362 11.165 15.0196 11.165 15.6237C11.165 16.2279 11.6484 16.7112 12.2525 16.7112H16.7475C17.3517 16.7112 17.835 16.2279 17.835 15.6237C17.835 15.0196 17.3517 14.5362 16.7475 14.5362Z" fill="##FFF" />
          </svg>
        </button>
      </div>
      <div className={`sort__popup ${openPop === true ? 'sort__popup__active' : ''}`}>
        <h3 className="sort-head">
          Фильтр
        </h3>
        <div className="input-block">
          <label className='sort-label' htmlFor="price">Цена</label>
          <input type="text" name='price' value={pricing} onChange={(e) => setPricing(e.target.value)} className="input input__price" />
        </div>
        <div className="input-block">
          <label className="sort-label" htmlFor="price">Размеры</label>
          <ul className="sort-items sort-items__sizes">
            {
              sizings.map((sizings, index) => (
              <li key={index} className={`sort-item ${selectedSizes.includes(sizings) ? 'sort-item__active' : ''}`} onClick={() => handleSelectSize(sizings)}>
                {sizings}
              </li>
            ))
            }
          </ul>
        </div>
        <div className="input-block">
          <label className="sort-label" htmlFor="price">Категория</label>
          <ul className="sort-items sort-items__brand">
            {branding.map((brand) => (
              <li key={brand?.idbrand} className={`sort-item ${selectedBranding.includes(brand?.idbrand) ? 'sort-item__active' : ''}`} onClick={() => handleSelectBrand(brand?.idbrand)}>
                {brand?.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="input-block">
          <label className="sort-label" htmlFor="price">Бренд</label>
          <ul className="sort-items sort-items__brand">
            {companies.map((company) => (
              <li key={company.idcompany} className={`sort-item ${selectedCompany.includes(company.idcompany) ? 'sort-item__active' : ''}`} onClick={() => handleSelectCompany(company.idcompany)}>
                {company.name}
              </li>
            ))}
          </ul>
        </div>
        <button className='btn btn-agree' onClick={(e)=> handleChangeSorting(e)}>Применить</button>
      </div>
    </div >
  );
};

export default Sorting;

