const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// 업로드 폴더가 없으면 생성
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// CORS 설정: 특정 도메인만 허용
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// 파일 업로드 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB 제한
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // 허용된 파일
        } else {
            cb(new Error("허용되지 않은 파일 형식입니다."), false); // 거부
        }
    },
});

// 업로드 엔드포인트 처리
app.post("/upload", (req, res, next) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            console.error("업로드 오류:", err.message);
            return res.status(400).send(`업로드 실패: ${err.message}`);
        }
        if (!req.file) {
            return res.status(400).send("업로드 실패: 파일이 없습니다.");
        }
        const filePath = `/uploads/${req.file.filename}`;
        res.json({ message: "파일 업로드 성공", filePath });
    });
});

// 파일 목록 API
app.get("/files", (req, res) => {
    fs.readdir("uploads/", (err, files) => {
        if (err) {
            return res.status(500).send("Unable to scan directory.");
        }
        const filePaths = files.map(file => `/uploads/${file}`);
        res.json(filePaths);
    });
});

// 파일 삭제 API
app.delete("/delete/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join('uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete file." });
        }
        res.json({ message: "File deleted successfully." });
    });
});

// 정적 파일 제공
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// 명시적인 라우트 설정
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/preview", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "preview.html"));
});

app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "upload.html"));
});

// 서버 실행
const PORT = 2350;
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
