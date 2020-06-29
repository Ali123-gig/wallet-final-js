var auth=firebase.auth();
var firestore=firebase.firestore();
var transcationId=location.hash.substring(1,location.hash.length);
// console.log(transcationId)


var transcationFetch= async (transcationId)=>{

    //transcation fetch 

    var transcation= await firestore.collection("transcations").doc(transcationId).get();
    return transcation.data()
}

auth.onAuthStateChanged(async (user)=> {
    if (user) {
      
      var {uid}=user;
      console.log(uid)
      var transcationTitle=document.querySelector(".title");
      var transcationCost=document.querySelector(".cost");
      var transcationType=document.querySelector(".trascationType");
      var transcationDate=document.querySelector(".date");

      var transcation=await transcationFetch(transcationId);
      console.log(transcation)
     
      
    } else {
      // No user is signed in.
      location.assign("./index.html")
    }
  });