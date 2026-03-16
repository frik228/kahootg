const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());

const upload = multer({ dest: "uploads/" });
let quiz = [];

// Новый маршрут для загрузки JSON (БЕЗ ОШИБОК В ТЕКСТЕ)
app.post("/upload-json", upload.single("jsonFile"), (req, res) => {
    try {
        const rawData = fs.readFileSync(req.file.path);
        quiz = JSON.parse(rawData); // Просто читаем готовые данные
        fs.unlinkSync(req.file.path);
        res.json({ status: "success", count: quiz.length });
    } catch (e) {
        res.status(500).json({ error: "Неверный формат JSON" });
    }
});

// Оставляем старый PDF на всякий случай
app.post("/upload", upload.single("pdf"), async (req, res) => {
    // ... твой текущий код с pdf-parse ...
});

app.get("/quiz", (req, res) => res.json(quiz));
app.listen(3000, () => console.log("Сервер: http://localhost:3000"));