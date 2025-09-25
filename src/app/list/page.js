export default function list() {
  
    let 상품 = ['Tomatoes', 'Pasta', 'Coconut']

    let 어레이=[2,3,4]
    let b = 어레이.map(function(a, i){
        //return 100
        //console.log(a)
        //console.log(i)
    }
    )
    
    
    
    return(
        <div>
        <h4 className="title">상품목록</h4>

        {
            상품.map((a,i)=>{
                return(
                    <div className="food" key={i}>

                        {/*
                        1.원본 하드코딩
                        <img src="/food1.jpg" className="food-img"/
                        
                        2. {중괄호} & +i+ 이용 변수
                        <img src={'/food'+i+'.jpg'} className="food-img"/>
                        
                        3. 백팁(`) & ${} 이용 변수
                        <img src={`/food${i}.jpg`} className="food-img"/>
                        */}
                        <img src={'/food'+i+'.jpg'} className="food-img"/>
                        
                        <h4>{a} $40</h4>

                        {/*
                        위와 똑같은 결과를 보여줌.
                        <h4>{상품[i]} $40</h4>
                        */}
                    </div>
                    
                )
            })
        }

        {/*}
        <div className="food">
            <h4>{상품[0]} $40</h4>
        </div>
        <div className="food">
            <h4>{상품[1]} $80</h4>
        </div>
        <div className="food">
            <h4>{상품[2]} $80</h4>
        </div>
        */}
    </div>
  )
}
