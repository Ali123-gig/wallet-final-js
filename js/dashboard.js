// console.log("object")
var auth=firebase.auth();
var firestore=firebase.firestore();
var nameDiv=document.querySelector(".name h3")
var signoutBtn=document.querySelector(".signoutBtn");
var transactionForm=document.querySelector(".transactionForm");
var transcationList=document.querySelector(".transcationList");
// console.log(nameDiv)

//fetching uid from url 

var uid=location.hash.substring(1,location.hash.length);
console.log(uid)

var renderTranscation=(transcations)=>{
  transcations.forEach((transcation,index)=>{
    var {title,cost,transcationDate,transcationId} = transcation;
    transcationList.insertAdjacentHTML(
      "beforeend" , `<div class="transcationListItem">
    <div class="renderIndex listItem">
        <h3>${++index}</h3>
    </div>
    <div class="renderTitle listItem">
        <h3>${title} </h3>
    </div>
    <div class="renderCost listItem">
        <h3>${cost}</h3>
    </div>
    <div class="renderDate listItem">
    ${transcationDate.toDate().toISOString().split("T")[0]}</div>  
<div class="viewButton listItem">
 <a href="./transcation.html#${transcationId}"><button type="button">view</button></a>
  </div> </div>`)
 });  
}
 var fetchtranscation= async (uid)=>{
   var transcations=[];
   var query=await firestore.collection("transcations").where("transcationBy","==",uid).get();
   query.forEach((doc)=>{
    //  query.push({...doc.data(),transactionId: doc.id});
   transcations.push({...doc.data(), transcationId: doc.id})

   })
   return transcations;

 }
// fetchtranscation(uid)


var usersignout= async ()=>{
await auth.signOut();
}

var fetchUserInfo= async(uid)=>{
try {
var userInfo=await firestore.collection("users").doc(uid).get();
var data=userInfo.data();
var date=data.createdAt.toDate().toISOString().split("T")[0];
console.log(date);
console.log(data)
return data;
} catch (error) {
 console.log(error)   
}
}

var transactionFormSubmission= async(e)=>{
  e.preventDefault();
 try {
  var title=document.querySelector(".title").value;
  var cost=document.querySelector(".cost").value;
  var transcationType=document.querySelector(".trascationType").value;
  var transcationDate=document.querySelector(".date").value;
if(title && cost && transcationType && transcationDate){
  var transcationObj={
    title,
    cost,
    transcationType,
    transcationDate: new Date(transcationDate),
    transcationBy:uid 
  }
// console.log(transcationObj)
await firestore.collection("transcations").add(transcationObj);
}
 } catch (error) {
   console.log(error)
   
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
    //render transcation 
    //feteching user transcation 
  var transcation = await fetchtranscation(uid);
  renderTranscation(transcation);
    // renderTranscation(transArr)
    //render process 
    } else {
      // No user is signed in.
      location.assign("./index.html")
    }
  });