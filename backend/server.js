const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const products = require("./products");
const userIdSrvr = 0
const listUsers = []

const app = express();
const PORT = 5000;
const authServerSecret = "smth";
const products = [
    {
        id: 1,
        name: "Marlboro Gold",
        price: 140,
        img: "https://cdn.metro-group.com/cz/cz_pim_497932001002_00.png?format=jpg&quality=90",
    },
    {
        id: 2,
        name: "Heets Yellow",
        price: 120,
        img: "https://mlcigar.com/assets/images/tovar/ajkos/heets/yellow-selection.jpg",
    },
    {
        id: 3,
        name: "Camel Blue",
        price: 130,
        img: "https://www.elminapoje.cz/fotky1239/fotos/_vyr_448_52018315.webp",
    },
    {
        id: 4,
        name: "LD Red",
        price: 110,
        img: "https://img.esanitex.net/image/ae73353e-2f8f-46cd-9c30-2039b5c5239c.jpg",
    },
    {
        id: 5,
        name: "Winston Black",
        price: 150,
        img: "https://images.emujobchod.cz/obr/productFoto/attachments/winston-compact-f106-1.jpeg",
    },
    {
        id: 6,
        name: "Parliament Silver",
        price: 160,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReuBZOIozILi3ZX7PQjHSR8PGcewvwBFSciA&s",
    },
    {
        id: 7,
        name: "Davidoff Classic",
        price: 170,
        img: "https://therollnpuff.com/cdn/shop/files/images--_2024-02-15T163959.418_1200x1200.jpg?v=1707997567",
    },
    {
        id: 8,
        name: "Chesterfield Red",
        price: 115,
        img: "https://cdn.metro-group.com/cz/cz_pim_609767001002_00.png?format=jpg&quality=90",
    },
];

module.exports = products;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

const carts = {};

app.get("/:UserId"), (res) => {
    userIdSrvr += 1
    listUsers.push({id: userIdSrvr})
    res.json(userIdSrvr).status(200)
}

app.delete("/:UserId"), (res) => {
    const userId = req.params.userId;
    curlen = len(listUsers)
    listUsers = listUsers.filter(user => user.id !== userId);
    futurelen = len(listUsers)
    if(curlen === futurelen) return res.status(400).json({message: "user doesnt exist"})
    res.status(200)
}

app.get("/products", (res) => {
    if(empty(product)){
        return res.status(404).json({ message: "no product found" });
    }
    res.json(products).status(200);
});


app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product).status(200);
});


app.get("/carts/:userId", (req, res) => {
  const cart = carts[req.params.userId] || [];
  if(!cart){
    return res.status(400).json({message: "users cart not found"})
  }
  res.json(cart).status(200);
});


app.post("/carts/:userId", (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.userId;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (quantity > product.stock) {
    return res.status(400).json({ message: "Not enough stock" });
  }
  if (!carts[userId]) carts[userId] = [];
  const productAdded = carts[userId].find(p => p.productId === productId);

  if (productAdded) {
    productAdded.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }
  res.json(carts[userId]).status(200);
});


function validateToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Invalid Authorization header"
        });
    }
    const token = header.split(" ")[1];
    try {
        const decoded_token = jwt.verify(token, authServerSecret);
        if (decoded_token.iss !== "northauth") {
            return res.status(401).json({
                success: false,
                message: "Invalid issuer"
            });
        }

        if (decoded_token.aud !== "eshop-service") {
            return res.status(401).json({
                success: false,
                message: "audition is not eshop-service"
            });
        }
        request.capability = decoded_token;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

app.delete("/carts/:userId", (req, res) => {
  const { productId } = req.body;
  const userId = req.params.userId;
  if (!carts[userId]) return res.json([]).status(400);
  carts[userId] = carts[userId].filter(p => p.productId !== productId);
  res.json(carts[userId]).status(200);
});


app.post("/carts/:userId/buy", (req, res) => {
  const userId = req.params.userId;
  if (!carts[userId]) return res.status(400).json({ message: "Cart is empty" });
  carts[userId].forEach(product => {
    const { productId, quantity } = product;
    products.find(p => p.productId === productId).quantity -= quantity;
  });
  res.status(200).json(carts[userId]);
  carts[userId] = []
});


app.listen(PORT, () => {
    console.log(`Eshop server running on http://localhost:${PORT}`);
});
