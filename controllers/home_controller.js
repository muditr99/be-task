const Product = require('../models/product');
const XLSX = require('xlsx');

module.exports.save = function(req, res){
    Product.uploadedFile(req, res, function(err){
        if(err){
            console.log('error in parsing', err);
            return res.status(400).json({
                message: 'encountered some problems',
            })
        }

        let workbook = XLSX.readFile(req.file.path);
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // console.log(worksheet);
        let data = XLSX.utils.sheet_to_json(worksheet, {defval:""});
        // console.log(data);
        let newData = data.map((record) => {
            // console.log(record);
            if(record.product_code === 'special-cotton-shirt-for-men' && record.price === ''){
                record.price = '15';
                console.log(record);
            }
            return record;
        })
        // console.log(newData);

        let newWb = XLSX.utils.book_new();
        let newWs = XLSX.utils.json_to_sheet(newData);
        XLSX.utils.book_append_sheet(newWb, newWs, 'New Data');

        XLSX.writeFile(newWb, 'New Data File.xlsx');
        return res.status(200).json({
            message: 'product saved in db with success!',
            file : newWb,
        })

        // if(req.file){
        //     // path of excel file saved in db
        //    let excelFile = Product.filePath + '/' + req.file.filename;
        //    req.body.excelFile = excelFile;
        //    Product.create(req.body, function(err, product){
        //     if(err){
        //         console.log("error in creating a user", err);
        //         return;
        //     }
        //     return res.status(200).json({
        //         message: 'product saved in db with success!',
        //         product : product,
        //     })
        // })

        // }
    })
}