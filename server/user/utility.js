const signupModal= require("./modals/signup-modal");

//asynchronous operation
const checkExistingUser = async (username)=>{      //.its a reusable function
    let existingUser = false;
    await signupModal.find({username: username}).then((userData)=>{
        if(userData.length){
            existingUser = true;
        }
    });
    return existingUser;
}

module.exports = checkExistingUser;