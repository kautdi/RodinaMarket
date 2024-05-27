import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CompanyService from '../service/CompanyService';
import { selectAuth } from '../redux/auth/selectors';
import ZakazService from '../service/ZakazService';
import { CartItem } from '../redux/cart/types';
import { IOrder, ITovar } from '../models/IZakaz';
import ManagerNavbar from '../components/Manager/ManagerNavbar';
import ZakazBlock from '../components/Manager/ZakazBlock';

const ManagerZakazs: FC = () => {
    

    return (
        <div className="manager-block">
           <ManagerNavbar/>
           <ZakazBlock/>
        </div>
    );
}
export default ManagerZakazs;