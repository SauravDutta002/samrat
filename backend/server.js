// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // POST /bfhl - Process input data
// app.post("/bfhl", (req, res) => {
//     const { data } = req.body;

//     if (!Array.isArray(data)) {
//         return res.status(400).json({ is_success: false, message: "Invalid input" });
//     }

//     const numbers = data.filter(item => !isNaN(item));
//     const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
//     const highestAlphabet = alphabets.length ? [alphabets.sort().reverse()[0]] : [];

//     res.json({
//         is_success: true,
//         user_id: "SamratDUtta00001",
//         email: "SAMRAT999@gmail.com",
//         roll_number: "22bai70872",
//         numbers,
//         alphabets,
//         highest_alphabet: highestAlphabet
//     });
// });

// // GET /bfhl - Return operation code
// app.get("/bfhl", (req, res) => {
//     res.json({ operation_code: 1 });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// POST /bfhl - Process input data
app.post("/bfhl", (req, res) => {
    const { data } = req.body;

    console.log("📥 Incoming Request:", req.body); // Log request to terminal

    if (!Array.isArray(data)) {
        const errorResponse = { is_success: false, message: "Invalid input" };
        console.log("❌ Response Sent:", errorResponse);
        return res.status(400).json(errorResponse);
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    const highestAlphabet = alphabets.length ? [alphabets.sort().reverse()[0]] : [];

    const response = {
        is_success: true,
        user_id: "SamratDUtta00001",
        email: "SAMRAT999@gmail.com",
        roll_number: "22bai70872",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    };

    console.log(" Response Sent:", response); // Log response to terminal
    res.json(response);
});

// GET /bfhl - Return operation code
app.get("/bfhl", (req, res) => {
    const response = { operation_code: 1 };
    console.log(" Response Sent:", response);
    res.json(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
