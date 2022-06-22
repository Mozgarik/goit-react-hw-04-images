import {React} from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { Loader } from "./Loader";
import Modal from "./Modal";
import { Button } from "./Button";
import ApiService from "services/Api-Service";
import { ToastContainer } from "react-toastify";
import s from "./App.module.css"




const API = new ApiService()

function App() {
  const [photoTags, setPhotoTags] = useState('')
  const [photo, setPhoto] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [largeImgUrl, setLargeImgUrl] = useState('')
  const [modal, setMoal] = useState(false)
  const [idImg, setIdImg] = useState('')

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {setLoading(false)}, 1000)
  }, [])
  
const handleFormSubmit = query => {
    if(page > 1) {
      setPage(1)
    }
    const imgData = query ? query : {};
    setPhoto([])
    setPhotoTags(imgData)
    setLoading(true)
    API.getImages(query, page).then(images => addDataToState(images)).finally(setTimeout(() => {setLoading(false) }, 2000))
}

 function addDataToState(images) {
    setPhoto(prevPhoto => {
      return [...prevPhoto, ...images] 
    })
  }

    const loadMore = ref => {
      setPage(prevPage => {
        return prevPage + 1 
      })
      setLoading(true)
      API.getImages(photoTags, page + 1).then(images => addDataToState(images)).finally(setTimeout(() => {setLoading(false) }, 1000))
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
    const onClickImg = (e, img, id) => {
        e.preventDefault()
        setMoal(prevModal => {
          return [!prevModal] 
        })
        setLargeImgUrl(img)
        setIdImg(id)
        setLoading(true)
        setTimeout(() => {setLoading(false)}, 1000)
      }
      const onClose = () => {
          setMoal(prevModal => (
            !prevModal
        ))
        }

         return(
      <div>
         {modal && <Modal img={largeImgUrl} id={idImg} onClickImg={onClose}/>}
        <Searchbar submit={handleFormSubmit} />
        {loading && <Loader/>}
        {photo.length === 0 && <h2 className={s.tittle}>Введите запрос</h2>}
        {photo.length > 0 && <ImageGallery 
        modal={modal}
        photo={photo} 
        tags={photoTags}
        onClickImg={onClickImg}
        />}
        {photo.length > 0 && <Button incrementPage={loadMore}/>}   
        <ToastContainer autoClose={3000}/>
        </div>
    )

}

export default App


