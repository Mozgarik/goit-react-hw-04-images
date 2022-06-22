import s from './App.module.css'
import {React} from 'react'
import { useEffect } from 'react';



function Modal({onClickImg, img, id}) {
  useEffect(() => {
     window.addEventListener('keydown', handleKeyDown);
  })

  useEffect(() => {
    return window.removeEventListener('keydown', handleKeyDown);
  })  
 
  
   const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClickImg();
      }
      if (e.target === e.currentTarget) {
        onClickImg();
      }
    };
 
      return(
      <div className={s.Overlay} onClick={handleKeyDown}>
          <div className={s.Modal}>
              <img height={'800px'} width={"800px"} src={img} alt={id} />
          </div>
      </div>
  )
  }



export default Modal
