// import express from "express";
// import path from "path";

// const app = express();
// const PORT = 3000;

// // Указываем путь к папке, где находится статический контент (включая index.html)
// app.use(express.static("dist"));

// app.get("/", (req, res) => {
// 	res.send("<h1> Hello </h1>");
// 	// Отправляем файл index.html из папки src
// 	res.sendFile(path.join(__dirname, "./src/index.html"));
// 	// res.sendFile(path.resolve(__dirname, "src", "index.html"));
// });

// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`);
// });

// import express from "express";
// import path from "path";

// const app = express();
// const PORT = 3000;

// // Указываем путь к папке со статическим контентом
// app.use(express.static("dist"));

// // Обработка всех маршрутов для SPA
// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });

// // Запуск сервера
// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`);
// });
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static("./dist"));
app.get("*", (_req, res) => {
	res.sendFile(path.join(dirname, "dist/index.html"));
});
server.listen(PORT, () => {
	// eslint-disable-next-line no-undef
	console.log(`App listening on port ${PORT}!`);
});
