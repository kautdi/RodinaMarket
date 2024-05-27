import { FC } from 'react';
import { ISneaker } from '../../models/ISneaker';

export interface IHistoryItem {
    brand_name: string;
    color_name: string;
    company_name: string;
    idtovar: number;
    order_status: string;
    size_value: number;
    tovar_description: string;
    tovar_img: string;
    tovar_name: string;
    tovar_price: string;
  }
const HistoryItem: FC<IHistoryItem> = ({
    brand_name,
    color_name,
    company_name,
    idtovar,
    order_status,
    size_value,
    tovar_description,
    tovar_img,
    tovar_name,
    tovar_price,
  }) => {
    return (
      <div className="pizza-block pizza-block__history">
        <img className="pizza-block__image" src={`http://127.0.0.1:5050/images/${tovar_img}`} alt={tovar_name} />
        <h4 className="pizza-block__title">{tovar_name}</h4>
        <div className="pizza-block__selector">
          <ul>
            <li className="pizza-block__content-main">Размер</li>
            <li className="active">{size_value}</li>
          </ul>
          <ul>
            <li className="pizza-block__content-main">Цвет</li>
            <li className="active">{color_name}</li>
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__content-main">Статус</div>
          <div className="pizza-block__content-price">{order_status} </div>
        </div>
      </div>
    );
  };
  

export default HistoryItem

