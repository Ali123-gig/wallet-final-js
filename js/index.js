var auth=firebase.auth();
var firestore=firebase.firestore();

var signInFormSubmission=(e)=>{
e.preventDefault();
var email=document.querySelector(".signIn-email").value
console.log(email)
var password=document.querySelector(".signIn-password").value
console.log(password)


}

var signupFormSubmission=(e)=>{
 e.preventDefault();
var fullname=document.querySelector(".signUp-name").value
console.log(fullname)
 var email=document.querySelector(".signUp-email").value
 console.log(email)
var password=document.querySelector(".signUp-password").value
console.log(password)
    }

var siginForm =document.querySelector(".siginForm ");
siginForm.addEventListener("submit",(e)=>signInFormSubmission(e));
var signupForm =document.querySelector(".signupForm ")
signupForm.addEventListener("submit",(e)=>signupFormSubmission(e));