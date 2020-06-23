// console.log("object")
var auth=firebase.auth();
var firestore=firebase.firestore();
var nameDiv=document.querySelector(".name h3")
var signoutBtn=document.querySelector(".signoutBtn");
var transactionForm=document.querySelector(".transactionForm");
// console.log(nameDiv)

//fetching uid from url 

var uid=location.hash.substring(1,location.hash.length);
// console.log(uid)

var usersignout= async ()=>{
await auth.signOut();
}

var fetchUserInfo= async(uid)=>{
try {
var userInfo=await firestore.collection("users").doc(uid).get();
var data=userInfo.data();
console.log(data)
return data;

// var date=data.createdAt.toDate().toISOString().split("T")[0];


} catch (error) {
 console.log(error)   
}
}

var transactionFormSubmission=(e)=>{
  e.preventDefault();
  var title=document.querySelector(".title").value;
  var cost=document.querySelector(".cost").value;
  var transcationType=document.querySelector(".trascationType").value;
  var date=document.querySelector(".date").value;
if(title && cost && transcationType && date){
  var transcationObj={
    title,
    cost,
    transcationType,
    date,
    transcationBy:uid 
  }
console.log(transcationObj)
}
}

// fetchUserInfo(uid);
signoutBtn.addEventListener("click",usersignout);


transactionForm.addEventListener("submit",(e)=>transactionFormSubmission(e));
//auth listener 
auth.onAuthStateChanged(async (user)=> {
    if (user) {
      // User is signed in.
      var {uid}=user;
      var userInfo=await fetchUserInfo(uid)
    nameDiv.textContent=userInfo.fullname;
    } else {
      // No user is signed in.
      location.assign("./index.html")
    }
  });