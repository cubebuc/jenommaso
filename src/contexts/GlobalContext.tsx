import { createContext, useEffect, useReducer, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import ActionTypes from './ActionTypes'
import { auth, isVerified, isAdmin, getProducts, getTags, getUsersWithRights, getAllOrders, getMyOrders, getNews } from '../utils/firebase'

type State = {
    loading: boolean,
    verified: boolean,
    admin: boolean,
    products: { [key: string]: any },
    tags: { [key: string]: string[] },
    usersWithRights: { [key: string]: any },
    cart: { [key: string]: number },
    orders: { [key: string]: any },
    news: { [key: string]: any }
}

const initialState: State =
{
    loading: true,
    verified: false,
    admin: false,
    products: {},
    tags: {},
    usersWithRights: {},
    cart: {},
    orders: {},
    news: {}
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
            const newProducts1 = { ...state.products }
            delete newProducts1[action.payload]
            return { ...state, products: newProducts1 }
        case ActionTypes.HIDE_PRODUCT:
            const updatedProducts = { ...state.products, [action.payload]: { ...state.products[action.payload], hidden: true } }
            return { ...state, products: updatedProducts }
        case ActionTypes.UPDATE_STOCK:
            const updatedProducts2 = { ...state.products, [action.payload.id]: { ...state.products[action.payload.id], stock: state.products[action.payload.id].stock + action.payload.amount } }
            return { ...state, products: updatedProducts2 }
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
        case ActionTypes.SET_USER_VERIFIED:
            const updatedUsers = { ...state.usersWithRights, [action.payload.id]: { ...state.usersWithRights[action.payload.id], verified: action.payload.verified } }
            return { ...state, usersWithRights: updatedUsers }
        case ActionTypes.SET_CART:
            return { ...state, cart: action.payload }
        case ActionTypes.ADD_TO_CART:
            const newCart = { ...state.cart }
            newCart[action.payload] = newCart[action.payload] ? newCart[action.payload] + 1 : 1
            return { ...state, cart: newCart }
        case ActionTypes.REMOVE_FROM_CART:
            const updatedCart1 = { ...state.cart }
            delete updatedCart1[action.payload]
            return { ...state, cart: updatedCart1 }
        case ActionTypes.CLEAR_CART:
            return { ...state, cart: {} }
        case ActionTypes.SET_CART_ITEM:
            const updatedCart2 = { ...state.cart, [action.payload.id]: action.payload.amount }
            return { ...state, cart: updatedCart2 }
        case ActionTypes.SET_ORDERS:
            return { ...state, orders: action.payload }
        case ActionTypes.ADD_ORDER:
            const newOrders = { ...state.orders, [action.payload.id]: action.payload.order }
            return { ...state, orders: newOrders }
        case ActionTypes.SET_ORDER_COMPLETED:
            const updatedOrders = { ...state.orders, [action.payload.id]: { ...state.orders[action.payload.id], completed: action.payload.completed } }
            return { ...state, orders: updatedOrders }
        case ActionTypes.SET_NEWS:
            return { ...state, news: action.payload }
        case ActionTypes.ADD_NEWS:
            const newNews = { ...state.news, [action.payload.id]: action.payload.news }
            return { ...state, news: newNews }
        case ActionTypes.REMOVE_NEWS:
            const updatedNews = { ...state.news }
            delete updatedNews[action.payload]
            return { ...state, news: updatedNews }
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
                const cart = localStorage.getItem('cart')

                dispatch({ type: ActionTypes.SET_VERIFIED, payload: verified })
                dispatch({ type: ActionTypes.SET_ADMIN, payload: admin })

                if (verified)
                {
                    const products = await getProducts()
                    const tags = await getTags()
                    const myOrders = await getMyOrders()
                    const news = await getNews()

                    dispatch({ type: ActionTypes.SET_PRODUCTS, payload: products })
                    dispatch({ type: ActionTypes.SET_TAGS, payload: tags })
                    dispatch({ type: ActionTypes.SET_ORDERS, payload: myOrders })
                    dispatch({ type: ActionTypes.SET_NEWS, payload: news })
                }

                if (admin)
                {
                    const usersWithRights = await getUsersWithRights()
                    const orders = await getAllOrders()

                    dispatch({ type: ActionTypes.SET_USERS_WITH_RIGHTS, payload: usersWithRights })
                    dispatch({ type: ActionTypes.SET_ORDERS, payload: orders })
                }

                if (cart)
                {
                    const parsedCart = JSON.parse(cart)
                    for (const id in parsedCart)
                    {
                        if (!state.products[id])
                        {
                            delete parsedCart[id]
                        }
                    }

                    dispatch({ type: ActionTypes.SET_CART, payload: parsedCart })
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