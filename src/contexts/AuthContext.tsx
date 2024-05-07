import { createContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, isVerified, isAdmin } from "../utils/firebase"

export const Context = createContext<{ verified: boolean, admin: boolean }>({ verified: false, admin: false })

type Props = { children: React.ReactNode }
export function AuthContext({ children }: Props)
{
    const [verified, setVerified] = useState<boolean>(false)
    const [admin, setAdmin] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() =>
    {
        let unsubscribe: () => void
        unsubscribe = onAuthStateChanged(auth, async currentUser =>
        {
            if (currentUser)
            {
                await isVerified().then(setVerified)
                await isAdmin().then(setAdmin)
            }
            else
            {
                setVerified(false)
                setAdmin(false)
            }
            setLoading(false)
        })

        return () =>
        {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    return (
        <Context.Provider value={{ verified, admin }}>
            {!loading && children}
        </Context.Provider>
    )
}
export default AuthContext