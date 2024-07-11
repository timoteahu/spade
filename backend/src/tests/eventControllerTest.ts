/* eslint-disable @typescript-eslint/no-unused-vars */
const testCreate = async () => {
  const url = "http://localhost:3000/event/create";

  await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* write post body here */
      title: "Event Number 1 title",
      description: "idk",
      groupId: 2,
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

const testGetEvents = async () => {
  const url = "http://localhost:3000/event/2/get-group-events";

  await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((res) => {
    console.log("Result: ");
    console.log(res);
    console.log("\n\n");

    console.log("Body: ");
    res.json().then((json) => console.log(json));
  });
};

const testGetEvent = async () => {
  const url = "http://localhost:3000/event/13/get-event";

  await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((res) => {
    console.log("Result: ");
    console.log(res);
    console.log("\n\n");

    console.log("Body: ");
    res.json().then((json) => console.log(json));
  });
};

const testChangeDesc = async () => {
  const url = "http://localhost:3000/event/13/description";

  await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* write post body here */
      description: "event description...",
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

testChangeDesc();
