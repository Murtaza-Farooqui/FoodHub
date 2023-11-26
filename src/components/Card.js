import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom'

export default function Card(props) {
    let navigate = useNavigate()

    let foodItem = props.item;
    let dispatch = useDispatchCart();
    let data =useCart();
    const priceRef = useRef();
    let options = props.options ?? {}; 
    let priceOptions = Object.keys(options);
    const [qty,setQty] = useState(1)
    const [size,setSize] = useState("")

    const handleClick = () => {
        if (!localStorage.getItem("token")) {
          navigate("/login")
        }
      }


    const handleAddToCart = async() =>{
        let food = []
        for (const item of data) {
          if (item.id === foodItem._id) {
            food = item;
    
            break;
          }
        }

        if (food !== []) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
              console.log("Size different so simply ADD one more to the list")
              return
            }
            return
          }

          await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })



        // await dispatch({type:"ADD",id:props.item._id, name:props.foodName,price:finalPrice, qty: qty,size:size})
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])
    return (
        <div>

            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.ImgSrc} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <p className="card-text">This is some imp text.</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onClick={handleClick} onChange={(e)=> setQty(e.target.value)}>{
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }</select>

                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onClick={handleClick} onChange={(e)=> setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}

                            </select>

                            <div className='d-inline h-100'>
                                {finalPrice}/-
                            </div>
                        </div>
                        <hr></hr>
                        <button className={`btn btn-success justify-content ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
