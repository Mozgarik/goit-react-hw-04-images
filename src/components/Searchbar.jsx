import {  React } from 'react'
import { useState } from 'react'
import s from './App.module.css'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


export function Searchbar({submit}) {
   const [photoTags, setPhototags] = useState('')

    const nameChange = event => {
        setPhototags(event.currentTarget.value.toLowerCase())
      }

    const handleSubmit = event => {
        event.preventDefault()
        if(photoTags.trim() === "") {
            toast.dark("Введите корректный запрос", {
                appearance: 'warning',
                autoDismiss: true,
              })
            return
        }
        submit(photoTags)
        setPhototags("")
    }  

    return(
        <header className={s.Searchbar}>
        <form className={s.Form} onSubmit={handleSubmit}>
               <input
            className={s.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={nameChange}
            />
            <button type="submit" className={s.SearchFormButton}>
            Search
            </button>
    
    
      </form>
    </header>
    )
}



