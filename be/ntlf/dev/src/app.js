const url = "/.netlify/functions/api-ping";
const qstring = "?name=Fo";

fetch(`${url}${qstring}`)
  .then((response) => response.json())
  .then((data) => console.log(data));
