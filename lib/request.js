const fetch = require('node-fetch');

//Gitlab - GET request.
const GET = async (url,token) =>{

  const headers = {
    'Content-Type'  : 'application/json',
    'PRIVATE-TOKEN' : token
  };

  //Make request.
  const result = await fetch(url,{
	 	method: 'GET',
    headers
  });

  //Response.
  const response = await result.json();
  return response;

};

module.exports = {
  GET
};