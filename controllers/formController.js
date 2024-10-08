const FormEntryModel = require("../models/formModel")

exports.createFormEntry = async (req, res) => {
    try {
        await FormEntryModel.create(req.body);
    }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
         });
    }
}