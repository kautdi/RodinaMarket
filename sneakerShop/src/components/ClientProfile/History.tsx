import { FC, useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import UserService from '../../service/UserService';
import { IHistory } from '../../models/IHistory';

interface HistoryProps {
    iduser: number; // Объявляем тип для свойства iduser
}

const History: FC<HistoryProps> = ({iduser}) => {
    const [history, setHistory] = useState<IHistory[]>([]); // Объявляем тип для свойства history
    async function getHistory(){
        const response = await UserService.zakazHistory(iduser);
        setHistory(response.data);
    }
    useEffect(() =>{
        getHistory();
        console.log(history);
    },[]);
    return (
        <div className="history">
        <h2 className="content-title">История заказов</h2>
        <div className="content__items">
            {history && history.length !== 0 ? (
                history.map((item, index) => (
                    <HistoryItem key={index} {...item} />
                ))
            ) : (
                <p className='content__dontHaveHistory'>История покупок пуста</p>
            )}
        </div>
    </div>
    );
}

export default History

