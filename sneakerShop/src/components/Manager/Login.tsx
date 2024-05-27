import { FC, useEffect, useState } from 'react';


const ManagerLogin: FC= () => {
    const [password, setPassword] = useState<string>("")
   
    async function handleAuth(e:any){
        e.preventDefault()
        if(password === "manager"){
            localStorage.setItem("cabinet", password)
            window.location.href = '/admin/zakazs'
        }
        else {
            setPassword("Ошибка авторизации. Неправильный пароль")
        }
    }
    return (
        <div className="auth-form  auth-form__manager">
        <form action="">
            <h2 className="content__title">Админ Авторизация</h2>
            <div className="inputBlock auth-form__inputBlock">
                <label htmlFor="password">Пароль</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder={password}/>
            </div>
            <button className="button button--submit" onClick={(e) => handleAuth(e)}>Войти</button>
        </form>
    </div>
    );
}

export default ManagerLogin

