import { FC, useEffect, useState } from 'react';
import ManagerService from '../../service/ManagerService';
import { IOrder, ITovar } from '../../models/IZakaz';
import styles from './Selected.module.scss';
import ZakazService from '../../service/ZakazService';

const ZakazBlock: FC = () => {
    const [items, setItems] = useState<IOrder[]>([]);
    const [date, setDate] = useState<string>("");
    const [idzakaz, setIdzakaz] = useState<string>("")
    const [idcompany, setIdcompany] = useState<string>();
    const [status, setStatus] = useState<string>();

    useEffect(() => {
        async function getAllZakazs() {
            const statusStr = status || "";
            const dateStr = date || "";
            const idCompanyNum = idcompany || 0;

            try {
                const zakazs = await ManagerService.getAllZakaz(dateStr, statusStr, idCompanyNum.toString(), idzakaz);
                const sortedZakazs = zakazs.data.sort((a: any, b: any) => {
                    if (a.status === "Delivery" && b.status !== "Delivery") return -1;
                    if (a.status !== "Delivery" && b.status === "Delivery") return 1;
                    return 0;
                });
                setItems(sortedZakazs);
                console.log(zakazs);
            } catch (error) {
                console.error('Error fetching zakazs:', error);
            }
        }

        getAllZakazs();
    }, [idcompany, date, status, idzakaz]);

    async function deleteZakaz(id: number) {
        const removeZakaz = await ZakazService.deleteZakaz(id);
        console.log(removeZakaz.data);
        window.location.reload();
        window.location.reload();
    }
    async function changeStatus(id: number, status: string) {
        const changeStatus = await ZakazService.changeStatus(id, status);
        console.log(changeStatus.data);
        window.location.reload();
        window.location.reload();
    }
  

    return (
        <div className="zakazs">
            <div className="sort-block">
                <select className={styles.selectedBrand} onChange={(e) => setDate(e.target.value)}>
                    <option value="">Все</option>
                    <option value="day">День</option>
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                </select>
                <select className={styles.selectedBrand} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Все</option>
                    <option value="Delivery">Доставка</option>
                    <option value="Processing">Обработка</option>
                    <option value="Complete">Доставленно</option>
                </select>
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

                        value={idzakaz}
                        className={styles.input}
                        placeholder="Номер заказа"
                        onChange={(e) => setIdzakaz(e.target.value)}
                    />

                </div>
            </div>
            {items.map((item: IOrder) => {
                const total = item.tovars.reduce((sum, tovar) => sum + parseFloat(tovar.tovar_price), 0);
                return (
                    <div key={item.idzakaz} className="zakaz-item">
                        <div className="zakaz-item-head">
                            <div className="item-num">
                                <h3>№{item.idzakaz} <span>Статус:</span> {item.status}</h3>
                            </div>
                            <div className="item-btns">
                                <button className='btn btn-success' onClick={() =>  changeStatus(item.idzakaz, "Complete")}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.625 11.9999L9.87 16.2449L18.375 7.75488" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button className='btn btn-proccess' onClick={() => changeStatus(item.idzakaz, "Proccess")}>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_226_432)">
                                            <path d="M9.49977 0.760048C9.44941 0.759336 9.39942 0.768639 9.35269 0.787416C9.30596 0.806193 9.26343 0.83407 9.22757 0.869427C9.19171 0.904784 9.16323 0.946915 9.1438 0.993373C9.12436 1.03983 9.11435 1.08969 9.11435 1.14005C9.11435 1.19041 9.12436 1.24026 9.1438 1.28672C9.16323 1.33318 9.19171 1.37531 9.22757 1.41067C9.26343 1.44603 9.30596 1.4739 9.35269 1.49268C9.39942 1.51146 9.44941 1.52076 9.49977 1.52005C13.9114 1.52005 17.4798 5.08842 17.4798 9.50005C17.4798 13.9117 13.9114 17.48 9.49977 17.48C5.08814 17.48 1.51977 13.9117 1.51977 9.50005C1.51977 6.95683 2.70944 4.69867 4.55977 3.23747V5.70005C4.55905 5.7504 4.56836 5.8004 4.58713 5.84712C4.60591 5.89385 4.63379 5.93638 4.66914 5.97224C4.7045 6.0081 4.74663 6.03658 4.79309 6.05601C4.83955 6.07545 4.88941 6.08546 4.93977 6.08546C4.99013 6.08546 5.03998 6.07545 5.08644 6.05601C5.1329 6.03658 5.17503 6.0081 5.21039 5.97224C5.24574 5.93638 5.27362 5.89385 5.2924 5.84712C5.31117 5.8004 5.32048 5.7504 5.31977 5.70005V2.48934V1.90005H1.51977C1.46941 1.89934 1.41942 1.90864 1.37269 1.92742C1.32596 1.94619 1.28343 1.97407 1.24757 2.00943C1.21171 2.04478 1.18323 2.08692 1.1638 2.13337C1.14436 2.17983 1.13435 2.22969 1.13435 2.28005C1.13435 2.33041 1.14436 2.38026 1.1638 2.42672C1.18323 2.47318 1.21171 2.51531 1.24757 2.55067C1.28343 2.58603 1.32596 2.6139 1.37269 2.63268C1.41942 2.65146 1.46941 2.66076 1.51977 2.66005H4.06547C2.05256 4.26168 0.759766 6.73068 0.759766 9.50005C0.759766 14.3224 4.67739 18.24 9.49977 18.24C14.3221 18.24 18.2398 14.3224 18.2398 9.50005C18.2398 4.67767 14.3221 0.760048 9.49977 0.760048Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_226_432">
                                                <rect width="19" height="19" fill="black" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </button>
                                <button className='btn btn-delete' onClick={() => deleteZakaz(item.idzakaz)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.9997 6.73046C20.9797 6.73046 20.9497 6.73046 20.9197 6.73046C15.6297 6.20046 10.3497 6.00046 5.11967 6.53046L3.07967 6.73046C2.65967 6.77046 2.28967 6.47046 2.24967 6.05046C2.20967 5.63046 2.50967 5.27046 2.91967 5.23046L4.95967 5.03046C10.2797 4.49046 15.6697 4.70046 21.0697 5.23046C21.4797 5.27046 21.7797 5.64046 21.7397 6.05046C21.7097 6.44046 21.3797 6.73046 20.9997 6.73046Z" fill="black" fillOpacity="0.88" />
                                        <path d="M8.49977 5.72C8.45977 5.72 8.41977 5.72 8.36977 5.71C7.96977 5.64 7.68977 5.25 7.75977 4.85L7.97977 3.54C8.13977 2.58 8.35977 1.25 10.6898 1.25H13.3098C15.6498 1.25 15.8698 2.63 16.0198 3.55L16.2398 4.85C16.3098 5.26 16.0298 5.65 15.6298 5.71C15.2198 5.78 14.8298 5.5 14.7698 5.1L14.5498 3.8C14.4098 2.93 14.3798 2.76 13.3198 2.76H10.6998C9.63977 2.76 9.61977 2.9 9.46977 3.79L9.23977 5.09C9.17977 5.46 8.85977 5.72 8.49977 5.72Z" fill="black" fillOpacity="0.88" />
                                        <path d="M15.2104 22.7496H8.79039C5.30039 22.7496 5.16039 20.8196 5.05039 19.2596L4.40039 9.18959C4.37039 8.77959 4.69039 8.41959 5.10039 8.38959C5.52039 8.36959 5.87039 8.67959 5.90039 9.08959L6.55039 19.1596C6.66039 20.6796 6.70039 21.2496 8.79039 21.2496H15.2104C17.3104 21.2496 17.3504 20.6796 17.4504 19.1596L18.1004 9.08959C18.1304 8.67959 18.4904 8.36959 18.9004 8.38959C19.3104 8.41959 19.6304 8.76959 19.6004 9.18959L18.9504 19.2596C18.8404 20.8196 18.7004 22.7496 15.2104 22.7496Z" fill="black" fillOpacity="0.88" />
                                        <path d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z" fill="white" fillOpacity="0.88" />
                                        <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="white" fillOpacity="0.88" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="zakaz-items">
                            {item.tovars.map((tovar: ITovar, index) => (
                                <div key={tovar.idtovar} className="sneaker-zakaz">
                                    <div className="number">
                                        <span>{index + 1}</span>
                                    </div>
                                    <div className="pic-sneaker">
                                        <img src={`http://127.0.0.1:5050/images/${tovar.tovar_img}`} alt="Кроссовок" />
                                    </div>
                                    <div className="sneker-color">
                                        <div className="sneker-color-value">{tovar.tovar_name}</div>
                                    </div>
                                    <div className="sneker-color">
                                        <div className="sneker-color-value">{tovar.color_name}</div>
                                    </div>
                                    <div className="sneker-size">
                                        <div className="sneker-size-value">{tovar.size_value}</div>
                                    </div>
                                    <div className="sneker-size">
                                        <div className="sneker-size-value">{tovar.tovar_price} руб</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="zakaz-item-footer">
                            <h3>Общая сумма: <span>{total.toFixed(2)} руб.</span></h3>
                            <h3><span>{item.date.slice(0, 10)}</span></h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ZakazBlock;