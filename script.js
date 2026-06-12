const userContainer = document.getElementById("userContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function fetchUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        loading.style.display = "none";

        displayUsers(users);

    } catch (err) {

        loading.style.display = "none";

        error.textContent =
            "Error loading user data.";

        console.error(err);
    }
}

function displayUsers(users) {

    users.forEach(user => {

        const card = document.createElement("div");

        card.className = "col-lg-4 col-md-6";

        card.innerHTML = `
        
        <div class="card user-card shadow h-100">
            <div class="card-body text-center">

                <div class="avatar mb-3">
                    ${user.name.charAt(0)}
                </div>

                <h4>${user.name}</h4>

                <hr>

                <p>
                    <strong>Email</strong><br>
                    ${user.email}
                </p>

                <p>
                    <strong>Phone</strong><br>
                    ${user.phone}
                </p>

                <p>
                    <strong>Company</strong><br>
                    ${user.company.name}
                </p>

            </div>
        </div>
        
        `;

        userContainer.appendChild(card);
    });
}

fetchUsers();