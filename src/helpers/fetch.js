///Este helper ayuda a poner el token a algunas peticiones que lo requiera y alas que no

const baseUrl = process.env.REACT_APP_API_URL

const fetchSinToken = (endpoint, data, method = 'GET') => {

   const url = `${baseUrl}/${endpoint}`; //localhost.../api/auth or events

   if(method === 'GET') {
      return fetch(url);
   } else {
      return fetch(url, {
         method,
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(data)
      });
   }
}


const fetchConToken = (endpoint, data, method = 'GET') => {

   const url = `${baseUrl}/${endpoint}`; //localhost.../api/auth or event
   const token = localStorage.getItem('token') || ''; //El token esta guardado en el localstorage

   if(method === 'GET') {
      return fetch(url, {
         method,
         headers: {
            'x-token': token
         }
      });
   } else {
      return fetch(url, {
         method,
         headers: {
            'Content-type': 'application/json',
            'x-token': token
         },
         body: JSON.stringify(data)
      });
   }
}


export {
   fetchSinToken,
   fetchConToken
}