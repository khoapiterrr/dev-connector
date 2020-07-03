import Api from '../../networking/api';
import Path from '../../networking/Path';

export const Register = async (newUser) => {
  const response = await Api.post(Path.REGISTER, JSON.stringify(newUser));
  return response;
};

export const Login = async (login) => {
  const response = await Api.post(Path.LOGIN, JSON.stringify(login));
  return response;
};
