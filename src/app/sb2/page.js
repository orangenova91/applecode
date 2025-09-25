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
            
            {subject.map((a,i)=>{
                return(
                        <div className="subject" key={i}>
                            <Link href={"/"}><h4><span className="grade">{a.grade}</span>:{a.subjectname}<br></br>({a.curricclum})</h4></Link>
                        </div>
                        
                    )
                })
            }







        </div>
    )
}