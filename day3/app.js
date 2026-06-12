const users =
JSON.parse(localStorage.getItem("users")) || [];

let students =
JSON.parse(localStorage.getItem("students")) || [];

let editIndex = null;

/* Auth */

function showLogin() {
loginForm.style.display = "block";
registerForm.style.display = "none";
}

function showRegister() {
loginForm.style.display = "none";
registerForm.style.display = "block";
}

registerForm.addEventListener("submit", e => {

e.preventDefault();

const email =
document.getElementById("registerEmail").value;

const password =
document.getElementById("registerPassword").value;

users.push({ email, password });

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Registered Successfully");

showLogin();
});

loginForm.addEventListener("submit", e => {

e.preventDefault();

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

const user = users.find(
u => u.email === email &&
u.password === password
);

if(user){

sessionStorage.setItem(
"loggedIn",
"true"
);

showDashboard();

}else{
alert("Invalid Credentials");
}

});

/* Dashboard */

function showDashboard(){

authContainer.style.display = "none";

dashboard.style.display = "block";

renderStudents();
}

if(sessionStorage.getItem("loggedIn")){
showDashboard();
}

logoutBtn.addEventListener("click", () => {

sessionStorage.removeItem("loggedIn");

location.reload();

});

/* Students */

studentForm.addEventListener("submit", e => {

e.preventDefault();

const student = {

name: name.value,
email: email.value,
course: course.value,
age: age.value,
grade: grade.value

};

if(editIndex !== null){

students[editIndex] = student;
editIndex = null;

}else{

students.push(student);

}

saveStudents();

studentForm.reset();

});

function saveStudents(){

localStorage.setItem(
"students",
JSON.stringify(students)
);

renderStudents();

}

function renderStudents(data = students){

studentTable.innerHTML = "";

data.forEach((student,index)=>{

studentTable.innerHTML += `

<tr>

<td>${student.name}</td>
<td>${student.email}</td>
<td>${student.course}</td>
<td>${student.age}</td>
<td>${student.grade}</td>

<td>

<button class="action-btn"
onclick="editStudent(${index})">

<i class="bi bi-pencil-fill"></i>

</button>

<button class="action-btn"
onclick="deleteStudent(${index})">

<i class="bi bi-trash-fill"></i>

</button>

</td>

</tr>

`;

});

studentCount.textContent =
students.length;

}

function editStudent(index){

editIndex = index;

name.value =
students[index].name;

email.value =
students[index].email;

course.value =
students[index].course;

age.value =
students[index].age;

grade.value =
students[index].grade;

}

function deleteStudent(index){

if(confirm("Delete Student?")){

students.splice(index,1);

saveStudents();

}

}

/* Search */

searchInput.addEventListener("keyup", () => {

const keyword =
searchInput.value.toLowerCase();

const filtered =
students.filter(student =>
student.name.toLowerCase()
.includes(keyword)
);

renderStudents(filtered);

});

/* Sort */

sortBtn.addEventListener("click", () => {

students.sort((a,b)=>
a.name.localeCompare(b.name)
);

saveStudents();

});

/* Theme */

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "dark"){
document.body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
? "dark"
: "light"
);

});