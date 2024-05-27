import { FC, useEffect, useState } from 'react';
import ManagerNavbar from '../components/Manager/ManagerNavbar';
import ComapaniesManager from '../components/Manager/CompaniesManager';

const ManagerCompany: FC = () => {
    

    return (
        <div className="manager-block">
           <ManagerNavbar/>
           <ComapaniesManager/>
        </div>
    );
}
export default ManagerCompany;