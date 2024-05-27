import React, { FC, useEffect, useState } from 'react';
import { selectAuth } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import TovarsService from '../../service/TovarsService';
import { IBrand } from '../../models/IBrand';
import axios from 'axios';

interface ModalEditProps {
    active: boolean;
    setActive: (active: boolean) => void;
    idTovar: number;
}

const ModalEdit: FC<ModalEditProps> = ({ active, setActive, idTovar }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [brand, setBrand] = useState<string>('');
    const [image, setImage] = useState<File>(); // Стейт для хранения выбранного изображения
    const { idcompany } = useSelector(selectAuth);

    let colors = [
        { id: 1, color: "Черный", status: "" },
        { id: 2, color: "Белый", status: ""  },
        { id: 3, color: "Синий", status: ""  },
        { id: 4, color: "Серые", status: ""  },
        { id: 5, color: "Красные", status: ""  },
        { id: 6, color: "Оранжевый", status: ""  },
        { id: 7, color: "Зеленый", status: ""  },
    ];
    let sizes = [
        { id: 1, size: 36, status: "" },
        { id: 2, size: 37, status: ""  },
        { id: 3, size: 38, status: ""  },
        { id: 4, size: 39, status: ""  },
        { id: 5, size: 40, status: ""  },
        { id: 6, size: 41, status: ""  },
        { id: 7, size: 42, status: ""  },
        { id: 8, size: 43, status: ""  },
        { id: 9, size: 44, status: ""  },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const tovar = await TovarsService.getOneSneaker(idTovar);
                setName(tovar.data.name);
                setDescription(tovar.data.description);
                setPrice(tovar.data.price.toString());
                
                const brandsResponse = await TovarsService.getBrands();
                const brands: IBrand[] = brandsResponse.data;
    
                const selectedBrand = brands.find((brand: IBrand) => brand.idbrand === tovar.data.idbrand);
                if (selectedBrand) {
                    setBrand(selectedBrand.name); // Установить только имя бренда
                } else {
                    console.log("Бренд не найден");
                }
    
                colors = colors.map(color => ({
                    ...color,
                    status: tovar.data.colors.includes(color.color) ? "active" : ""
                }));
                const activeColor = colors.filter(color => color.status === "active").map(color => color.id);
                setSelectedColors(activeColor);

                sizes = sizes.map(size =>({
                    ...size, 
                    status: tovar.data.sizes.includes(size.size) ? "active" : ""
                }));
                const activeSizes = sizes.filter(size => size.status === "active").map(size => size.id);
                setSelectedSizes(activeSizes);
                setImg(tovar.data.img);
                
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        }
    
        fetchData();
    }, [idTovar]);

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
    }

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

    async function handleUpdate() {

        sendFile();
        const item = {
            idTovar: idTovar.toString(),
            idCompany: idcompany,
            name: name,
            description: description,
            brandName: brand,
            img: `${image?.name}`,
            price: parseInt(price),
            sizes: selectedSizes,
            color: selectedColors
        }
        console.log(item)
        const res = await TovarsService.updateTovars(item);
        console.log(res.data)
        
    }

    async function deleteTovars(){
        try {
            const res = await TovarsService.deleteTovars(idTovar);
            console.log(res.data);
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
        }
        window.location.reload();
        window.location.reload();
    }

    function translateColorToEnglish(color: string): string {
        switch (color) {
            case 'Красные':
                return 'red';
            case 'Синий':
                return 'blue';
            case 'Черный':
                return 'black';
            case 'Розовые':
                return 'pink';
            case 'Серые':
                return 'gray';
            case 'Оранжевый':
                return 'orange';
            case 'Белый':
                return 'white';
            case 'Зеленый':
                return 'green';
            default:
                return color;
        }
    }
    
    return (
        <div className={`modal modal--ed ${active ? 'modal__active' : ""}`} >
            <div className="modal-body">
                <div className="modal-top">
                    <h3 className="modal__title">
                        Изменение товара
                    </h3>
                    <p className="close-modal" onClick={()=> setActive(!active)}>
                        x
                    </p>
                </div>
                <div className="content modal__content">
                    <form>
                        <div className="modal-form">
                            <div className="avtr profile__avtr">
                                <img src={`http://localhost:5050/images/${img}`} alt="" />
                            </div>
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
                        
                    </form>
                    <div className="modal__sizeColor">
                    <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label>Категория</label>
                                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Категория" />
                            </div>
                        </div>
                        <div className="modal-form">
                            <div className="inputBlock auth-form__inputBlock">
                                <label>Цена</label>
                                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Цена" />
                            </div>
                        </div>
                        <div className="colorblock tovarPage__colorblock">
                            <h2 className="content__title">Цвета</h2>
                            <div className="colors-row">
                               {
                                colors.map((color) => (
                                    <div key={color.id} className={`color color__${translateColorToEnglish(color.color)} ${selectedColors.includes(color.id) ? 'color__active' : ''}`} onClick={() => handleColorSelection(color.id)} ></div>
                                ))
                               }
                            </div>
                        </div>
                        <div className="sizeblock">
                            <h2 className="content__title">Размеры</h2>
                            <div className="size-row">
                               {
                                sizes.map((size) => (
                                    <div key={size.id} className={`size-item size__${size.size} ${selectedSizes.includes(size.id) ?'size-item__active' : ''}`} onClick={() => handleSizeSelection(size.id)}>{size.size}</div>
                                ))
                               }
                            </div>
                        </div>
                        <button className="button button--submit" onClick={handleUpdate}>Изменить</button>
                        <button className="button button--delete" onClick={deleteTovars}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;