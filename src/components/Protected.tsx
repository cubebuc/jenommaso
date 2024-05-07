import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../contexts/AuthContext'

type Props = {
    children: React.ReactNode
    adminRequired?: boolean
    verifiedRequired?: boolean
} & ({} extends {
    adminRequired?: boolean
    verifiedRequired?: boolean
} ? { adminRequired: boolean } | { verifiedRequired: boolean } : never)

function ProtectedVerified({ children, verifiedRequired, adminRequired }: Props)
{
    const { verified, admin } = useContext(Context)

    if ((verifiedRequired && !verified) || (adminRequired && !admin))
        return <Navigate to='/' replace />
    return children
}
export default ProtectedVerified