const db = require('../db');
const fs = require('fs');
const path = require('path');

class TovarsController {
    async getAllTovars(req, res) {
    try {
        const { sizes, brands, idcompanys, colors, name, price } = req.query;
        const filters = [];

        if (sizes) filters.push(`s.size IN (${sizes.split(',').map(size => `'${size}'`).join(', ')})`);
        if (brands) filters.push(`b.idBrand IN (${brands.split(',').map(brand => `'${brand}'`).join(', ')})`);
        if (idcompanys) filters.push(`t.idCompany IN (${idcompanys.split(',').map(company => `'${company}'`).join(', ')})`);
        if (colors) filters.push(`c.color IN (${colors.split(',').map(color => `'${color}'`).join(', ')})`);
        if (name) filters.push(`t.name ILIKE '%${name}%'`);

        let query = `
            SELECT 
                t.idTovar, 
                t.idCompany, 
                json_agg(DISTINCT s.size) AS sizes, 
                t.name, 
                t.description, 
                t.idBrand, 
                t.img, 
                t.price, 
                b.name AS brand_name, 
                json_agg(DISTINCT c.color) AS colors, 
                co.name AS company_name 
            FROM 
                tovars t
            LEFT JOIN 
                TovarsSize ts ON t.idTovar = ts.idTovar
            LEFT JOIN 
                sizes s ON ts.idSize = s.idSize
            LEFT JOIN 
                TovarsColor tc ON t.idTovar = tc.idTovar
            LEFT JOIN 
                colors c ON tc.idColor = c.idColor
            LEFT JOIN 
                brands b ON t.idBrand = b.idBrand
            LEFT JOIN 
                company co ON t.idCompany = co.idCompany
        `;

        if (filters.length > 0) {
            query += ` WHERE ${filters.join(' AND ')}`;
        }

        query += `
            GROUP BY 
                t.idTovar, t.idCompany, t.name, t.description, t.idBrand, t.img, t.price, b.name, co.name
        `;

        if (price) {
            query += ` HAVING t.price >= ${price}`;
        }

        query += ` ORDER BY t.price`;

        const tovars = await db.query(query);
        console.log(query);
        return res.json(tovars.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
    async  getOneTovar(req, res) {
        const { idTovar } = req.body;
        try {
            const tovar = await db.query(`
                SELECT 
                    t.idTovar, 
                    t.idCompany, 
                    t.name, 
                    t.description, 
                    t.idBrand, 
                    t.price,
                    t.img, 
                    json_agg(DISTINCT s.size) AS sizes, 
                    b.name AS brand_name, 
                    json_agg(DISTINCT c.color) AS colors, 
                    co.name AS company_name 
                FROM 
                    tovars t
                LEFT JOIN 
                    TovarsSize ts ON t.idTovar = ts.idTovar
                LEFT JOIN 
                    sizes s ON ts.idSize = s.idSize
                LEFT JOIN 
                    TovarsColor tc ON t.idTovar = tc.idTovar
                LEFT JOIN 
                    colors c ON tc.idColor = c.idColor
                LEFT JOIN 
                    brands b ON t.idBrand = b.idBrand
                LEFT JOIN 
                    company co ON t.idCompany = co.idCompany
                WHERE 
                    t.idTovar = $1
                GROUP BY 
                    t.idTovar, t.idCompany, t.name, t.description, t.idBrand, t.img, b.name, co.name;
            `, [idTovar]);
            console.log(tovar)
            
            if (tovar.rows.length === 0) {
                return res.status(404).json({ error: 'Tovar not found' });
            }
            
            return res.json(tovar.rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getOneCompanyTovar(req,res){
        const { idCompany } = req.body;
        try {
            const tovar = await db.query(`
                SELECT 
                    t.idTovar, 
                    t.idCompany, 
                    t.name, 
                    t.description, 
                    t.idBrand, 
                    t.img, 
                    t.price,
                    json_agg(DISTINCT s.size) AS sizes, 
                    b.name AS brand_name, 
                    json_agg(DISTINCT c.color) AS colors, 
                    co.name AS company_name 
                FROM 
                    tovars t
                LEFT JOIN 
                    TovarsSize ts ON t.idTovar = ts.idTovar
                LEFT JOIN 
                    sizes s ON ts.idSize = s.idSize
                LEFT JOIN 
                    TovarsColor tc ON t.idTovar = tc.idTovar
                LEFT JOIN 
                    colors c ON tc.idColor = c.idColor
                LEFT JOIN 
                    brands b ON t.idBrand = b.idBrand
                LEFT JOIN 
                    company co ON t.idCompany = co.idCompany
                WHERE 
                    t.idCompany = $1
                GROUP BY 
                    t.idTovar, t.idCompany, t.name, t.description, t.idBrand, t.img, b.name, co.name;
            `, [idCompany]);
            console.log(tovar)
            
            if (tovar.rows.length === 0) {
                return res.status(404).json({ error: 'Tovar not found' });
            }
            
            return res.json(tovar.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getAllSize(req, res) {
        try {
            const sizes = await db.query(`
                SELECT 
                    s.idSize, 
                    s.size
                FROM 
                    sizes s;
            `);
            console.log(sizes)
            
            if (sizes.rows.length === 0) {
                return res.status(404).json({ error: 'Size not found' });
            }
            
            return res.json(sizes.rows);
        }
        catch{
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getAllColor(req, res) {
        try {
            const colors = await db.query(`
                SELECT 
                    c.idColor, 
                    c.color
                FROM 
                    colors c;
            `);
            console.log(colors)
            
            if (colors.rows.length === 0) {
                return res.status(404).json({ error: 'Color not found' });
            }
            
            return res.json(colors.rows);
        }
        catch{
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getAllBrands(req, res) {
        try {
            const brands = await db.query(`
                SELECT 
                    b.idBrand, 
                    b.name,
                    b.img
                FROM 
                    brands b;
            `);
            console.log(brands)
            
            if (brands.rows.length === 0) {
                return res.status(404).json({ error: 'Brand not found' });
            }
            
            return res.json(brands.rows);
        }
        catch(error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  createTovar(req, res) {
        const { idCompany, name, description, brandName, img, price, color, sizes } = req.body;
    
        try {
            let brandId;
            const brandQuery = `
                SELECT idBrand FROM brands
                WHERE name = $1`;
            const brandResult = await db.query(brandQuery, [brandName]);
            // console.log(brandResult.rows[0].idbrand)
            if (brandResult.rows.length > 0) {
                brandId = brandResult.rows[0].idBrand;
               
            } else {
                // console.log(brandId)
                const newBrandQuery = `
                    INSERT INTO brands (name)
                    VALUES ($1)
                    RETURNING idbrand`;
                const newBrandValues = [brandName];
                const newBrandResult = await db.query(newBrandQuery, newBrandValues);
                // brandId = newBrandResult.rows[0].idbrand;
                console.log(newBrandQuery)
                console.log(newBrandResult.rows[0].idbrand)
                brandId = newBrandResult.rows[0].idbrand;
            }
            
    
            
            const newTovarQuery = `
                INSERT INTO tovars (idCompany, name, description, img, idbrand, price)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING idTovar`;
            const newTovarValues = [idCompany, name, description, img, brandId, price];
            const newTovarResult = await db.query(newTovarQuery, newTovarValues);
            const newTovarId = newTovarResult.rows[0].idtovar;
            console.log(sizes)
            
            for (const size of sizes) {
                const newSizeQuery = `
                    INSERT INTO tovarssize (idtovar, idsize)
                    VALUES ($1, $2)`;
                const newSizeValues = [newTovarId, size];
                await db.query(newSizeQuery, newSizeValues);
            }
    
            
            for (const clr of color) {
                const newColorQuery = `
                    INSERT INTO TovarsColor (idTovar, idColor)
                    VALUES ($1, $2)`;
                const newColorValues = [newTovarId, clr];
                await db.query(newColorQuery, newColorValues);
            }
    
            res.status(200).json({ message: 'Tovar created successfully', idTovar: newTovarId });
        } catch (error) {
            console.error(error);
            // res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async updateTovars(req, res) {
        const { idTovar, idCompany, name, description, brandName, img, price, color, sizes } = req.body;
    
        try {
            let brandId;
            // Check if brand exists
            const brandQuery = `
                SELECT idBrand FROM brands
                WHERE name = $1`;
            const brandResult = await db.query(brandQuery, [brandName]);
            if (brandResult.rows.length > 0) {
                brandId = brandResult.rows[0].idbrand;
            } else {
                // If brand doesn't exist, insert it
                const newBrandQuery = `
                    INSERT INTO brands (name)
                    VALUES ($1)
                    RETURNING idbrand`;
                const newBrandValues = [brandName];
                const newBrandResult = await db.query(newBrandQuery, newBrandValues);
                brandId = newBrandResult.rows[0].idBrand;
            }
    
            
            let updateTovarQuery;
            let updateTovarValues;
            if (img !== "undefined") {
                updateTovarQuery = `
                    UPDATE tovars
                    SET  name = $1, description = $2, img = $3, idBrand = $4, price = $5
                    WHERE idTovar = $6`;
                updateTovarValues = [ name, description, img, brandId, price, idTovar];
            } else {
                updateTovarQuery = `
                    UPDATE tovars
                    SET  name = $1, description = $2, idBrand = $3, price = $4
                    WHERE idTovar = $5`;
                updateTovarValues = [ name, description, brandId, price, idTovar];
            }
    
            // Update tovars table
            await db.query(updateTovarQuery, updateTovarValues);
    
            // Update TovarsSize table
            const deleteSizeQuery = `
                DELETE FROM TovarsSize
                WHERE idTovar = $1`;
            await db.query(deleteSizeQuery, [idTovar]);
            for (const size of sizes) {
                const newSizeQuery = `
                    INSERT INTO TovarsSize (idTovar, idSize)
                    VALUES ($1, $2)`;
                const newSizeValues = [idTovar, size];
                await db.query(newSizeQuery, newSizeValues);
            }
    
            // Update TovarsColor table
            const deleteColorQuery = `
                DELETE FROM TovarsColor
                WHERE idTovar = $1`;
            await db.query(deleteColorQuery, [idTovar]);
            for (const clr of color) {
                const newColorQuery = `
                    INSERT INTO TovarsColor (idTovar, idColor)
                    VALUES ($1, $2)`;
                const newColorValues = [idTovar, clr];
                await db.query(newColorQuery, newColorValues);
            }
    
            res.status(200).json({ message: 'Tovars updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  deleteTovars(req, res) {
        const { idTovar } = req.body;
    
        try {
            // Delete from TovarsColor table
            const deleteColorsQuery = `
                DELETE FROM TovarsColor
                WHERE idTovar = $1`;
            await db.query(deleteColorsQuery, [idTovar]);
    
            // Delete from TovarsSize table
            const deleteSizesQuery = `
                DELETE FROM TovarsSize
                WHERE idTovar = $1`;
            await db.query(deleteSizesQuery, [idTovar]);

            const deleteTovarZakazQuery = `
                DELETE FROM tovarszakaz
                WHERE idTovar = $1`;
            await db.query(deleteTovarZakazQuery, [idTovar]);
    
            // Delete from tovars table
            const deleteTovarQuery = `
                DELETE FROM tovars
                WHERE idTovar = $1`;
            await db.query(deleteTovarQuery, [idTovar]);

    
            res.status(200).json({ message: 'Tovars deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async uploadImage (req, res) {
        try {
           if (req.file){
            res.json(req.file);
           }
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
        }
    };
}

module.exports = new TovarsController();