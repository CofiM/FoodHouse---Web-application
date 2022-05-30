import { useState } from 'react';
// import images from "../../pictures";
import classes from './ImageGallery.module.css';
import ImageArray from './ImageArray';

const ImageGallery = (props) =>{
 
    const [selectedImg,setSelectedImg]=useState(ImageArray[0]);

    return(

        <div className={classes.container}>
            <img src = {selectedImg} alt='Selected' className={classes.selected}/> 
            <div className={classes.imgContainer}>
                {ImageArray.map((img,index)=>(

                    <img
                        className={classes.image}
                        style={{border:selectedImg === img ? '4px solid blue' : ''}}
                        key={index}
                        src={img}
                        onClick={()=>setSelectedImg(img)}
                    />
                )
                )}
            </div>      
            
        </div>
    );
}

export default ImageGallery;