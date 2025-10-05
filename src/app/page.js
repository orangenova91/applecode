export default function Home() {
  let name = 'park winner'
  let link = 'http://google.com'

  

  return(
    <div>
        
        
        {/* class로 globa.css 사용이 귄찮아서 style 속성 사용하려면 중괄호{{color:'red'}} 2개가 반드시 필요 */}
        <h4 style={{color:'red', fontSize:'30px'}}>애플2 후레시</h4>


        <h4 className="title">애플 후레시</h4>
        <p className="title-sub">by dev {name}</p>
        <a href={link}>링크</a>
    </div>
  )
}