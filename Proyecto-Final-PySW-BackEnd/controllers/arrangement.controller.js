const Arrangement = require('../models/arrangement.model')
const arrangementCtrl = {}

arrangementCtrl.createArrangement = async (req, res) => {
    var arrangement = new Arrangement(req.body);

    try {
        await arrangement.save();

        res.json({
            'status': '1',
            'msg': 'Arrangement save.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Arrangement error.'
        });
    }
}

arrangementCtrl.getArrangements = async (req, res) => {
    var arrangement = await Arrangement.find().exec();

    res.json(arrangement);
}


arrangementCtrl.getArrangementParams = async (req, res) => {
    const arrangement = await Arrangement.findById(req.params.id);

    res.json(arrangement);
}

arrangementCtrl.deleteArrangement = async (req, res) => {
    try {
        await Arrangement.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Arrangement deleted'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

arrangementCtrl.modifyArrangement = async (req, res) => {
    const alum = new Arrangement(req.body);
    try {
        await Arrangement.updateOne({ _id: req.body._id }, alum);
        res.json({
            'status': '1',
            'msg': 'Arrangement update'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Arrangement Error.'
        })
    }
}

module.exports = arrangementCtrl;
