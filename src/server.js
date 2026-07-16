const { WebSocketServer } = require("ws");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT });

console.log(`Servidor WebSocket rodando na porta ${PORT}`);

wss.on("connection", (ws) => {
    console.log("✅ Cliente conectado!");

    ws.on("message", (data) => {
        try {
            const message = data.toString();

            console.log("Mensagem recebida:", message);

            // Envia a mensagem para todos os clientes conectados
            wss.clients.forEach((client) => {
                if (client.readyState === client.OPEN) {
                    client.send(message);
                }
            });

        } catch (error) {
            console.error("Erro ao processar mensagem:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Cliente desconectado.");
    });

    ws.on("error", (err) => {
        console.error("Erro no WebSocket:", err);
    });
});