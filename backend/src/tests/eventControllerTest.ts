const testCreate = async () => {
  const url = "http://localhost:3000/event/create";

  await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* write post body here */
      title: "Event Number 1 title",
      groupId: 121341,
    }),
    method: "POST",
  }).then((res) => {
    console.log("Result: ");
    console.log(res);
    console.log("\n\n");

    console.log("Body: ");
    res.json().then((json) => console.log(json));
  });
};

testCreate();
