var auth=firebase.auth();
var firestore=firebase.firestore();
var transcationId=location.hash.substring(1,location.hash.length);
var transcationForm=document.querySelector(".transcationForm");
var transcationTitle=document.querySelector(".title");
var transcationCost=document.querySelector(".cost");
var transcationType=document.querySelector(".trascationType");
var transcationDate=document.querySelector(".date");



var editTrancation= async(e,transcationId)=>{
  e.preventDefault();
 try {
  var updatedTitle=transcationTitle.value;
  var updatedCost=transcationCost.value;
  var updatedType=transcationType.value;
  var updatedDate=transcationDate.value;
var updatedTranscation={
 
  title:updatedTitle,
  cost:updatedCost,
  transcationType:updatedType,
  transcationDate:new Date(updatedDate)
}
await firestore.collection("transcations").doc(transcationId).update(updatedTranscation);
 } catch (error) {
   console.log(error)
 }
}

var transcationFetch= async (transcationId)=>{

    //transcation fetch 

try {
  var transcation= await firestore.collection("transcations").doc(transcationId).get();
  return transcation.data()
} catch (error) {
  console.log(error)
}
}

auth.onAuthStateChanged(async (user)=> {
    if (user) {
      
      var {uid}=user;
      console.log(uid)
    

      var {title,cost,transcationType:transcationMethod,transcationDate:date}=await transcationFetch(transcationId);
      // Setting values
     transcationTitle.value=title;
     transcationCost.value=cost;
     transcationType.value=transcationMethod;
     transcationDate.value=date.toDate().toISOString().split("T")[0];
    } else {
      // No user is signed in.
      location.assign("./index.html")
    }
  });
  transcationForm.addEventListener("submit",(e)=>editTrancation(e,transcationId));