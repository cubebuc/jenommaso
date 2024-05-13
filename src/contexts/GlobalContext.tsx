import { createContext, useEffect, useReducer, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import ActionTypes from './ActionTypes'
import { auth, isVerified, isAdmin, getProducts, getTags, getUsersWithRights } from '../utils/firebase'

type State = {
    loading: boolean,
    verified: boolean,
    admin: boolean,
    products: { [key: string]: any },
    tags: { [key: string]: string[] },
    usersWithRights: { [key: string]: any }
}

const initialState: State =
{
    loading: true,
    verified: false,
    admin: false,
    products: {},
    tags: {},
    usersWithRights: {}
}

const reducer = (state: State, action: { type: string, payload?: any }): State =>
{
    switch (action.type)
    {
        case ActionTypes.RESET:
            return initialState
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload }
        case ActionTypes.SET_VERIFIED:
            return { ...state, verified: action.payload }
        case ActionTypes.SET_ADMIN:
            return { ...state, admin: action.payload }
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: action.payload }
        case ActionTypes.SET_PRODUCT:
            return { ...state, products: { ...state.products, ...action.payload } }
        case ActionTypes.REMOVE_PRODUCT:
            const newProducts = { ...state.products }
            delete newProducts[action.payload]
            return { ...state, products: newProducts }
        case ActionTypes.SET_TAGS:
            return { ...state, tags: action.payload }
        case ActionTypes.ADD_TAG:
            const newTags1 = { ...state.tags }
            newTags1[action.payload.type] = [...state.tags[action.payload.type], action.payload.tag]
            return { ...state, tags: newTags1 }
        case ActionTypes.REMOVE_TAG:
            const newTags2 = { ...state.tags }
            newTags2[action.payload.type] = state.tags[action.payload.type].filter(tag => tag !== action.payload.tag)
            return { ...state, tags: newTags2 }
        case ActionTypes.SET_USERS_WITH_RIGHTS:
            return { ...state, usersWithRights: action.payload }
        default:
            return state
    }
}

type ContextType = { state: State, dispatch: React.Dispatch<{ type: string, payload?: any }> }
export const Context = createContext(initialState as unknown as ContextType)

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
                const products = await getProducts()
                const tags = await getTags()

                dispatch({ type: ActionTypes.SET_VERIFIED, payload: verified })
                dispatch({ type: ActionTypes.SET_ADMIN, payload: admin })
                dispatch({ type: ActionTypes.SET_PRODUCTS, payload: products })
                dispatch({ type: ActionTypes.SET_TAGS, payload: tags })

                if (admin)
                {
                    const usersWithRights = await getUsersWithRights()
                    dispatch({ type: ActionTypes.SET_USERS_WITH_RIGHTS, payload: usersWithRights })
                }
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
        <Context.Provider value={{ state, dispatch }}>
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