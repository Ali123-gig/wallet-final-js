var auth=firebase.auth();
var firestore=firebase.firestore();
var siginForm =document.querySelector(".siginForm ");
var signupForm =document.querySelector(".signupForm ");
var googleBtn=document.querySelector(".googleBtn");




var signInFormSubmission= async (e)=>{
e.preventDefault();
try {
var email=document.querySelector(".signIn-email").value
var password=document.querySelector(".signIn-password").value
if(email&&password){
    //login user 
    var {user:{uid}}=await auth.signInWithEmailAndPassword(email,password);
    //fetchuserinfo
    var userInfo=await firestore.collection("users").doc(uid).get();
    console.log(userInfo.data()) 
    //redirect 
    location.assign(`./dashboard.html#${uid}`);

}
} catch (error) {
  console.log(error.message)  
}
}

var signupFormSubmission= async (e)=>{
 e.preventDefault();
try {
var fullname=document.querySelector(".signUp-name").value
var email=document.querySelector(".signUp-email").value
var password=document.querySelector(".signUp-password").value
if(fullname&&email&&password){
    var {user:{uid}}= await auth.createUserWithEmailAndPassword(email, password);
    var userObj={
        fullname:fullname,
        email:email,
        createdAt:new Date()
    }
   await firestore.collection("users").doc(uid).set(userObj);
   location.assign(`./dashboard.html#${uid}`);

}


} catch (error) {
console.log(error.message);    
}

    }
signupForm.addEventListener("submit",(e)=>signupFormSubmission(e));
siginForm.addEventListener("submit",(e)=>signInFormSubmission(e));
googleBtn.addEventListener("click",async () =>{
    try {
        
            var googleProvider = new firebase.auth.GoogleAuthProvider();
            var {additionalUserInfo:{isNewUser},user:{displayName,email,uid}}= await firebase.auth().signInWithPopup(googleProvider);
         if(isNewUser){
            var userObj={
                fullname:displayName,
                email:email,
                createdAt:new Date()
            }
            console.log(userObj)
        await firestore.collection("users").doc(uid).set(userObj);
    location.assign(`./dashboard.html#${uid}`);

         }
         else{
    location.assign(`./dashboard.html#${uid}`);
            
         }
        } catch (error) {
            console.log(error);
        }

});

