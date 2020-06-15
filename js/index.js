var auth=firebase.auth();
var firestore=firebase.firestore();

var signInFormSubmission= async (e)=>{
e.preventDefault();
try {
var email=document.querySelector(".signIn-email").value
var password=document.querySelector(".signIn-password").value
if(email&&password){
    var user=await auth.signInWithEmailAndPassword(email,password);
    console.log("done") 
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
}


} catch (error) {
console.log(error.message);    
}

    }

var siginForm =document.querySelector(".siginForm ");
siginForm.addEventListener("submit",(e)=>signInFormSubmission(e));
var signupForm =document.querySelector(".signupForm ")
signupForm.addEventListener("submit",(e)=>signupFormSubmission(e));