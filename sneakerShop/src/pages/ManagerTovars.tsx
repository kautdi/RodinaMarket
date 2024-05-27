import { FC, useEffect, useState } from 'react';

import ManagerNavbar from '../components/Manager/ManagerNavbar';
import TovarsBlock from '../components/Manager/TovarsBlock';

const ManagerTovars: FC = () => {
    

    return (
        <div className="manager-block">
           <ManagerNavbar/>
           <TovarsBlock/>
        </div>
    );
}
export default ManagerTovars;