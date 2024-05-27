import { FC, useEffect, useState } from 'react';
import SortingBlock from '../Company/Sorting';
import { TovarItem } from '../Company/TovarsItem';
import { useDispatch, useSelector } from 'react-redux';
import { ISneaker } from '../../models/ISneaker';
import { selectCompanyFilter } from '../../redux/companyfilter/selectors';
import TovarsService from '../../service/TovarsService';
import SortingManager from './Sorting';
import styles from './Selected.module.scss';
import { Search } from '../Company/Sorting/Search';
import { SelectedBrand } from '../Company/Sorting/Selected';
import { AddBtn } from '../Company/Sorting/AddBtn';
import { ICompany } from '../../models/ICompany';
import CompanyService from '../../service/CompanyService';


const TovarsBlock: FC = () => {
    const [sneakers, setSneakers] = useState<ISneaker[]>([])
    const dispatch = useDispatch();
    const { search, brands } = useSelector(selectCompanyFilter);
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [selectedCompany, setCompany] = useState<number>(-1)


    useEffect(() => {
        async function getSneakers() {
            const brandsArray = [];
            brandsArray.push(brands)
            console.log(brandsArray)
            const response = await TovarsService.getSneakers([], brandsArray, [selectedCompany], [], search, 0);
            setSneakers(response.data)
        }
        async function getComp(){
            const res = await CompanyService.getAllCompanies(search);
            setCompanies(res.data);
        }
        getComp();
        getSneakers();
    }, [search, brands, selectedCompany]);

    return (
        <div className="zakazs">
            <div className="sortingblock">
                <Search />
                <SelectedBrand />
                <select className={styles.selectedBrand} onChange={(e) => setCompany(parseInt(e.target.value))}>
                    <option value="-1">Все</option>
                    {
                        companies.map((company) =>(
                            <option value={`${company.idcompany}`}>{company.name}</option>
                        ))
                    }
                    
                    
                </select>
            </div>
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
        </div>
    );
}

export default TovarsBlock

