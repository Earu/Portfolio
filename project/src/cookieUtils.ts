/*
 * General utils for managing cookies in Typescript.
 */
function setCookie(name: string, val: string, expirationMs: number) {
    const date = new Date();
    const value = val;

    date.setTime(date.getTime() + expirationMs);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length === 2) {
        let part = parts.pop();
        if (part) {
            return part.split(";").shift();
        }
    }
}

function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}

export { setCookie, getCookie, deleteCookie };