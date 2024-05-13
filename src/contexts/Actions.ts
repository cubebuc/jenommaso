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

export function setUsersWithRights(users: { [key: string]: any })
{
    return {
        type: ActionTypes.SET_USERS_WITH_RIGHTS,
        payload: users
    }
}