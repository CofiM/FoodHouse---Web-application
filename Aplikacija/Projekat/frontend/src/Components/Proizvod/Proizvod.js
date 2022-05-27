import classes from './Proizvod.module.css';
import slicica from '../../pictures/logo.png';

const Proizvod = (props) => {
  
    return (
        <div className = {classes['card-wrapper']}>
        <div className = {classes['card']}>
          <div className = {classes['product-imgs']}>
            <div className = {classes['img-display']}>
              <div className = {classes['img-showcase']}>
                <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
                <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
                <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
                <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
              </div>
            </div>
            <div className = {classes['img-select']}>
              <div className = {classes['img-item']}>
                <a href = '#' data-id = '1'>
                  <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
                </a>
              </div>
              <div className = {classes['img-item']}>
                <a href = '#' data-id = '2'>
                  <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
                </a>
              </div>
              <div className = {classes['img-item']}>
                <a href = '#' data-id = '3'>
                  <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
                </a>
              </div>
              <div className = {classes['img-item']}>
                <a href = '#' data-id = '4'>
                  <img class = {classes['img']} src = {slicica} alt = 'shoe image'/>
                </a>
              </div>
            </div>
          </div>

          
          <div className = {classes['product-content']}>
            <h2 classname = {classes['product-title']}>nike shoes</h2>
            <a href = '#' classname = {classes['product-link']}>visit nike store</a>
  
            <div className = {classes['product-price']}>
              <p className = 'new-price'>New Price: <span>$249.00 (5%)</span></p>
            </div>
  
            <div className = {classes['product-detail']}>
              <h2>about this item: </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
            </div>
  
            <div className = {classes['purchase-info']}>
            <input  type='number' min='1' max='100' step='1' defaultValue='1'/>
              <button type = 'button' className = {classes.btn}>
                Dodaj u korpu
              </button>
            </div>
  
         
          </div>
        </div>
      </div>
    )
}

export default Proizvod;