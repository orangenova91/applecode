import 우수 from './data.js'
import {ea,name} from './../list/data2.js'

export default function Cart() {
  return (
    <div>
      <h4>Cart{우수}</h4>
      <h4>Cart{name}</h4>
      <작명></작명>
      <작명></작명>
    </div>
  )
}

function 작명(){
  return(
    <div className="cart-item">
      <p>상품명</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  )
} 
