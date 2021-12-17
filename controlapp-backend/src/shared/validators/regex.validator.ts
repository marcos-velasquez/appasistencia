export const Regex = {
  phone: new RegExp(/^[0-9+]+$/),
  email: new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
  rut: new RegExp(/^([0-9]){7,8}-([0-9Kk]){1}$/),
  time: new RegExp(/[0-9]{2}:[0-9]{2}/),
};
