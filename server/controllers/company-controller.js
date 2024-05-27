require('dotenv').config();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


class CompanyController {
    async registration(req, res) {
        try {
            const { email, password } = req.body;
    
            // Email validation using a simple regex
            const validEmail = await db.query(`SELECT * FROM company WHERE email = $1`, [email]);
            if (validEmail.rows.length > 0) {
                return res.status(400).json({ error: 'Comapny with this email already exists' });
            }
    
            const hashPassword = await bcrypt.hash(password, 10);
            const token = uuidv4();
            const newCompany = await db.query(
                `INSERT INTO company (email, password) VALUES ($1, $2) RETURNING *`,
                [email, hashPassword]
            );
    
            console.log('JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET);
            console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);
    

            const accessToken = jwt.sign({ companyId: newCompany.rows[0].id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
            const refreshToken = jwt.sign({ companyId: newCompany.rows[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });


            console.log("idcompany", newCompany.rows[0]);

            const newCompanyToken = await db.query(
                `INSERT INTO companytoken (idcompany, access, refresh) VALUES ($1, $2, $3) RETURNING *`,
                [newCompany.rows[0].idcompany, accessToken, refreshToken]
            );
    
            console.log(accessToken);
            return res.json({ idcompany: newCompany.rows[0].idcompany,email:newCompany.rows[0].email, accessToken, refreshToken });
        } catch (error) {
            // Handle errors appropriately (log, send error response, etc.)
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const validEmail = await db.query(`SELECT * FROM company WHERE email = $1`, [email]);
    
            if (validEmail.rows.length > 0) {
                const isPassEquals = await bcrypt.compare(password, validEmail.rows[0].password);
    
                if (!isPassEquals) {
                    return res.status(400).json({ error: 'Wrong password' });
                }
    
                const accessToken = jwt.sign({ companyId: validEmail.rows[0].id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ companyId: validEmail.rows[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    
                const newCompanyToken = await db.query(
                    `UPDATE companytoken SET access = $2, refresh = $3 WHERE idcompany = $1 RETURNING *`,
                    [validEmail.rows[0].idcompany, accessToken, refreshToken]
                );
                
    
                if (!newCompanyToken.rows || newCompanyToken.rows.length === 0) {
                    return res.status(500).json({ error: 'Token insertion failed' });
                }
    
                return res.json({ idcompany: validEmail.rows[0].idcompany,email: validEmail.rows[0].email, accessToken, refreshToken });
            } else {
                return res.status(400).json({ error: 'Company with this email does not exist' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async refresh(req, res, next) {
        try {
            const { idcompany, refreshToken } = req.body;
    
            // Проверяем, существует ли пользователь с данным id
            const companyToken = await db.query(`SELECT * FROM companytoken WHERE idcompany = $1`, [idcompany]);
            if (companyToken.rows.length === 0) {
                return res.status(404).json({ error: 'Comapny token not found' });
            }
    
            // Проверяем, соответствует ли переданный accessToken тому, который есть в базе данных
            if (companyToken.rows[0].refresh !== refreshToken) {
                return res.status(401).json({ error: 'Invalid access token' });
            }
    
            // Создаем новый accessToken и refreshToken
            const newAccessToken = jwt.sign({ companyId: idcompany }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
            const newRefreshToken = jwt.sign({ companyId: idcompany }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    
            // Обновляем токены в базе данных
            const updatedCompanyToken = await db.query(
                `UPDATE companytoken SET access = $2, refresh = $3 WHERE idcompany = $1 RETURNING *`,
                [idcompany, newAccessToken, newRefreshToken]
            );
    
            if (!updatedCompanyToken.rows || updatedCompanyToken.rows.length === 0) {
                return res.status(500).json({ error: 'Token update failed' });
            }
    
            return res.json({idcompany: idcompany, accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getOneCompany(req, res) {
        try {
            const { idcompany } = req.body;
            const company = await db.query(`SELECT idcompany, name, description, email FROM company WHERE idcompany = $1`, [idcompany]);
            res.json(company.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async updateCompanyInfo(req, res, next) {
        const { idCompany, name, description, email, password } = req.body;
    
        try {
            let hashPassword = null;
    
            // Проверяем, был ли передан новый пароль
            if (password !== "") {
                // Если пароль не пустой, хешируем его
                hashPassword = await bcrypt.hash(password, 10);
            }
    
            // Обновляем информацию о компании
            const query = `
                UPDATE company 
                SET name = $2, description = $3, email = $4 
                ${password !== "" ? ', password = $5' : ''} 
                WHERE idCompany = $1 
                RETURNING *
            `;
    
            // Формируем массив параметров запроса с учетом пустого пароля
            const queryParams = password !== "" ? [idCompany, name, description, email, hashPassword] : [idCompany, name, description, email];
    
            // Обновляем информацию о компании
            const updatedCompany = await db.query(query, queryParams);
    
            // Проверяем, была ли успешно выполнена операция обновления
            if (!updatedCompany.rows || updatedCompany.rows.length === 0) {
                return res.status(404).json({ error: 'Компания не найдена или обновление не удалось' });
            }
    
            // Генерируем новые токены
            const accessToken = jwt.sign({ companyId: updatedCompany.rows[0].idCompany }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
            const refreshToken = jwt.sign({ companyId: updatedCompany.rows[0].idCompany }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });
    
            // Обновляем токены в таблице CompanyToken
            const updateToken = await db.query(
                `UPDATE CompanyToken SET access = $2, refresh = $3 WHERE idCompany = $1 RETURNING *`,
                [updatedCompany.rows[0].idCompany, accessToken, refreshToken]
            );
    
            // Проверяем, была ли успешно выполнена операция обновления токенов
            if (!updateToken.rows || updateToken.rows.length === 0) {
                return res.status(404).json({ error: 'Обновление токена не удалось' });
            }
    
            // Возвращаем обновленную компанию
            res.json(updatedCompany.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
    async  getTovarsByCompanyId(req, res, next) {
        try {
            const { idcompany } = req.query;
    
            // Проверяем, был ли передан корректный идентификатор компании
            if (!idcompany) {
                return res.status(400).json({ error: 'Необходимо указать идентификатор компании' });
            }
    
            let query = `
                SELECT 
                    Tovars.idtovar AS idtovar,
                    Tovars.name AS tovar_name,
                    Tovars.description AS tovar_description,
                    Tovars.img AS tovar_img,
                    Tovars.price AS tovar_price,
                    company.name AS company_name,
                    brands.name AS brand_name,
                    colors.color AS color_name,
                    sizes.size AS size_value
                FROM 
                    Tovars
                JOIN 
                    company ON Tovars.idCompany = company.idCompany
                JOIN 
                    brands ON Tovars.idBrand = brands.idBrand
                JOIN 
                    TovarsZakaz ON Tovars.idtovar = TovarsZakaz.idTovar
                JOIN 
                    colors ON TovarsZakaz.idColor = colors.idColor
                JOIN 
                    sizes ON TovarsZakaz.idSize = sizes.idSize
                WHERE 
                    Tovars.idCompany = $1
            `;
    
            const tovars = await db.query(query, [idcompany]);
    
            return res.json(tovars.rows);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getZakazCompany(req, res, next) {
        try {
          const { idcompany } = req.query;
      
          // Проверяем, был ли передан корректный идентификатор компании
          if (!idcompany) {
            return res.status(400).json({ error: 'Необходимо указать идентификатор компании' });
          }
      
          let query = `
            SELECT
              z.idzakaz,
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'idtovar', t.idtovar,
                  'tovar_name', t.name,
                  'tovar_description', t.description,
                  'tovar_img', t.img,
                  'tovar_price', t.price,
                  'company_name', c.name,
                  'brand_name', b.name,
                  'color_name', co.color,
                  'size_value', s.size
                )
              ) AS tovars
            FROM
              zakaz z
              JOIN TovarsZakaz tz ON z.idzakaz = tz.idzakaz
              JOIN Tovars t ON tz.idTovar = t.idtovar
              JOIN company c ON t.idCompany = c.idCompany
              JOIN brands b ON t.idBrand = b.idBrand
              JOIN colors co ON tz.idColor = co.idColor
              JOIN sizes s ON tz.idSize = s.idSize
            WHERE
              t.idCompany = $1
            GROUP BY
              z.idzakaz;
          `;
      
          const tovars = await db.query(query, [idcompany]);
          return res.json(tovars.rows);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
    async  getAllCompany(req, res, next) {
        const { name } = req.query;
        try {
            let query = `SELECT idcompany, name, description, email FROM company`;
    
            if (name) {
                query += ` WHERE name ILIKE '%${name}%'`; // Используем ILIKE для поиска по частичному совпадению имени без учёта регистра
            }
    
            const company = await db.query(query);
            res.json(company.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }



}

module.exports = new CompanyController();
