const UserModel = require('../models/MovieModel');

const fs = require('fs');

const addPage = (req, res) => {
    return res.render('crud/add')
}
const viewPage = async (req, res) => {
    try {
        let allrecord = await UserModel.find({});
        return res.render('crud/movie', {
            record: allrecord
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const insertRecord = async (req, res) => {
    try {
        const { name, email } = req.body;
        await UserModel.create({
            name: name,
            email: email,
            image: req?.file?.path
        })
        console.log("user add");
        return res.redirect('/crud')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteRecord = async (req, res) => {
    try {
        let id = req.query.id;
        let singel = await UserModel.findById(id);
        fs.unlinkSync(singel?.image);
        await UserModel.findByIdAndDelete(id);
        return res.redirect('/crud');
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    addPage, viewPage, insertRecord, deleteRecord
}