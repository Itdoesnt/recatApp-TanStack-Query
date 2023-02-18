const API_URL = 'https://api.react-learning.ru';
const GROUP_ID = '9-gr';

export const request = async (url, init) => {
  const fullUrl = API_URL + url;

  const res = await fetch(fullUrl, {
    ...init,
    headers: {
      ...init.headers,
      ...init.token ? ({
        'Authorization': `Bearer ${init.token}`
      }) : {},
      'Content-Type': 'application/json',
    }
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }

  return json;
};

export const signUp = (data) => {
  return () => request('/signup', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      "group": "9-gr"
    }),
  });
};


export const signIn = (data) => {
  return () => request('/signin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const me = ({
  token
}) => {
  return () => request(`/v2/${GROUP_ID}/users/me`, {
    method: 'GET',
    token,
  });
};

export const products = ({
  token
}) => {
  return () => request(`/products`, {
    method: 'GET',
    token,
  });
};