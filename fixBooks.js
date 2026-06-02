const axios = require("axios");

async function fixBooks() {
  const books = await axios.get("http://localhost:1337/api/books");
  const categories = await axios.get("http://localhost:1337/api/categories");

  const categoryIds = categories.data.data.map((c) => c.id);

  for (let i = 0; i < books.data.data.length; i++) {
    const book = books.data.data[i];
    const randomCategory =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];

    await axios.put(`http://localhost:1337/api/books/${book.id}`, {
      data: {
        auther: "Unknown Author",
        rate: Math.floor(Math.random() * 5) + 1,
        category: randomCategory,
      },
    });

    console.log("Updated book:", book.id);
  }

  console.log("Done fixing books 🚀");
}

fixBooks();