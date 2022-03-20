module.exports.chekAuth = (req, res, next) => {
    if(req.session.userid){
        next();
    }else{
        res.redirect('/login');
    }
}