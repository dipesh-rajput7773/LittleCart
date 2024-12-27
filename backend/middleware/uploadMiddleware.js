const multer = require('multer');
const path = require('path');

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Define where to store the file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Create a unique filename
  },
});

// File filter to accept only certain image types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;  // Allowed file types
  const mimeType = fileTypes.test(file.mimetype);
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);  // Accept the file
  }
  cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.'));
};

// Create the Multer instance with file size limit, file filter, and storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Max file size: 10MB
  fileFilter: fileFilter,
}).single('img');  // Expect 'img' as the field name for the file upload

// Export the upload middleware
module.exports = upload;
