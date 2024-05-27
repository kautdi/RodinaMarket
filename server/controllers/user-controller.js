require('dotenv').config();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


class UserController {
    async registration(req, res) {
        try {
            const { email, password } = req.body;
            const validEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
            if (validEmail.rows.length > 0) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            console.log(password)
            const hashPassword = await bcrypt.hash(password, 10);
            const token = uuidv4();
            const newUser = await db.query(
                `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
                [email, hashPassword]
            );
            console.log('JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET);
            console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);
    

            const accessToken = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
            const refreshToken = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });


            console.log("iduser", newUser.rows[0]);
            // Insert the access and refresh tokens into userstoken table
            const newUserToken = await db.query(
                `INSERT INTO userstoken (iduser, access, refresh) VALUES ($1, $2, $3) RETURNING *`,
                [newUser.rows[0].iduser, accessToken, refreshToken]
            );
    
            console.log(accessToken);
            console.log(password)
            return res.json({ iduser: newUser.rows[0].iduser,email:newUser.rows[0].email, accessToken, refreshToken });
            
        } catch (error) {
            // Handle errors appropriately (log, send error response, etc.)
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const validEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
            console.log(password)
            if (validEmail.rows.length > 0) {
                const isPassEquals = await bcrypt.compare(password, validEmail.rows[0].password);
                console.log(isPassEquals)
    
                if (!isPassEquals) {
                    return res.status(400).json({ error: 'Wrong password' });
                }
    
                const accessToken = jwt.sign({ userId: validEmail.rows[0].id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ userId: validEmail.rows[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    
                const newUserToken = await db.query(
                    `UPDATE userstoken SET access = $2, refresh = $3 WHERE iduser = $1 RETURNING *`,
                    [validEmail.rows[0].iduser, accessToken, refreshToken]
                );
                
    
                if (!newUserToken.rows || newUserToken.rows.length === 0) {
                    return res.status(500).json({ error: 'Token insertion failed' });
                }
    
                return res.json({ iduser: validEmail.rows[0].iduser,email: validEmail.rows[0].email, accessToken, refreshToken });
            } else {
                return res.status(400).json({ error: 'User with this email does not exist' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async refresh(req, res, next) {
        try {
            const { idUser, refreshToken } = req.body;
    
            // Проверяем, существует ли пользователь с данным id
            const userToken = await db.query(`SELECT * FROM userstoken WHERE iduser = $1`, [idUser]);
            if (userToken.rows.length === 0) {
                return res.status(404).json({ error: 'User token not found' });
            }
    
            // Проверяем, соответствует ли переданный accessToken тому, который есть в базе данных
            if (userToken.rows[0].refresh !== refreshToken) {
                return res.status(401).json({ error: 'Invalid access token' });
            }
    
            // Создаем новый accessToken и refreshToken
            const newAccessToken = jwt.sign({ userId: idUser }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
            const newRefreshToken = jwt.sign({ userId: idUser }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    
            // Обновляем токены в базе данных
            const updatedUserToken = await db.query(
                `UPDATE userstoken SET access = $2, refresh = $3 WHERE iduser = $1 RETURNING *`,
                [idUser, newAccessToken, newRefreshToken]
            );
    
            if (!updatedUserToken.rows || updatedUserToken.rows.length === 0) {
                return res.status(500).json({ error: 'Token update failed' });
            }
    
            return res.json({iduser: idUser, accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getOneUser(req, res) {
        try {
            const { iduser } = req.body;
            const user = await db.query(`SELECT iduser, firstname, lastname, email,country,city,street, home FROM users WHERE iduser = $1`, [iduser]);
            res.json(user.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async updateUserInfo(req, res, next) {
        const { iduser, firstname, lastname, email, password } = req.body;

        try {
            let hashPassword = null; // Инициализируем хэш пароля значением null
        
            // Проверяем, был ли передан новый пароль
            if (password !== "") {
                // Если пароль не пустой, хешируем его
                hashPassword = await bcrypt.hash(password, 10);
            }
        
            // Формируем SQL-запрос с учетом пустого пароля
            const query = `
                UPDATE users 
                SET firstname = $2, lastname = $3, email = $4 
                ${password !== "" ? ', password = $5' : ''} 
                WHERE iduser = $1 
                RETURNING *
            `;
        
            // Формируем массив параметров запроса с учетом пустого пароля
            const queryParams = password !== "" ? [iduser, firstname, lastname, email, hashPassword] : [iduser, firstname, lastname, email];
        
            // Обновляем информацию о пользователе
            const updatedUser = await db.query(query, queryParams);
        
            // Проверяем, была ли успешно выполнена операция обновления
            if (!updatedUser.rows || updatedUser.rows.length === 0) {
                return res.status(404).json({ error: 'Пользователь не найден или обновление не удалось' });
            }
        
            // Генерируем новые токены
            const accessToken = jwt.sign({ userId: updatedUser.rows[0].id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
            const refreshToken = jwt.sign({ userId: updatedUser.rows[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });
        
            // Обновляем токены в таблице userstoken
            const updateToken = await db.query(
                `UPDATE userstoken SET access = $2, refresh = $3 WHERE iduser = $1 RETURNING *`,
                [updatedUser.rows[0].iduser, accessToken, refreshToken]
            );
        
            // Проверяем, была ли успешно выполнена операция обновления токенов
            if (!updateToken.rows || updateToken.rows.length === 0) {
                return res.status(404).json({ error: 'Обновление токена не удалось' });
            }
        
            // Возвращаем обновленного пользователя
            res.json(updatedUser.rows[0]);
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async updateDeliveryInfo(req, res, next) {
        const { iduser, country, city, street, home } = req.body;
        try {
            // Обновляем информацию о доставке пользователя
            const updatedUser = await db.query(
                `UPDATE users SET country = $2, city = $3, street = $4, home = $5 WHERE iduser = $1 RETURNING *`,
                [iduser, country, city, street, home]
            );
            return res.json(updatedUser.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}

module.exports = new UserController();
