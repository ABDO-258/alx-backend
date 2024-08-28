const listProducts = [
	{ itemId: 1, itemName: "Suitcase 250", price: 50, initialAvailableQuantity: 4 },
	{ itemId: 2, itemName: "Suitcase 450", price: 100, initialAvailableQuantity: 10 },
	{ itemId: 3, itemName: "Suitcase 650", price: 350, initialAvailableQuantity: 2 },
	{ itemId: 4, itemName: "Suitcase 1050", price: 550, initialAvailableQuantity: 5 },
];

function getItemById(id) {
	return listProducts.find(item => item.itemId === id);
}

const express = require('express');
const app = express();
const port = 1245;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.get('/list_products', (req, res) => {
	res.json(listProducts);
});

const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();

const reserveStockById = (itemId, stock) => {
	client.set(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
	const getAsync = promisify(client.get).bind(client);
	return await getAsync(`item.${itemId}`);
};

app.get('/list_products/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId);
	const product = getItemById(itemId);

	if (!product) {
			return res.json({ status: "Product not found" });
	}

	const currentQuantity = await getCurrentReservedStockById(itemId) || product.initialAvailableQuantity;
	res.json({ ...product, currentQuantity: parseInt(currentQuantity) });
});

app.get('/reserve_product/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId);
	const product = getItemById(itemId);

	if (!product) {
			return res.json({ status: "Product not found" });
	}

	const currentStock = await getCurrentReservedStockById(itemId) || product.initialAvailableQuantity;

	if (currentStock <= 0) {
			return res.json({ status: "Not enough stock available", itemId });
	}

	reserveStockById(itemId, currentStock - 1);
	res.json({ status: "Reservation confirmed", itemId });
});
