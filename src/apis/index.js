import { default as api} from 'axios'

const baseHeaders = {
  'Content-Type': 'application/json',
}

const authHeaders = {
  Authorization: `Barer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
}

export const storeUser = ({nickname, ...rest}) => api({
  method: 'POST',
  url: import.meta.env.VITE_BACKEND + '/api/notion-post',
  data: {
    db: "fcfdcb93973a4df19808c6616a91f79b",
    primary: {
      name: 'nickname',
      content: nickname.content,
    },
    ...rest,
  },
  headers: baseHeaders,
})

export const me = (nickname, realname) => api({
  method: 'GET',
  url: import.meta.env.VITE_BACKEND + '/api/notion-show',
  params: {
    db: "fcfdcb93973a4df19808c6616a91f79b",
    primary: nickname.content,
    realname,
  },
  headers: baseHeaders
})

export const login = (nickname, code) => api({
  method: 'POST',
  url: import.meta.env.VITE_BACKEND + '/api/login',
  data: {
    db: "fcfdcb93973a4df19808c6616a91f79b",
    nickname, code,
  }
})

export const appointment = (data) => api({
  method: 'POST',
  url: import.meta.env.VITE_BACKEND + '/api/notion-post',
  data: {
    db: "f286c7c472df4918a2006939f019d60d",
    primary: {
      name: 'name',
      content: `study ${data.date.content}`,
    },
    type: data.type,
    place: data.place,
    price: data.price,
    date: data.date,
    state: { type:'select', content: 'gathering'}
  },
  headers: baseHeaders,
})

export const appointmentList = (date) => api({
  method: 'GET',
    url: import.meta.env.VITE_BACKEND + '/api/notion-show',
  params: {
    db: "f286c7c472df4918a2006939f019d60d",
    primary: `study ${date}`,
  },
  headers: baseHeaders,
})