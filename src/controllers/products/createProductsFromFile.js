const path = require('path');
// const fs = require(`fs`);
const excelToJson = require('convert-excel-to-json');

const Products = require(`../../model/products.model`);

const createProducts = (req, res) => {
	const productsFilePath = path.join(
		__dirname,
		'../../../../uploads',
		req.file.filename,
	); // Путь к сохраненному файлу

	const sendResponse = data => {
		res.json({
			status: `success`,
			updatedData: data,
		});
	};

	const sendError = err => {
		res.status(400).json({
			err: err,
		});
	};

	const result = excelToJson({
		sourceFile: productsFilePath,
		header: {
			rows: 2,
		},
		sheets: ['База данных продуктов'],
	});

	const getFiledArray = result['База данных продуктов'].map(product => ({
		title: {
			ru: product.A,
			ua: product.E,
		},
		calories: product.F,
		categories: [product.G],
		groupBloodNotAllowed: {
			1: product.H === 'НЕЛЬЗЯ',
			2: product.I === 'НЕЛЬЗЯ',
			3: product.J === 'НЕЛЬЗЯ',
			4: product.K === 'НЕЛЬЗЯ',
		},
		// groupBloodNotAllowed: {
		// 	1: `${product.H === 'НЕЛЬЗЯ'}`,
		// 	2: `${product.I === 'НЕЛЬЗЯ'}`,
		// 	3: `${product.J === 'НЕЛЬЗЯ'}`,
		// 	4: `${product.K === 'НЕЛЬЗЯ'}`
		// }
	}));

	Products.insertMany(getFiledArray, {
		bypassDocumentValidation: true,
		ordered: false,
		rawResult: false,
	})
		.then(data => {
			sendResponse(data);
		})
		.then(() => {
			// fs.unlink(productsFilePath, err => {
			// 	if (err) {
			// 		console.error(err);
			// 		// throw err
			// 	}
			// 	console.log(`${productsFilePath} was deleted`);
			// });
		})
		.catch(err => {
			sendError(err);
		});
};

module.exports = createProducts;
