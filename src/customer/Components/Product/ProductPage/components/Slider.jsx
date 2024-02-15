import React, { useEffect, useRef, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';

const Slider = ({images}) => {
   console.log(images)
    const [imageIndex, setImageIndex] = useState(0)
    const [interval, setInterval] = useState(false);
    const [isOpen,setIsOpen]=useState(false)
    console.log(imageIndex)
    const imageRef= useRef()
    const nextImgRef= useRef()
    // useEffect(() => {
    //     if (interval) {
           
    //         const timer =   setInterval(()=>{setImageIndex(index => {
    //             if (index === images.length - 1) return 0
    //             clearInterval(timer)
    //             return index + 1
    //           })},3000)
          
    //       return () => clearInterval(timer);
    //     }
    //   }, [interval]);
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
          document.addEventListener("mousedown", handleClickOutside);
        };
      }, []);
    useEffect(()=>{
        
    },[])
      const handleClickOutside = (event) => {
        if (imageRef.current && !imageRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  function showNextImage(timer) {
   
    setImageIndex(index => {
      if (index === images.length - 1) return 0
     
      return index + 1
    })
    
  }
  const showNextImageBtn=()=>{
    
    const id= setInterval(()=>showNextImage(),1000)
    setInterval(id)
  }
  const resetBtn=()=>{
    
    clearInterval(interval)
    setInterval(null)
    setImageIndex(0)
  }
//   function showPrevImage() {
//     setImageIndex(index => {
//       if (index === 0) return images.length - 1
//       return index - 1
//     })
//   }
const item = images.map((url) => (
    <img src={url} style={{ translate: `${-100 * imageIndex}%` }}  className="img-slider-img" alt="product-img"/>
    
  ));
  return (
    <div 
    onMouseEnter={setInterval(true)}
    onMouseLeave={setInterval(false)}
    style={{
        overflow:"hidden",
        height: "280px",
        width: "200px",
        display: "flex",}} >
    <AliceCarousel
    mouseTracking
    items={item}
    autoPlay={interval}
    infinite
    autoPlayInterval={2000}
    disableButtonsControls
    autoWidth={true}
    
  />
  </div>
    // <div  onMouseEnter={() => showNextImageBtn()}
    // onMouseLeave={() => resetBtn()} ref={imageRef} className='py-4 px-2'>
    //     <div  
    //     style={{
    //     overflow:"hidden",
    //     height: "280px",
    //     width: "200px",
    //     display: "flex",}} 
    //     className=''>
    //         {
    //          images?.length>0  && images?.map(url=><img src={url} style={{ translate: `${-100 * imageIndex}%` }}  className="img-slider-img"
    //           alt="product-img"/>)
    //         }
    //     </div>
    // </div>
  )
}

export default Slider