import React, { FC, useEffect, useState } from 'react';
import CompanyService from '../../service/CompanyService';

interface ModalCompanyProps {
    active: boolean;
    setActive: (active: boolean) => void;
    idCompany: string;


}

const ModalCompany: FC<ModalCompanyProps> = ({ active, setActive, idCompany}) => {
    const [selectedName, setSelectedName] = useState<string>("")  ;
    const [selectedDesc, setSelectedDesc] = useState<string>("")  ;
    const [selectedEmail, setSelectedEmail] = useState<string>("")  ;
    const [selectedPassword, setSelectedPassword] = useState<string>("")  ;


    console.log(idCompany)
    async function updateInfo(){
        await CompanyService.updateCompanyInfo(parseInt(idCompany), selectedName, selectedDesc, selectedEmail, selectedPassword);
        window.location.reload();
      }
  
      
      useEffect(() => {
          async function fetchData() {
              const companyData = await CompanyService.getOnecompany(parseInt(idCompany));
              setSelectedEmail(companyData.data?.email || "");
              setSelectedName(companyData.data?.name || "");
              setSelectedDesc(companyData.data?.description || "");
          }
          fetchData();
      },[active])
    return (
        <div className={`modal modal--edit ${active ? 'modal__active' : ""}`}  >
            <div className="modal-body modal-body__company">
                <div className="modal-top">
                    <h3 className="modal__title">
                        Изменение компании
                    </h3>
                    <p className="close-modal" onClick={()=> setActive(!active)}>
                        x
                    </p>
                </div>
                <div className="content modal__content conten__company" >
                <div className="company-profile">
        <div className="profile profile__modal">

        <div className="user-info profile__user-info">
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="name" id="name" value={selectedName}  onChange={(e)=> setSelectedName(e.target.value)} placeholder="Название организации"/>
           
          </div>
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="email"  id="email" value={selectedDesc}  onChange={(e)=> setSelectedDesc(e.target.value)} placeholder="Описание"/>
            
          </div>
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="email" id="email" value={selectedEmail}  onChange={(e)=> setSelectedEmail(e.target.value)} placeholder="example@example.ru"/>

          </div>
          <div className="inputBlock inputBlock__edit ">
            <input type="email" name="password"  id="password" placeholder="*******" />
           
          </div>
        </div>
        <button className="button button--submit" onClick={updateInfo}>Сохранить</button>
       
      </div>
      </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCompany;