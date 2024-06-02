import Cookies from 'js-cookie'

export const removeUserCookies = () => {
    Cookies.remove("user")
    Cookies.remove("token")
}
