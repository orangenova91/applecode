
"use client"
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Controls(){
    const params = useParams();
    const router = useRouter();
    const id = params.id;

return(
    <div>
        <div className="navbar">
            <Link href="/">홈</Link>
            <Link href="/list">list</Link>
            <Link href="/cart">cart</Link>
        </div>
        <div className="sidebar">
            <Link href="/sb1">학사일정</Link>
            <Link href={`/sb2/${id}`}>내 강의실</Link>
            <Link href="/sb3">우리반</Link>
            <Link href="/sb4">sidebar4</Link>
            <Link href="/sb5">sidebar5</Link>
        </div>
    </div>
)
}