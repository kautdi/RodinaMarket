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
import ModalCompany from '../Company/ModalCompany';



const ComapaniesManager: FC = () => {
    const [compamies, setCompanies] = useState<ICompany[]>([])
    const [name, setName] = useState<string>("")
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [selectedCompany, setSelectedCompany] = useState<string>("")

    async function handleModal(id: number){
        setActiveModal(!activeModal)
        setSelectedCompany(id.toString())
    }
    async function closeModal(){
        setActiveModal(!activeModal)
        setSelectedCompany("")
    }
    useEffect(() => {
        async function getAllCompanies() {
            const res = await CompanyService.getAllCompanies(name);
            setCompanies(res.data)
        }
        getAllCompanies()

    if (activeModal === false) {
        setSelectedCompany("")
    }
    }, [name, activeModal]);

    return (
        <div className="zakazs">
            <div className="sortingblock">
                <div className={styles.root}>
                    <svg
                        className={styles.icon}
                        enableBackground="new 0 0 32 32"
                        id="EditableLine"
                        version="1.1"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="14"
                            cy="14"
                            fill="none"
                            id="XMLID_42_"
                            r="9"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                        <line
                            fill="none"
                            id="XMLID_44_"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                            x1="27"
                            x2="20.366"
                            y1="27"
                            y2="20.366"
                        />
                    </svg>
                    <input
                        value={name}
                        className={styles.input}
                        placeholder="Имя..."
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>
            </div>
            <div className="content__items">
                {
                    compamies.map((company) => (
                        <div key={company.idcompany} className="company-item">
                            <h3>{company.name}</h3>
                            <p>{company.description}</p>
                            <div className={`button button--outline button--add `} onClick={() => handleModal(company.idcompany)}>
                                <span>Изменить</span>
                                
                            </div>
                        </div>
                    ))
                }
                <ModalCompany active={activeModal} setActive={setActiveModal} idCompany={selectedCompany} />
            </div>
        </div>
    );
}

export default ComapaniesManager

