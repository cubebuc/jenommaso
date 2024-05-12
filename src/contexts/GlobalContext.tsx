import { createContext, useEffect, useReducer, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, isVerified, isAdmin } from '../utils/firebase'

const ActionTypes =
{
    SET_VERIFIED: 'SET_VERIFIED',
    SET_ADMIN: 'SET_ADMIN',
    SET_LOADING: 'SET_LOADING',
    RESET: 'RESET'
}

const initialState =
{
    verified: false,
    admin: false,
    loading: true
}

type State = typeof initialState

const reducer = (state: State, action: { type: string, payload?: any }): State =>
{
    switch (action.type)
    {
        case ActionTypes.SET_VERIFIED:
            return { ...state, verified: action.payload }
        case ActionTypes.SET_ADMIN:
            return { ...state, admin: action.payload }
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload }
        case ActionTypes.RESET:
            return initialState
        default:
            return state
    }
}

export const Context = createContext(initialState)

type Props = { children: React.ReactNode }
export default function GlobalContext({ children }: Props)
{
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() =>
    {
        let unsubscribe: () => void
        unsubscribe = onAuthStateChanged(auth, async currentUser =>
        {
            if (currentUser)
            {
                const verified = await isVerified()
                const admin = await isAdmin()

                dispatch({ type: ActionTypes.SET_VERIFIED, payload: verified })
                dispatch({ type: ActionTypes.SET_ADMIN, payload: admin })
            }
            else
            {
                dispatch({ type: ActionTypes.RESET })
            }

            dispatch({ type: ActionTypes.SET_LOADING, payload: false })
        })

        return () =>
        {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    return (
        <Context.Provider value={state}>
            {!state.loading && children}
        </Context.Provider>
    )
}

export function useGlobal()
{
    const context = useContext(Context)
    if (!context)
        throw new Error('useGlobal must be used within GlobalContext')
    return context
}