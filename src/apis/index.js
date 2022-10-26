import { default as api} from 'axios'
import dayjs from "dayjs";

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
    db: import.meta.env.VITE_NOTION_USER_DB,
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
    db: import.meta.env.VITE_NOTION_USER_DB,
    primary: nickname.content,
    rest: JSON.stringify({realname: realname})
  },
  headers: baseHeaders
})

export const login = (nickname, code) => api({
  method: 'POST',
  url: import.meta.env.VITE_BACKEND + '/api/login',
  data: {
    db: import.meta.env.VITE_NOTION_USER_DB,
    nickname, code,
  }
})

export const appointment = (data) => api({
  method: 'POST',
  url: import.meta.env.VITE_BACKEND + '/api/notion-post',
  data: {
    db: import.meta.env.VITE_NOTION_APPOINT_DB,
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
  headers: authHeaders,
})

export const appointmentList = (date) => api({
  method: 'GET',
    url: import.meta.env.VITE_BACKEND + '/api/notion-show-ends',
  params: {
    db: import.meta.env.VITE_NOTION_APPOINT_DB,
    primary: date,
  },
  headers: authHeaders,
})

export const attend = (appointment, username, userId) => api({
  method: 'POST',
  url: import.meta.env.VITE_BACKEND + '/api/notion-post',
  data: {
    db: import.meta.env.VITE_NOTION_ATTEND_DB,
    primary: {
      name: 'id',
      content: `${appointment.type.select.name}_${appointment.date.date.start}_${username}`
    },
    appointment_id: {
      type: 'relation',
      content: {
        id: appointment.id,
        database_id: import.meta.env.VITE_NOTION_APPOINT_DB,
        single_property: {
          name: appointment.name.title[0].plain_text
        }
      }
    },
    user_id: {
      type: 'relation',
      content: {
        id: userId,
        database_id: import.meta.env.VITE_NOTION_USER_DB,
        single_property: {
          name: username
        }
      }
    },
    appointed_at: {
      type: 'date',
      content: dayjs().format('YYYY-MM-DD')
    },
    date: {
      type: 'date',
      content: appointment.date.date.start
    },
    state: {
      type: 'select',
      content: 'appointed'
    }
  },
  headers: authHeaders
})

export const attendList = (date, username) => api({
  method: 'GET',
  url: import.meta.env.VITE_BACKEND + '/api/notion-show-ends',
  params: {
    db: import.meta.env.VITE_NOTION_ATTEND_DB,
    primary: `${date}_${username}`,
  },
  headers: authHeaders,
})

export const cancelAttend = (id) => api({
  method: 'DELETE',
  url: import.meta.env.VITE_BACKEND + '/api/notion-delete',
  data: {
    db: import.meta.env.VITE_NOTION_ATTEND_DB,
    id,
  },
  headers: authHeaders,
})

export const payment = (month) => api({
  method: 'GET',
  url: import.meta.env.VITE_BACKEND + '/api/payment',
  params: {
    month
  },
  headers: authHeaders,
})