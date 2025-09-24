
export default function Home() {
  let name = 'park winner'
  let age = 20
  let link = 'http://google.com'
  return(
    <div>
        <h4 style={{color:'red'}}>애플2 후레시{age}</h4>
        <h4 className="title">애플 후레시{age}</h4>
        <p className="title-sub">by dev {name}</p>
        <a href={link}>링크</a>
    </div>
  )
}
