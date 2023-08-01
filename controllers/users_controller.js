module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


// render the signUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title:"User SignUp"
    })
}

//render the signIn page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title:"User SignIn"
    })
}

//get the signUp data
module.exports.create = function(req, res){}

// SignIn and create a session ffor the user
module.exports.createSession = function(req, res){}
