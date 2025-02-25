// client_send_message
const formSendMessages = document.querySelector("#form-send-messages");

if (formSendMessages) {
  formSendMessages.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    if (message) {
      socket.emit("CLIENT_SEND_MESSAGES", message);
      e.target.elements.message.value = "";
    }
  });
}

// server_return_message
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  console.log(data);
  const chatWindowBody = document.querySelector(".chat-window-body");
  const myID = document.querySelector("[my-id]").getAttribute("my-id");
  const div = document.createElement("div");
  div.classList.add("chat-item");
  let html = ``;
  if (data.userID != myID) {
    div.classList.add("messages-receive");
    html = `
      <div class="avatar"> 
          <img src="https://i.pinimg.com/originals/7b/7b/7b/">
      </div>
      <div class="chat-content">
        <div class="user-name"> 
          <span>${data.fullName}</span>
        </div>
        <div class="content">
          <p>${data.message}</p>
        </div>
      </div>
    `;
  } else {
    div.classList.add("messages-send");
    html = `
    <div class="chat-content">
      <div class="content">
        <p>${data.message}</p>
      </div>
    </div>
    `;
  }
  div.innerHTML = html;
  chatWindowBody.appendChild(div);
  chatWindowBody.scrollTop = chatWindowBody.scrollHeight;
});

const chatWindowBody = document.querySelector(".chat-window-body");

if (chatWindowBody) {
  chatWindowBody.scrollTop = chatWindowBody.scrollHeight;
}

document
  .querySelector("emoji-picker")
  .addEventListener("emoji-click", (event) => console.log(event.detail));
