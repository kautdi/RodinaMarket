import React, { useState } from 'react';
import styles from './AddBtn.module.scss'
import ModalEdit from '../../ModalAdd';


export const AddBtn: React.FC = () => {
  const [activeModal, setActiveModal] = useState<boolean>(false)

  return (
    <>
    <button className={styles.add} onClick={()=> setActiveModal(!activeModal)}>
        Добавить
    </button>
    <ModalEdit active={activeModal} setActive={setActiveModal}/>
    </>
  );
};
