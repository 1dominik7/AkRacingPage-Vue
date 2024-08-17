import Cookies from "js-cookie";

const setCookie = (name, value, days = 7) => {
  Cookies.set(name, JSON.stringify(value), {
    expires: days,
    sameSite: "Lax",
    path: "/",
  });
};

const getCookie = (name) => {
  const cookie = Cookies.get(name);
  return cookie ? JSON.parse(cookie) : null;
};

const removeCookie = (name) => {
  Cookies.remove(name, { path: "/" });
};

export { setCookie, getCookie, removeCookie };
