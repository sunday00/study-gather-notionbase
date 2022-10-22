export default (name) => {
  return import.meta.env[`VITE_${name}`];
}