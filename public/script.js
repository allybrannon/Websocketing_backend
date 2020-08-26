const socket = new WebSocket("ws://localhost:3423");
console.log(socket);

socket.onopen = () => {
  socket.onmessage = (evt) => {
    console.log(evt.data);
    document.getElementById("messages").innerHTML += `<div>${evt.data}</div>`;
  };

  document.getElementById("request-amount").addEventListener("click", () => {
    socket.send(JSON.stringify({ type: "request-amount" }));
  });
  document.getElementById("deposit-amount").addEventListener("click", () => {
    let value = document.getElementById("deposit-this").value;
    socket.send(JSON.stringify({ type: "deposit-amount", payload: value }));
  });
};
