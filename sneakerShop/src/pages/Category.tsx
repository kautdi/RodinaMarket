import { FC, useEffect } from "react"

import { useParams } from "react-router-dom"
import { useAppDispatch } from "../redux/store"
import { setBrands } from "../redux/filter/slice"
import Categories from "../components/Main/Categories"
import Sorting from "../components/Main/Sorting"
import TovarsBlock from "../components/Main/TavarsBlock"



export const Category: FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setBrands([parseInt(id || "0")]));
        
    }, [id])

    return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            
            <Sorting/>
            <Categories/>
          </div>
          <h2 className="content__title">Все товары</h2>
          <TovarsBlock/>
        </div>
      </div>
    )
}