const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILES_PATH = path.join('public' , 'uploads');

// defines what the product looks like in the database
const productSchema = new mongoose.Schema({
    title : {
        type : String,
        unique : true,
    },
    price : {
        type : Number,
    },
    image : {
        type : String,
    },
    slug : {
        type : String,
    },
    description : {
        type : String,
    },
    excelFile : {
        type : String,
    }
}, {
    timestamps : true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', FILES_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })

productSchema.statics.uploadedFile = multer({ storage : storage}).single("excelFile");;
productSchema.statics.filePath = FILES_PATH;

const Product = mongoose.model('Product', productSchema);

module.exports = Product;