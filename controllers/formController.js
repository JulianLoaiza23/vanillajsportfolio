const FormEntryModel = require("../models/formModel")

exports.createFormEntry = async (req, res) => {
    try {
        const newFormEntry = await FormEntryModel.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                formEntry: newFormEntry
            }
        });
    }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
         });
    }
}