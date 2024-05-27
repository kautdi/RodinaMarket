import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ITax } from '../../models/ITaxs';
import { calculatePercent } from '../../utils/calcPercent';

export const TaxItem: FC<ITax> = ({idtovar, tovar_name, tovar_description, tovar_img, tovar_price, company_name, brand_name, color_name, size_value }) => {
    const [percent, setPercent] = useState(15);
    const taxAmount = calculatePercent(tovar_price, percent);

    return (
        <div key={idtovar} className="pizza-block pizza-block__tax">
            <img
                className="pizza-block__image"
                src={`http://127.0.0.1:5050/images/${tovar_img}`} 
                alt={tovar_name} 
            />
            <h4 className="pizza-block__title">{tovar_name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    <li className="active">{color_name}</li>
                </ul>
                <ul>
                    <li className="active">{size_value} см.</li>
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{percent}% / {taxAmount} руб</div>
                <div className="button button--outline button--add">
                    <span>Оплатить</span>
                </div>
            </div>
        </div>
    );
}