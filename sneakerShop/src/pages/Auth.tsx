import { FC, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { companyLogin, companyRegistration, userLogin, userRegistration } from "../redux/auth/asyncAction";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";

export const Auth: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repassword, setRePassword] = useState<string>("")
    const [role, setRole] = useState("Клиент");
    const [authType, setAuthType] = useState("Авторизация");
    const dispatch = useAppDispatch();
    const {isAuth} = useSelector(selectAuth)

    const handleRoleChange = (newRole: string) => {
        setRole(newRole);
    };

    const handleAuthTypeChange = (newAuthType: string) => {
        setAuthType(newAuthType);
    };

    async function handleAuth(e:any) {
        e.preventDefault();

            const authActions: Record<string, Record<string, any>> = {
                "Клиент": {
                    "Авторизация": userLogin,
                    "Регистрация": userRegistration
                },
                "Компания": {
                    "Авторизация": companyLogin,
                    "Регистрация": companyRegistration
                }
            };
        
            const actionCreator = authActions[role as keyof typeof authActions][authType as keyof typeof authActions[typeof role]];
            if (actionCreator) {
                dispatch(actionCreator({ email, password }));
            }
            localStorage.removeItem('cabinet');
            
    }

    return (
        <div className="auth" >
            <div className="auth-choice">
                <div className="choiceRoleBlock auth-choice__choiceRoleBlock">
                    <div className="choice choiceRoleBlock-choice">
                        {["Клиент", "Компания"].map((r) => (
                            <button
                                key={r}
                                className={`button button--choice ${role === r ? 'button--choice__active' : ''}`}
                                onClick={() => handleRoleChange(r)}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="choice choiceRoleBlock-choice">
                        {["Авторизация", "Регистрация"].map((a) => (
                            <button
                                key={a}
                                className={`button button--choice ${authType === a ? 'button--choice__active' : ''}`}
                                onClick={() => handleAuthTypeChange(a)}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="auth-form">
                    <form action="">
                        <h2 className="content__title">{authType}/{role}</h2>
                        <div className="inputBlock auth-form__inputBlock">
                            <label htmlFor="email">Почта</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="example@example.com"/>
                        </div>
                        <div className="inputBlock auth-form__inputBlock">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="password"/>
                        </div>
                        {
                            authType === "Регистрация" ? (
                            <div className="inputBlock auth-form__inputBlock">
                            <label htmlFor="repassword">Повторите пароль</label>
                            <input type="password" name="repassword" value={repassword} onChange={(e)=>setRePassword(e.target.value)} id="repassword" placeholder="password"/>
                            </div>
                            )
                            : null
                        }
                        
                        <button className="button button--submit" onClick={(e) => handleAuth(e)}>{authType === "Регистрация" ? "Регистрация" : "Войти"}</button>
                    </form>
                </div>
            </div>
            <div className="companydescription">
                <h2 className="content__main companydescription__content__main">Что такое SneakerShop?</h2>
                <p className="content__desc companydescription__content__desc">Lorem ipsum dolor sit amet consectetur. Pellentesque accumsan risus tincidunt habitant non dis pellentesque ornare. Fusce augue id eu urna phasellus duis vitae. Tortor pretium porttitor amet sem posuere duis. Sed ut arcu auctor non. Tellus tincidunt vulputate suspendisse at at euismod volutpat vestibulum eget. Condimentum orci lacinia id suspendisse magna nunc sed convallis. Enim dolor cras erat id lorem eu nec semper. Tortor purus nec ac arcu bibendum. Eget consequat dolor dui luctus suscipit elementum turpis. Hac orci purus in vitae. Eu aliquam commodo potenti phasellus. Mollis facilisis diam leo tellus eget. Ornare eleifend sapien semper tristique tellus.</p>
            </div>
        </div>
    );
};