import dayjs from "dayjs";

export const tokenIsValid = () => {
  const token = atob(localStorage.getItem('token'))
  return token && dayjs(token.split('.').last()).isAfter(dayjs());
}