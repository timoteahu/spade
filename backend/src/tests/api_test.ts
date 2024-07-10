const url = "http://localhost:3000/user";

fetch(url, {
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    /* write post body here */
  }),
  method: "POST",
}).then((res) => {
  console.log(res);
});
