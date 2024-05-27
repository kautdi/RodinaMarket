import React, { FC, useState } from 'react';
import { selectAuth } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import TovarsService from '../../service/TovarsService';
import axios from 'axios';

interface ModalEditProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const ModalAdd: FC<ModalEditProps> = ({ active, setActive }) => {
    const [name, setName] = useState<string>('');
    const { idcompany } = useSelector(selectAuth)
    const [description, setDescription] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [image, setImage] = useState<File>(); // Стейт для хранения выбранного изображения
    const [imagePath, setImagePath] = useState<string>("");

    const sizes = [
        { id: 1, size: 36 },
        { id: 2, size: 37 },
        { id: 3, size: 38 },
        { id: 4, size: 39 },
        { id: 5, size: 40 },
        { id: 6, size: 41 },
        { id: 7, size: 42 },
        { id: 8, size: 43 },
        { id: 9, size: 44 },
    ];

    const colors = [
        { id: 1, color: "black" },
        { id: 2, color: "white" },
        { id: 3, color: "blue" },
        { id: 4, color: "grey" },
        { id: 5, color: "red" },
        { id: 6, color: "orange" },
        { id: 7, color: "green" },
    ];

    const handleSizeSelection = (id: number) => {
        if (selectedSizes.includes(id)) {
            setSelectedSizes(selectedSizes.filter(sizeId => sizeId !== id));
        } else {
            setSelectedSizes([...selectedSizes, id]);
        }
    };

    const handleColorSelection = (id: number) => {
        if (selectedColors.includes(id)) {
            setSelectedColors(selectedColors.filter(colorId => colorId !== id));
        } else {
            setSelectedColors([...selectedColors, id]);
        }
    };

    const sendFile = async () => {
        try {
            if (image) { 
                const data = new FormData();
                data.append('picture', image);
        
                const res = await axios.post('http://127.0.0.1:5050/api/tovars/uploadImage', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                setImagePath(res.data.path);
            } else {
                console.error('No image selected.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
        }
        sendFile();
    };

    
    const handleAddToCart = async () =>  {

    console.log('Image Path:', imagePath);
    console.log(image)
    const item = {
        idCompany: idcompany,
        name: name,
        img: `${image?.name}`, // Use imagePath instead of image
        description: description,
        brandName: brand,
        price: parseInt(price),
        sizes: selectedSizes,
        color: selectedColors
    };

    // Call the service to create the item
    const res = await TovarsService.createTovars(item);
    console.log(res.data);
};

    return (
        <div className={`modal modal--edit  ${active ? 'modal__active' : ""}`}  >
            <div className="modal-body">
                <div className="modal-top">
                    <h3 className="modal__title">
                        Добавление товара
                    </h3>
                    <p className="close-modal" onClick={()=> setActive(!active)}>
                        x
                    </p>
                </div>
                <div className="content modal__content">
                    <form>
                        <div className="modal-form">
                        
                        <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label>Изображение</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        </div>
                            <div className="inputBlock auth-form__inputBlock">
                                <label>Название</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название товара" />
                            </div>
                        </div>
                        <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label>Описание</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание товара"></textarea>
                            </div>
                        </div>
                        <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label>Категория</label>
                                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Введите категорию" />
                            </div>
                        </div>
                        <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label>Цена</label>
                                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Цена" />
                            </div>
                        </div>
                    </form>
                    <div className="modal__sizeColor">
                        <div className="colorblock tovarPage__colorblock">
                            <h2 className="content__title">Доступные цвета</h2>
                            <div className="colors-row">
                                {colors.map((color) => (
                                    <div key={color.id} className={`color color__${color.color } ${selectedColors.includes(color.id) ? 'color__active' : ''}`} onClick={() => handleColorSelection(color.id)}></div>
                                ))}
                            </div>
                        </div>
                        <div className="sizeblock">
                            <h2 className="content__title">Доступные размеры</h2>
                            <div className="size-row">
                                {sizes.map((size) => (
                                    <div key={size.id} className={`size-item ${selectedSizes.includes(size.id) ? 'size-item__active' : ''}`} onClick={() => handleSizeSelection(size.id)}><p>{size.size}</p></div>
                                ))}
                            </div>
                        </div>
                        <button className="button button--submit" onClick={handleAddToCart}>Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAdd;