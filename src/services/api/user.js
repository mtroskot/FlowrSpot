const login = (email, password) => ({
  url: `users/login`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus(status) {
      return status === 200 || status === 400; // Accept only status code 200
    },
    data: { email, password }
  }
});

const register = registerData => ({
  url: `users/register`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email: registerData.email,
      password: registerData.password,
      first_name: registerData.firstName,
      last_name: registerData.lastName,
      date_of_birth: registerData.birthDate
    }
  }
});

const getUserInfo = authToken => ({
  url: `/users/me`,
  options: {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
});

export default {
  login,
  register,
  getUserInfo
};
