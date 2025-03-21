const express = require("express");
const { getAioJ2, encryptData } = require("./J2/j2.js"); // Kiểm tra lại đường dẫn import

const app = express();

// API download
app.get("/download", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Thiếu tham số URL" });

    console.log("[INFO] Request URL:", url);

    // Mã hóa dữ liệu
    const encryptedData = encryptData(JSON.stringify({ url, unlock: true }));
    console.log("[INFO] Encrypted Data:", encryptedData);

    // Gọi API xử lý
    const data = await getAioJ2(encryptedData);
    console.log("[INFO] API Response:", data);

    if (!data) {
      return res.status(502).json({ error: "Lỗi khi lấy dữ liệu từ API" });
    }

    // Trả về JSON định dạng đẹp
    res.setHeader("Content-Type", "text/plain");
    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("[ERROR] Server Error:", error);
    return res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
});

module.exports = app; // Xuất app để Vercel xử lý
