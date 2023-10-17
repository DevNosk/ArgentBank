import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGetProfile } from "../../redux/reducers/profileSlice"

export default function User() {
    const token = useSelector(state => state.userAuth.token)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                const data = await response.json()
                dispatch(setGetProfile({ data }))
            } catch (err) {
                console.log(err)
            }
        }
        fetchDataUser()
    }, [token])

    return (

        <main className="main bg-dark">
        </main>
    )
}