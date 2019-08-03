const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename(req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });



const upload = upload.single('file')

module.exports = upload
