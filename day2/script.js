const ADMIN_EMAIL = "admin@company.com";
const ADMIN_PASSWORD = "admin123";

let employees = JSON.parse(localStorage.getItem("employees")) || [];

function login() {

    try {

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const message = document.getElementById("loginMessage");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            throw new Error("Invalid Email Format");
        }

        if (password.length < 6) {
            throw new Error("Password must contain at least 6 characters");
        }

        if (
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {

            message.className = "text-success";
            message.innerText = "Login Successful";

            document
                .getElementById("loginSection")
                .classList.add("d-none");

            document
                .getElementById("dashboard")
                .classList.remove("d-none");

            displayEmployees();

        } else {

            throw new Error("Invalid Credentials");

        }

    } catch(error) {

        document.getElementById("loginMessage")
        .innerHTML = error.message;

        document.getElementById("loginMessage")
        .className = "text-danger";
    }
}

function saveEmployee() {

    try {

        const name =
            document.getElementById("name").value.trim();

        const role =
            document.getElementById("role").value.trim();

        const salary =
            document.getElementById("salary").value;

        const email =
            document.getElementById("email").value.trim();

        const editIndex =
            document.getElementById("editIndex").value;

        if (
            !name ||
            !role ||
            !salary ||
            !email
        ) {
            throw new Error("All fields are required");
        }

        const employee = {

            id: Date.now(),

            name,

            role,

            salary,

            email

        };

        if (editIndex === "") {

            employees.push(employee);

        } else {

            employee.id = employees[editIndex].id;
            employees[editIndex] = employee;

        }

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );

        clearForm();
        displayEmployees();

    } catch(error) {

        alert(error.message);

    }

}

function displayEmployees() {

    const table =
        document.getElementById("employeeTable");

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    table.innerHTML = "";

    let filteredEmployees =
        employees.filter(emp =>
            emp.name.toLowerCase().includes(search)
        );

    filteredEmployees.forEach((emp,index)=>{

        table.innerHTML += `

        <tr>

            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.role}</td>
            <td>₹${emp.salary}</td>
            <td>${emp.email}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editEmployee(${employees.indexOf(emp)})">
                    Edit
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteEmployee(${employees.indexOf(emp)})">
                    Delete
                </button>

            </td>

        </tr>

        `;
    });

    document.getElementById("employeeCount")
    .innerText = employees.length;
}

function editEmployee(index){

    document.getElementById("name").value =
        employees[index].name;

    document.getElementById("role").value =
        employees[index].role;

    document.getElementById("salary").value =
        employees[index].salary;

    document.getElementById("email").value =
        employees[index].email;

    document.getElementById("editIndex").value =
        index;
}

function deleteEmployee(index){

    let confirmDelete =
        confirm("Are you sure you want to delete?");

    if(confirmDelete){

        employees.splice(index,1);

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );

        displayEmployees();
    }
}

function clearForm(){

    document.getElementById("name").value="";
    document.getElementById("role").value="";
    document.getElementById("salary").value="";
    document.getElementById("email").value="";
    document.getElementById("editIndex").value="";
}