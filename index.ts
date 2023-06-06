import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const numbers = ["+51960579316", "+51931859701", "+51969788634"];
const message = "Hey there!";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  const chatIds = numbers.map((number) => number.substring(1) + "@c.us");

  const resultsPromises = chatIds.map((chatId) =>
    client.sendMessage(chatId, message)
  );

  await Promise.all(resultsPromises);

  console.log("done!");
});

console.log(`Running`);

client.initialize();
