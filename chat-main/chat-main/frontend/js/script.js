// =====================
// LOGIN ELEMENTS
// =====================
const login = document.querySelector(".login");
const loginForm = document.querySelector(".login__form");
const loginInput = document.querySelector(".login__input");

// =====================
// CHAT ELEMENTS
// =====================
const chat = document.querySelector(".chat");
const chatForm = document.querySelector(".chat__form");
const chatInput = document.querySelector(".chat__input");
const chatMessages = document.querySelector(".chat__messages");

// =====================
// CORES
// =====================
const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
];

// =====================
// USUÁRIO
// =====================
const user = {
    id: "",
    name: "",
    color: ""
};

let websocket;

// =====================
// MENSAGEM PRÓPRIA
// =====================
const createMessageSelfElement = (content) => {
    const div = document.createElement("div");
    div.classList.add("message--self");
    div.textContent = content;
    return div;
};

// =====================
// MENSAGEM DE OUTRO USUÁRIO
// =====================
const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div");
    div.classList.add("message--other");

    const span = document.createElement("span");
    span.classList.add("message--sender");
    span.style.color = senderColor;
    span.textContent = sender + ": ";

    div.appendChild(span);
    div.appendChild(document.createTextNode(content));

    return div;
};

// =====================
// COR ALEATÓRIA
// =====================
const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

// =====================
// ROLAR CHAT
// =====================
const scrollScreen = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// =====================
// RECEBER MENSAGEM
// =====================
const processMessage = ({ data }) => {
    const messageData = JSON.parse(data);

    const message =
        messageData.userId === user.id
            ? createMessageSelfElement(messageData.content)
            : createMessageOtherElement(
                  messageData.content,
                  messageData.userName,
                  messageData.userColor
              );

    chatMessages.appendChild(message);

    scrollScreen();
};

// =====================
// LOGIN
// =====================
const handleLogin = (event) => {
    event.preventDefault();

    const name = loginInput.value.trim();

    if (!name) {
        alert("Digite seu nome.");
        return;
    }

    user.id = crypto.randomUUID();
    user.name = name;
    user.color = getRandomColor();

    websocket = new WebSocket("ws://localhost:8080");

    websocket.onopen = () => {
        console.log("Conectado ao servidor.");

        login.style.display = "none";
        chat.style.display = "flex";
    };

    websocket.onmessage = processMessage;

    websocket.onerror = (error) => {
        console.error(error);
        alert("Erro ao conectar ao servidor.");
    };

    websocket.onclose = () => {
        console.log("Conexão encerrada.");
    };
};

// =====================
// ENVIAR MENSAGEM
// =====================
const sendMessage = (event) => {
    event.preventDefault();

    const text = chatInput.value.trim();

    if (!text) return;

    if (!websocket || websocket.readyState !== WebSocket.OPEN) {
        alert("Servidor não conectado.");
        return;
    }

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: text
    };

    websocket.send(JSON.stringify(message));

    chatInput.value = "";
    chatInput.focus();
};

// =====================
// EVENTOS
// =====================
loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);