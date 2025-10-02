"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function newsub(){
    const router = useRouter();

return(
    <form onSubmit={(e)=>{
        e.preventDefault();
        const data = {
            year: e.target.year.value,
            semester: e.target.semester.value,
            curriculum: e.target.curriculum.value,
            subtitle: e.target.subtitle.value,
            instructor: e.target.instructor.value,
            coursedescription: e.target.coursedescription.value,
            evaplan: e.target.evaplan.value,
            location: e.target.location.value,
            grade: e.target.grade.value
        }        
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        fetch('http://localhost:9999/subject', options)
        .then(res=>{ 
            if(res.ok){
                alert('강의가 생성되었습니다.');
                router.push('/sb2');
            }
        })
        .catch(e=>{
            console.error(e);
        }) 
    }}>
        <p><input type="text" name="year" placeholder="학년도"></input></p>
        <p><input type="text" name="semester" placeholder="학기"></input></p>
        <p><input type="text" name="curriculum" placeholder="교육과정"></input></p> 
        <p><input type="text" name="subtitle" placeholder="과목명" required></input></p>
        <p><input type="text" name="instructor" placeholder="담당교사"></input></p>
        <p><input type="text" name="coursedescription" placeholder="과목설명"></input></p>  
        <p><input type="text" name="evaplan" placeholder="평가계획"></input></p>
        <p><input type="text" name="location" placeholder="강의실"></input></p>
        <p><input type="text" name="grade" placeholder="학년"></input></p>  
        <p><button type="submit">강의 생성</button></p>
    </form>

)
}