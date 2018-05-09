import fetch from '../util/fetch'
import {getStore} from '../util/tools'

export const fetchAddress = () => fetch('/address')

export const updateAddress = data => fetch('/address', data, 'PATCH')

export const userPswLogin = (username, password) => fetch('/system-user', {username, password}, 'GET')

export const userCodeLogin = (username, code) => fetch('/system-user', {username, code}, 'GET')

export const getUser = () => fetch('/system-user', {id: getStore('user_id')})

export const getUsers = (page = 1, limit = 20) => fetch(`/user-list?_page=${page}&_limit=${limit}`)
