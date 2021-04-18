var modalBg = document.querySelector('.modal-bg');
    var modalClose = document.querySelector('.modal-close');
    modalClose.addEventListener('click',function(){
    console.log("hi")
    modalBg.classList.remove('bg-active');
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuTtJD1OBDnGOQqKf-3bVSRl7NzfpjYD8",
    authDomain: "first-project-6d4ec.firebaseapp.com",
    databaseURL: "https://first-project-6d4ec-default-rtdb.firebaseio.com",
    projectId: "first-project-6d4ec",
    storageBucket: "first-project-6d4ec.appspot.com",
    messagingSenderId: "251786846783",
    appId: "1:251786846783:web:279d5ba8076f43e3d6ce8a",
    measurementId: "G-B6T2GE3NH5"
  };

firebase.initializeApp(firebaseConfig)


var dbRef = firebase.database().ref().child("users")
dbRef.on("value",function(snap){
    // console.log(snap.val())
    console.log(snap.val())
})

function isValid()
{
    let p = document.getElementById('username').validity.valid
    let q = document.getElementById('email').validity.valid
    let r = document.getElementById('rolno').validity.valid
    let s = document.getElementById('mobile').validity.valid
    return p && q && r && s
}

function insertUser()
{
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let rolno = document.getElementById("rolno").value
    let mobile = document.getElementById("mobile").value
    
    if(!isValid())
    {
        alert("Fill in the details first");
        return;
    }
    let a = isPresent(username)
    if(a.length != 0)
    {
        alert("username already exists");
        return
    }
    
    let x = username.split(" ");
    let specialcharacter1 = username.indexOf(".")
    let specialcharacter2 = username.indexOf("#")
    let specialcharacter3 = username.indexOf("$")
    let specialcharacter4 = username.indexOf("[")
    let specialcharacter5 = username.indexOf("]")
    //  ".", "#", "$", "[", or "]"

    let val = true;
    if(specialcharacter1 != -1 || specialcharacter2 != -1 || specialcharacter3 != -1 || specialcharacter4 != -1 || specialcharacter5 != -1)
        val = false;
    if(x.length == 1 && val)
    {
        dbRef.child(username).set({
            username : username,
            email : email,
            rolno : rolno,
            mobile : mobile
        });
    }
    else{
        alert("Username should not have spaces in between and should not contains .,#,$,[,]")
    }
    
    console.log("User Created Successfully")
    readUsers()
}

function isPresent(username)
{
    let a = new Array();
    dbRef.child(username).on("child_added",function(snap){
        // console.log(snap.val())
        var ele = snap.val()
        a.push(ele)
    })
    return a;
}

function readUsers()
{
    document.getElementById("display").style.visibility = "visible"
    table = document.createElement("TABLE")
    table.border = "1"
    let row = table.insertRow(-1)
    let c1 = row.insertCell(-1)
    let c2 = row.insertCell(-1)
    let c3 = row.insertCell(-1)
    let c4 = row.insertCell(-1)
    let c5 = row.insertCell(-1)
    let c6 = row.insertCell(-1)
    c1.innerHTML = "<h2 class='text-white'><center>Username</center></h2>"
    c2.innerHTML = "<h2 class='text-white'><center>RollNo</center></h2>"
    c3.innerHTML = "<h2 class='text-white'><center>E-mail</center></h2>"
    c4.innerHTML = "<h2 class='text-white'><center>Mobile</center></h2>"
    c5.innerHTML = "<h2 class='text-white'><center>Update</center></h2>"
    c6.innerHTML = "<h2 class='text-white'><center>Delete</center></h2>"
    dbRef.on("child_added",function(snap){
        // console.log(snap.val())
        console.log("key")
        console.log(snap.key)
        let row = table.insertRow(-1)
        let cell1 = row.insertCell(-1)
        // let x = snap.val().username
        cell1.innerHTML = `<h5 class='text-white'><center>${snap.val().username}</center></h5>`
        let cell2 = row.insertCell(-1)
        cell2.innerHTML = `<h5 class='text-white'><center>${snap.val().rolno}</center></h5>`
        let cell3 = row.insertCell(-1)
        cell3.innerHTML = `<h5 class='text-white'><center>${snap.val().email}</center></h5>`
        let cell4 = row.insertCell(-1)
        cell4.innerHTML = `<h5 class='text-white'><center>${snap.val().mobile}</center></h5>`
        let cell5 = row.insertCell(-1)
        cell5.innerHTML =`<center><button class="btn" id=${snap.val().username} onClick='openModal(this)'><i class="fas fa-edit text-white"></i></button></center>`
        let cell6 = row.insertCell(-1)
        cell6.innerHTML = `<center><button class="btn" id=${snap.val().username} onClick='deleteCall(this)'><i class="fa fa-trash-alt text-white"></i></button><center>`
    })
    table.class="table-dark";
    tb = document.getElementById("list")
    tb.innerHTML = ""
    tb.appendChild(table)
}


function deleteUser()
{
    console.log("Deleting a user")
    let uname = window.prompt("Enter a username to delete");
    let a = isPresent(uname);
    if(a.length == 0){
        alert("User not yet present")
        return
    }
    let dbref = dbRef.child(uname);
    console.log(dbref)
    dbref.remove();
    alert("User Deleted")
    readUsers()
    
}

function openModal(btn)
{
    let a = isPresent(btn.id)
    // document.getElementsByClassName("modal").innerHTML = 
    var modalBg = document.querySelector('.modal-bg');
    modalBg.classList.add('bg-active');
    // console.log(document.getElementsByClassName("modal").innerHTML)
    console.log(a)
    document.getElementById("usernameUpdate").value = a[3]
    document.getElementById("usernameUpdate").readOnly = true
    document.getElementById("emailUpdate").value = a[0]
    document.getElementById("mobileUpdate").value = a[1]
    document.getElementById("rolnoUpdate").value = a[2]
}



function updateCall(c)
{

    let a = isPresent(c.id)
    document.getElementById("email").value = a[0]
    document.getElementById("mobile").value = a[1]
    document.getElementById("rolno").value = a[2]
    document.getElementById("username").value = a[3]
    alert("Your details are inserted in the form please edit the form")
}

function deleteCall(c){
    console.log(c)
    console.log(c.id)
    let dbref = dbRef.child(c.id);
    dbref.remove();
    readUsers()
}

function removeTable()
{
    document.getElementById("display").style.visibility = "hidden"
    document.getElementById("list").innerHTML = ""
}

function updateProfile()
{
    let username = document.getElementById("usernameUpdate").value
    let email = document.getElementById("emailUpdate").value
    let mobile = document.getElementById("mobileUpdate").value
    let rolno = document.getElementById("rolnoUpdate").value
    dbRef.child(username).update({
        username : username,
        email : email,
        mobile : mobile,
        rolno : rolno
    })
    alert("User Updated")
    readUsers()
}