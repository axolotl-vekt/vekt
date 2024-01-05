/** Importing in Mongo DB Schema */
const Info = require('../models/entryModel');
const Session = require('../models/sessionModel');
const User = require('../models/userModel');

const controller = {};

/** create user middleware
 * We should add first name and last name (and other info) to user collection
*/
controller.createUser = async (req, res, next) => {
    /** get usernmae and password from front end */
    const { firstName, lastName, username, password, phone, email } = req.body
    /** check that username and password were sent from front end
     * otherwise return error
     */
    if (!username || !password || !firstName || !lastName || !phone || !email ) {
        return next({
            log: 'Error in createUser middleware',
            status: 400,
            error: 'Error in creating user, please follow rules for username and password'
        })
    }
    /** asynchronously create new user in db
     * sending username, password
     * getting back newUser entry
     */
    try {
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            phone: phone,
            email: email,
        })
        console.log('got the newUser')
        /** sending user id back to router.js */
        res.locals.newUser = newUser._id;
        return next();
    } catch (error) { return next({
        log: 'Error in createUser middleware',
            status: 500,
            error: 'Error in creating user'
        })
    }
}

/** verify user middleware */
controller.verifyUser = async (req, res, next) => {
     /** get usernmae and password from front end */
    const { username, password } = req.body
    /** asynchronously query database to find username and password
     * and getting back verified user entry */
    try {
        const userConfirmed = await User.findOne({ username, password })
        if (userConfirmed) {
            /** sending verified user id to router.js */
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

controller.getUser = async(req, res, next) => {
    const {username} = req.body;
    try{
        const data = await User.findOne({username})
        if (data) {
            res.locals.user = data;
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

/** updateUser middleware */
controller.updateUser = async (req, res, next) => {
    /** get usernmae and password from front end */
    const { firstName, lastName, username, phone, email } = req.body
    /** deleted this bc a user should be able to change their information
     */
    // if (!firstName || !lastName || !username || !password || !phone || !email ) {
    //     return next({
    //         log: 'Error in updating user, please follow rules for username and password',
    //         status: 400,
    //         error: 'Error in updating user, please follow rules for username and password'
    //     })
    // }
    /** asynchronously update new user in db
     * sending username, password
     * getting back newUser entry
     */
    try {
        console.log('attempting update for ', username, ' with ', firstName, lastName, phone, email);
        await User.updateOne(
            {username},
            {$set: {firstName, lastName, phone, email}},
            );
        const updatedUser = await User.findOne({username})
        if (updatedUser) {
            res.locals.user = updatedUser;
            console.log('updated the user info for ', username);
            return next();
        }    
        
        /** sending user id back to router.js */
        // res.locals.user = updatedUser;

        return next();
    } catch (error) { return next ({
        log: 'Error in updateUser middleware',
            status: 500,
            error: 'Error in updating user'
        })
    };
}

/** getInfo middleware */
controller.getInfo = async (req,res,next) => {
    /** query "Info" collection of database, send back ALL data */
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


/** createEntry middleware*/
controller.createEntry = async (req, res, next) => {
    /** get username, bloodSugar, sysPressure, and diaPressure from front end */
    const { username, bloodSugar, sysPressure, diaPressure } = req.body
    /** asynchronously create document in "Info" collection */
    try {
        const newEntry = await Info.create({
            username,
            bloodSugar,
            sysPressure,
            diaPressure,
        })
        console.log('created entry')
        /** send id of document back to router.js */
        res.locals.entry = newEntry._id;
        return next();
    } catch (error) { return next({
        log: 'Error in createEntry middleware',
            status: 500,
            error: 'Error in creating entry'
        })
    }

}

/** deleteEntry middleware */
controller.deleteEntry = async (req, res, next) => {
    /** get id of data point (document in Info) from front end */
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

/** updateEntry middleware */
controller.updateEntry = async (req, res, next) => {
    /** get bloodSugar, sysPressure, diaPressure and data point id from front end */
    const { bloodSugar, sysPressure, diaPressure, id } = req.body;
    /** query Info collection using id; update document's fields */
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


/***************Cookies and Sessions********************** */

// controller.setCookie = async (req, res, next) => {
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


// controller.setCookie = (req, res, next) => {

//     res.cookie('cookie', username)

//     const ranNum = Math.floor(Math.random() * 100);

//     res.cookie('secret', `${ranNum}`);

//     return next();
// };

// controller.setSSIDCookie = (req, res, next) => {
//     const { username } = req.body;

//     if (!username) {
//         return next('Error in controller.setSSIDCookie')
//     }
//     if (res.locals.id === undefined) {
//         return next('Error in controller.setSSIDCookie: No user id')
//     }
//     res.cookie('ssid', `${res.locals.id}`, { httpOnly: true })
//     return next();
// };








module.exports = controller;
