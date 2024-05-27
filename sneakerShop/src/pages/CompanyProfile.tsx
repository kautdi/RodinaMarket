import { FC, useEffect, useState} from 'react';
import { selectAuth } from "../redux/auth/selectors";
import { useSelector } from 'react-redux';
import CompanyService from '../service/CompanyService';
import { ICompany } from '../models/ICompany';

const CompanyProfile: FC = () => {
    const { idcompany } = useSelector(selectAuth)
    const [company, setCompany] = useState<ICompany>();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function updateInfo(){
      await CompanyService.updateCompanyInfo(idcompany, name, description, email, password);
    }

    async function Logout(){
      localStorage.removeItem("accessToken")
      localStorage.removeItem("iduser")
      localStorage.removeItem("role")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("idcompany")
      window.location.reload()
  }
    useEffect(() => {
        async function fetchData() {
            const companyData = await CompanyService.getOnecompany(idcompany);
            setCompany(companyData.data)
            setEmail(companyData.data?.email || "");
            setName(companyData.data?.name || "");
            setDescription(companyData.data?.description || "");
        }
        fetchData();
    },[])
    
    return (
      <div className="company-profile">
        <div className="profile">
        <div className="user-info profile__user-info">
          <div className="inputBlock inputBlock__edit ">
            <p>Название:</p>
            <input type="email" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название организации"/>
            
          </div>
          
          <div className="inputBlock inputBlock__edit ">
          <p>Почта:</p>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.ru"/>
           
          </div>
          <div className="inputBlock inputBlock__edit ">
          <p>Пароль:</p>
            <input type="email" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="*******" />
           
          </div>
        </div>
        <button className="button button--submit" onClick={updateInfo}>Сохранить</button>
        <li className="navbar-link company-navbar__navbar-signout " onClick={Logout}>
                    <p className="link-name">Выход</p>
                    <i className="link-icon">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_10_8469)">
                                <path d="M9.81738 20.706H4.0885C2.53159 20.706 1.26835 19.4381 1.26835 17.8858V4.07874C1.26835 2.52182 2.53625 1.25858 4.0885 1.25858H9.91061C10.2602 1.25858 10.5399 0.978896 10.5399 0.629291C10.5399 0.279685 10.2602 0 9.91061 0H4.0885C1.83704 0 0.00976562 1.83193 0.00976562 4.07874V17.8858C0.00976562 20.1373 1.8417 21.9646 4.0885 21.9646H9.81738C10.167 21.9646 10.4467 21.6849 10.4467 21.3353C10.4467 20.9857 10.1623 20.706 9.81738 20.706Z" fill="black" />
                                <path d="M20.1845 10.5394L16.1851 6.53991C15.938 6.29285 15.5418 6.29285 15.2947 6.53991C15.0477 6.78696 15.0477 7.18318 15.2947 7.43024L18.2221 10.3576H5.45449C5.10488 10.3576 4.8252 10.6373 4.8252 10.9869C4.8252 11.3365 5.10488 11.6162 5.45449 11.6162H18.2221L15.2947 14.5436C15.0477 14.7906 15.0477 15.1868 15.2947 15.4339C15.4159 15.5551 15.5791 15.6203 15.7376 15.6203C15.896 15.6203 16.0592 15.5597 16.1804 15.4339L20.1799 11.4344C20.4316 11.1827 20.4316 10.7818 20.1845 10.5394Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_10_8469">
                                    <rect width="21" height="22" fill="black" />
                                </clipPath>
                            </defs>
                        </svg>

                    </i>
                </li>
      </div>
      </div>
    );
}

export default CompanyProfile

