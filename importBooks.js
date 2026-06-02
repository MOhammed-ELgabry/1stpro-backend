const fs = require("fs");
const axios = require("axios");

const path = "./books_500.json"; // تأكد إن الملف موجود هنا

// تحقق من وجود الملف
if (!fs.existsSync(path)) {
  console.error("❌ الملف مش موجود:", path);
  process.exit(1);
}

// اقرأ JSON
let rawData;
try {
  rawData = fs.readFileSync(path, "utf-8");
} catch (err) {
  console.error("❌ خطأ في قراءة الملف:", err.message);
  process.exit(1);
}

// حلّل JSON
let booksJson;
try {
  booksJson = JSON.parse(rawData);
} catch (err) {
  console.error("❌ JSON غير صالح:", err.message);
  process.exit(1);
}

// تحقق إن فيه array
const books = booksJson.data;
if (!Array.isArray(books)) {
  console.error("❌ الـ JSON مش array جوه data");
  process.exit(1);
}

async function importBooks() {
  let categories = [];
  let categoryMap = {};

  // جلب كل الكاتيجوريز
  try {
    const categoriesRes = await axios.get("http://localhost:1337/api/categories");
    categories = categoriesRes.data.data;
    categories.forEach(cat => {
      categoryMap[cat.attributes.name] = cat.id;
    });
  } catch (err) {
    console.error("❌ خطأ في جلب الكاتيجوريز:", err.message);
    process.exit(1);
  }

  for (const book of books) {
    try {
      // تحقق من category: حول الاسم → ID
      let categoryId = categoryMap[book.category];
      if (!categoryId) {
        // لو الاسم مش موجود، اختار random category
        categoryId = categories[Math.floor(Math.random() * categories.length)].id;
      }

      // POST للكتاب
      await axios.post("http://localhost:1337/api/books", {
        data: {
          name: book.name || "Unknown Title",
          auther: book.auther || "Unknown Author",
          year: book.year || 2020,
          price: book.price || 0,
          rate: book.rate || 3,
          description: book.description || "",
          category: categoryId,
        },
      });

      console.log("✅ Added:", book.name);
    } catch (error) {
      console.log("❌ Failed:", book.name);
      if (error.response) {
        console.log("   Status:", error.response.status);
        console.log("   Data:", error.response.data);
      } else {
        console.log("   Error:", error.message);
      }
    }
  }

  console.log("🚀 Import finished");
}

importBooks();