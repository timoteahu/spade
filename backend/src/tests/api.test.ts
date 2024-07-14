// Your JSON data
const jsonData = {
  title: "idk",
  description: "idkkkk",
  groupid: 2,
};

// Set up options for the fetch request
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // Set content type to JSON
    authorization:
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIn0.GSYufXPwSxw_1m8F0J9Cjx1JSAJrYS0slLEi-BBbfHQ",
  },
  body: JSON.stringify(jsonData), // Convert JSON data to a string and set it as the request body
};

fetch("http://localhost:3000/event/", options).then((res) => {
  console.log(res);
  res.json().then((json) => console.log(json));
});
