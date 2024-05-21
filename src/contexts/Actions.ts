import ActionTypes from './ActionTypes'

export function setProduct(product: { [key: string]: any })
{
    return {
        type: ActionTypes.SET_PRODUCT,
        payload: product
    }
}

export function removeProduct(id: string)
{
    return {
        type: ActionTypes.REMOVE_PRODUCT,
        payload: id
    }
}

export function hideProduct(id: string)
{
    return {
        type: ActionTypes.HIDE_PRODUCT,
        payload: id
    }
}

export function updateStock(id: string, amount: number)
{
    return {
        type: ActionTypes.UPDATE_STOCK,
        payload: { id, amount }
    }
}

export function addTag(type: string, tag: string)
{
    return {
        type: ActionTypes.ADD_TAG,
        payload: { type, tag }
    }
}

export function removeTag(type: string, tag: string)
{
    return {
        type: ActionTypes.REMOVE_TAG,
        payload: { type, tag }
    }
}

export function setUserVerified(id: string, verified: boolean)
{
    return {
        type: ActionTypes.SET_USER_VERIFIED,
        payload: { id, verified }
    }
}

export function addToCart(id: string)
{
    return {
        type: ActionTypes.ADD_TO_CART,
        payload: id
    }
}

export function removeFromCart(id: string)
{
    return {
        type: ActionTypes.REMOVE_FROM_CART,
        payload: id
    }
}

export function setCartItem(id: string, amount: number)
{
    return {
        type: ActionTypes.SET_CART_ITEM,
        payload: { id, amount }
    }
}

export function clearCart()
{
    return {
        type: ActionTypes.CLEAR_CART
    }
}

export function setOrders(orders: { [key: string]: any })
{
    return {
        type: ActionTypes.SET_ORDERS,
        payload: orders
    }
}

export function addOrder(id: string, order: { [key: string]: any })
{
    return {
        type: ActionTypes.ADD_ORDER,
        payload: { id, order }
    }
}

export function setOrderCompleted(id: string, completed: boolean)
{
    return {
        type: ActionTypes.SET_ORDER_COMPLETED,
        payload: { id, completed }
    }
}

export function addNews(id: string, news: { [key: string]: any })
{
    return {
        type: ActionTypes.ADD_NEWS,
        payload: { id, news }
    }
}

export function removeNews(id: string)
{
    return {
        type: ActionTypes.REMOVE_NEWS,
        payload: id
    }
}