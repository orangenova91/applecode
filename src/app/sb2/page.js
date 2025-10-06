import Link from "next/link";

export default async function(){
    
    const resp = await fetch('http://localhost:9999/subject');
    const subject = await resp.json();

    

    return(
        <div> 

            {/*}
            {subject.map((subject)=>{
                return <li key={subject.grade}>{subject.grade}:{subject.subjectname}_{subject.curricclum}</li>
            })}
            */}
            <div><Link href={"/"+"newsub"}>새 강의 만들기</Link></div>
            
            {subject.map((a,i)=>{
                return(
                        <div className="subject" key={i}>
                            <Link href={"/sb2/"+a.id}><h4><span className="grade">{a.year} 학년도 {a.semester} 학기</span><br></br>{a.subtitle}({a.instructor})</h4></Link>
                        </div>
                        
                    )
                })
            }







        </div>
    )
}