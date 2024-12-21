const multer = require('multer');
const path = require('path');

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for storing images
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define the file name (timestamp + file extension to avoid name collisions)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer file filter for validating file types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;  // Allowed image types
  const mimeType = fileTypes.test(file.mimetype);
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.'));
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Max file size 10MB
  fileFilter: fileFilter,
}).single('img'); 

module.exports = upload;
