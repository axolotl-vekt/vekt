const Info = require('../models/entryModel');
const Session = require('../models/sessionModel');
const User = require('../models/userModel');

const controller = {};

controller.createUser = async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        return next({
            log: 'Error in createUser middleware',
            status: 400,
            error: 'Error in creating user, please follow rules for username and password'
        })
    }
    try {
        const newUser = await User.create({
            username: username,
            password: password,
        })
        console.log('got the newUser')
        res.locals.newUser = newUser._id;
        return next();
    } catch (error) { return next({
        log: 'Error in createUser middleware',
            status: 500,
            error: 'Error in creating user'
        })
    }
}

controller.verifyUser = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const userConfirmed = await User.findOne({ username, password })
        if (userConfirmed) {
            res.locals.id = userConfirmed._id;
            return next();
        }
    } catch (error) {
        return next({
            log: 'Error in getUser middleware',
            status: 500,
            error: 'Error in getting user'
        })
    }
}

controller.getInfo = async (req,res,next) => {
    try{
        const data = await Info.find({})
        if (data) {
            res.locals.data = data;
            return next();
        }
    } catch (error) {
        return next({
            log: 'Error in getSugar middleware',
            status: 500,
            error: 'Error in retreiving sugar levels'
        })
    }
}
// controller.startSession = async (req, res, next) => {
//     if (res.locals.id == undefined) {
//         return next('Error in startSession Controller: No user id')
//     }

//     const checkForSession = await Session.findOne({ cookieId: res.locals.id });
//     if (checkForSession) return next();

//     Session.create({ cookieId: res.locals.id }, (err, sesionInfo) => {
//         if (err) {
//             return next('Error in startSession Controller: ' + err);
//         };
//         return next();
//     })
// }

// controller.setSSIDCookie = (req, res, next) => {
//     const { username } = req.body;
//     if (!username) {
//         return next('Error in userController.verifyUser')
//     }
//     if (res.locals.id === undefined) {
//         return next('Error in userController.verifyUser: No user id')
//     }
//     res.cookie('ssid', `${res.locals.id}`, { httpOnly: true })
//     return next();
// }



controller.createEntry = async (req, res, next) => {
    const { username, bloodSugar, sysPressure, diaPressure } = req.body
    try {
        const newEntry = await Info.create({
            username,
            bloodSugar,
            sysPressure,
            diaPressure,
        })
        console.log('created entry')
        res.locals.entry = newEntry._id;
        return next();
    } catch (error) { return next({
        log: 'Error in createEntry middleware',
            status: 500,
            error: 'Error in creating entry'
        })
    }

}

controller.deleteEntry = async (req, res, next) => {
    const { id } = req.params;
    console.log(req.params)
    try {
        await Info.findOneAndDelete({_id:id})
        return next();
    }
    catch(error){
        return next({
            log: 'Error in deleteEntry middleware',
            status: 500,
            error: 'Error in deleting entry'
        })
    }
}

controller.updateEntry = async (req, res, next) => {
    const { bloodSugar, sysPressure, diaPressure, id } = req.body;
    try {
        await Info.updateOne({_id:id},{bloodSugar, sysPressure, diaPressure})
        return next();
    }
    catch(error) {
        return next({
            log: 'Error in updateEntry middleware',
            status: 500,
            error: 'Error in updating entry'
        })
    }
}

module.exports = controller;