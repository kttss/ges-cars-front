import jwt_decode from 'jwt-decode';

export const CurrentRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: any = jwt_decode(token);
    return decoded.role;
  }
  return null;
};
