import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { removeCookie } from "utils/cookie"

export default function Signout(){
    const navigate = useNavigate();
    useEffect(()=>{
        removeCookie('accessToken')
        removeCookie('admin')
        navigate('/auth/signin')
    })
    return(
        <>

        </>
    )
}