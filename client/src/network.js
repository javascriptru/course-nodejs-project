import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  validateStatus: status => {
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
      return;
    }
    return status <= 399;
  }
});
