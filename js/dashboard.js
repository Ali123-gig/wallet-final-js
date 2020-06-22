// console.log("object")
var auth=firebase.auth();
var firestore=firebase.firestore();
var nameDiv=document.querySelector(".name h3")
var signoutBtn=document.querySelector(".signoutBtn");
// console.log(nameDiv)

//fetching uid from url 

// var uid=location.hash.substring(1,location.hash.length);
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

// fetchUserInfo(uid);
signoutBtn.addEventListener("click",usersignout);
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