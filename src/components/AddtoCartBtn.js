import { useState, useEffect } from "react";
export default function AddtoCartBtn({ userID, productID }) {
   
    const [qtyInCart, setQtyInCart] =useState(10)
    //TODO: fetch from cart item tables for the product, setQtyInCart to that

    const handleIncDec = (sign)=>{
        if (sign ==='+'){
        console.log('handle incre')
        setQtyInCart(prev=>Math.min(50,prev+1))
        } else {
            console.log('handle dec')
            setQtyInCart(prev=>Math.max(0,prev-1))
        }
        //TODO: post new qty to cart tables
    }

    const handleAddToCart=()=>{
        console.log('handle add to cart')
        setQtyInCart(1)
        //TODO: post new qty to cart tables
    }

    const handleChangeQtyInCart =(e)=>{
        console.log('handleChangeQtyInCart')
        const newQty = e.target.value
        if (newQty>50){
            setQtyInCart(50)
            alert('we have revised the qty to match the maximum qty allowed')   
        } else{
            setQtyInCart(newQty)
        }
    }

    return(
        <>
        {
        (qtyInCart===0)
        ?<button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
        :<div>
            <button onClick ={()=>handleIncDec('-')}>-</button>
            <span><input type="text" minLength="0" maxLength="2" size="5" value={qtyInCart} onChange={(e)=>handleChangeQtyInCart(e)}/></span>
            <button onClick ={()=>handleIncDec('+')}>+</button>
        </div>
        }
        </>
    )

}
