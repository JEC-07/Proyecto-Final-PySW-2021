const User = require('../models/user.model');
const userCtrl = {}
const jwt = require('jsonwebtoken');


userCtrl.createUser = async (req, res) => {
    var alum = new User(req.body);
    try {
        await alum.save();
        res.json({
            alum: alum,
            'status': '1',
            'msg': 'alumno guardado.'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion al guardar el alumno.'
        })
    }
}

userCtrl.getUsers = async (req, res) => {
    var alum = await User.find().populate("owner.coach").populate("owner.student");
    res.json(alum);
}


userCtrl.getUserParams = async (req, res) => {
    const pas = await User.findById(req.params.id)
    res.json(pas);
}

userCtrl.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'alumno borrado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

userCtrl.modifyUser = async (req, res) => {
    const alum = new User(req.body);
    try {
        await user.updateOne({ _id: req.body._id }, alum);
        res.json({
            'status': '1',
            'msg': 'alumno actualizada'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion de modificacion'
        })
    }
}


userCtrl.loginUsuario = async (req, res)=>{
    const criteria = {
    Username: req.body.username,
    Password: req.body.password
    }
    User.findOne(criteria, function(err, user) {
    if (err) {
    res.json({
    status: 0,
    message: 'error'})
    };
    if (!user) {
    res.json({
    status: 0,
    message: "not found" })
    } else {
    const unToken = jwt.sign({id: user._id, rol:user.typeUser}, "secretkey");
    res.json({
    status: 1,
    message: "success",
    username: user.username,
    owner: user.owner,
    token: unToken
    });
    }
    }).populate("owner.student").populate("owner.coach");
   }
   


module.exports = userCtrl;