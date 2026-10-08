let users = JSON.parse(localStorage.getItem("users")) || [];

let currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);
const realUser = users.find(
    user =>
        user.id === currentUser.id ||
        user.email === currentUser.email
);

if (realUser) {
    currentUser = realUser;
}

function renderUserProfile() {

    if (!currentUser) return;
    const userNameEl =
    document.getElementById("userName");

const membershipEl =
    document.getElementById("membership");

const memberSinceEl =
    document.getElementById("memberSince");

const welcomeAvatarEl =
    document.getElementById("welcomeAvatar");

    if (userNameEl) {

    userNameEl.textContent =
        currentUser.name || "User";
}
    if (welcomeAvatarEl) {

    welcomeAvatarEl.textContent =
        currentUser.name
            ? currentUser.name.charAt(0).toUpperCase()
            : "U";
}


    if (membershipEl) {

        membershipEl.textContent =
            currentUser.membership || "Standard";
    }


    if (memberSinceEl) {

        memberSinceEl.textContent =
            currentUser.memberSince || "";
    }
    const profileNameEl =
        document.getElementById("profileName");

    const profileMembershipEl =
        document.getElementById("profileMembership");

    const profileAvatarEl =
        document.getElementById("profileAvatar");


    if (profileNameEl) {

        profileNameEl.textContent =
            currentUser.name || "User";
    }


    if (profileMembershipEl) {

        profileMembershipEl.textContent =
            `${currentUser.membership || "Standard"} Member`;
    }


    if (profileAvatarEl) {

        profileAvatarEl.textContent =
            currentUser.name
                ? currentUser.name.charAt(0).toUpperCase()
                : "U";
    }
    const profileFullNameEl =
        document.getElementById("profileFullName");

    const profileEmailEl =
        document.getElementById("profileEmail");

    const profilePhoneEl =
        document.getElementById("profilePhone");

    const profileMemberSinceEl =
        document.getElementById("profileMemberSince");


    if (profileFullNameEl) {

        profileFullNameEl.value =
            currentUser.name || "";
    }


    if (profileEmailEl) {

        profileEmailEl.value =
            currentUser.email || "";
    }


    if (profilePhoneEl) {

        profilePhoneEl.value =
            currentUser.phoneNumber || "";
    }


    if (profileMemberSinceEl) {

        profileMemberSinceEl.value =
            currentUser.memberSince || "";
    }

}
function saveProfileChanges() {

    const name =
        document.getElementById("profileFullName").value.trim();

    const email =
        document.getElementById("profileEmail").value.trim();

    const phone =
        document.getElementById("profilePhone").value.trim();


    if (!name || !email || !phone) {

        alert("Please fill in all fields.");
        return;
    }
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;

    const userIndex = users.findIndex(
        user =>
            user.id === currentUser.id ||
            user.email === currentUser.email
    );


    if (userIndex !== -1) {

        users[userIndex] = currentUser;
    }

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );
    renderUserProfile();


    alert("Profile updated successfully!");
}

function calculateStatistics() {

    const bookings =
        currentUser.bookings || [];
    const totalTrips =
        bookings.length;
    const upcomingTrips =
        bookings.filter(
            booking =>
                booking.status === "upcoming"
        ).length;

    const totalSpent =
        bookings
            .filter(
                booking =>
                    booking.status !== "cancelled"
            )
            .reduce(
                (total, booking) =>
                    total + Number(booking.price || 0),
                0
            );


    const totalTripsEl =
        document.getElementById("totalTrips");

    const upcomingTripsEl =
        document.getElementById("upcomingTrips");

    const totalSpentEl =
        document.getElementById("totalSpent");


    if (totalTripsEl) {
        totalTripsEl.textContent =
            totalTrips;
    }


    if (upcomingTripsEl) {
        upcomingTripsEl.textContent =
            upcomingTrips;
    }


    if (totalSpentEl) {
        totalSpentEl.textContent =
            `$${totalSpent.toLocaleString()}`;
    }
}

function updateTabCounts() {

    const bookings =
        currentUser.bookings || [];


    const upcoming =
        bookings.filter(
            booking =>
                booking.status === "upcoming"
        ).length;


    const past =
        bookings.filter(
            booking =>
                booking.status === "completed"
        ).length;


    const upcomingCount =
        document.getElementById("upcomingCount");

    const pastCount =
        document.getElementById("pastCount");


    if (upcomingCount) {
        upcomingCount.textContent =
            upcoming;
    }


    if (pastCount) {
        pastCount.textContent =
            past;
    }
}
function displayBookings() {

    const container =
        document.getElementById("bookingsContainer");

    const emptyState =
        document.getElementById("emptyState");


    if (!container) return;


    container.innerHTML = "";


    const bookings =
        currentUser.bookings || [];


    const upcomingBookings =
        bookings.filter(
            booking =>
                booking.status === "upcoming"
        );


    if (upcomingBookings.length === 0) {

        if (emptyState) {

            emptyState.classList.remove("hidden");

            emptyState.innerHTML = `
                <h3>No Upcoming Bookings</h3>

                <p>
                    You don't have any upcoming trips.
                </p>
            `;
        }

        return;
    }


    if (emptyState) {
        emptyState.classList.add("hidden");
    }


    upcomingBookings.forEach(
        booking => {

            const card =
                createBookingCard(
                    booking,
                    "Upcoming"
                );

            container.appendChild(card);
        }
    );
}

function displayPastTrips() {

    const container =
        document.getElementById("bookingsContainer");

    const emptyState =
        document.getElementById("emptyState");


    if (!container) return;


    container.innerHTML = "";


    const bookings =
        currentUser.bookings || [];


    const pastBookings =
        bookings.filter(
            booking =>
                booking.status === "completed"
        );


    if (pastBookings.length === 0) {

        if (emptyState) {

            emptyState.classList.remove("hidden");

            emptyState.innerHTML = `
                <h3>No Completed Trips</h3>

                <p>
                    You don't have any completed trips yet.
                </p>
            `;
        }

        return;
    }


    if (emptyState) {
        emptyState.classList.add("hidden");
    }


    pastBookings.forEach(
        booking => {

            const card =
                createBookingCard(
                    booking,
                    "Completed"
                );

            container.appendChild(card);
        }
    );
}


function createBookingCard(
    booking,
    statusText
) {

    const card =
        document.createElement("div");

    card.className =
        "booking-card";


    const carImg =
        booking.image ||
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80";


    card.innerHTML = `

        <div class="car-image">

            <img
                src="${carImg}"
                alt="${booking.car}"
                onerror="
                    this.src='https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'
                "
            >

        </div>


        <div class="booking-info">

            <div class="booking-title">

                <h3>
                    ${booking.car}
                </h3>

                <span class="status">
                    ${statusText}
                </span>

            </div>


            <div class="location">

                <div class="location-row">

                    <span class="location-icon">
                        ●
                    </span>

                    <div>

                        <span class="location-label">
                            Pickup
                        </span>

                        <p class="location-text">
                            ${booking.pickup}
                        </p>

                    </div>

                </div>


                <div class="location-row">

                    <span class="location-icon">
                        ●
                    </span>

                    <div>

                        <span class="location-label">
                            Destination
                        </span>

                        <p class="location-text">
                            ${booking.destination}
                        </p>

                    </div>

                </div>

            </div>


            <div class="booking-details">

                <span>
                    📅
                    <strong>
                        ${booking.date}
                    </strong>
                </span>

                <span>
                    🕘
                    <strong>
                        ${booking.time}
                    </strong>
                </span>

                <span>
                    👤
                    <strong>
                        ${booking.passengers} passengers
                    </strong>
                </span>

                <span>
                    ${booking.tripType || "Standard"}
                </span>

                <span class="booking-price">
                    $${booking.price}
                </span>

            </div>

        </div>


        ${
            statusText === "Upcoming"
                ? `
                    <div class="booking-action">

                        <button
                            class="cancel-button"
                            onclick="cancelBooking(${booking.id})"
                        >
                            Cancel
                        </button>

                    </div>
                `
                : ""
        }

    `;


    return card;
}

function getFavorites() {

    if (!currentUser) {
        return [];
    }

    return currentUser.favorites || [];
}


function displayFavorites() {

    const container =
        document.getElementById("bookingsContainer");

    const emptyState =
        document.getElementById("emptyState");


    if (!container) return;


    container.innerHTML = "";


    const favorites =
        getFavorites();


    if (favorites.length === 0) {

        if (emptyState) {

            emptyState.classList.remove("hidden");

            emptyState.innerHTML = `
                <h3>No Favorite Cars</h3>

                <p>
                    You haven't added any cars to your favorites yet.
                </p>
            `;
        }

        return;
    }


    if (emptyState) {
        emptyState.classList.add("hidden");
    }


    favorites.forEach(car => {

        const card =
            document.createElement("div");

        card.className =
            "booking-card";


        card.innerHTML = `

    <div class="car-image">

        <img
            src="${car.image}"
            alt="${car.name}"
        >

    </div>


    <div class="booking-info">

        <div class="booking-title">

            <h3>${car.name}</h3>

            <span class="status">
                Favorite
            </span>

        </div>


        <div class="booking-details">

            <span>
                💺 <strong>${car.seats} seats</strong>
            </span>

            <span>
                📍 <strong>${car.distance}</strong>
            </span>

            <span>
                ⭐ <strong>${car.rating}</strong>
            </span>

            <span>
                ${car.type || "Luxury Car"}
            </span>

            <span class="booking-price">
                $${car.price}/hr
            </span>

        </div>

    </div>


    <div class="booking-action">

        <button
            class="cancel-button"
            onclick="removeFavorite(${car.id})"
        >
            Remove
        </button>

    </div>

`;

           


        container.appendChild(card);
    });
}

function removeFavorite(carId) {

    if (!currentUser) return;

    currentUser.favorites = (
        currentUser.favorites || []
    ).filter(car => car.id != carId);

    const userIndex = users.findIndex(
        user =>
            user.id === currentUser.id ||
            user.email === currentUser.email
    );

    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    displayFavorites();
}

function cancelBooking(bookingId) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmCancel) return;


    const booking =
        currentUser.bookings.find(
            booking =>
                booking.id === bookingId
        );


    if (!booking) return;


    booking.status =
        "cancelled";


    const userIndex =
        users.findIndex(
            user =>
                user.id === currentUser.id ||
                user.email === currentUser.email
        );


    if (userIndex !== -1) {

        users[userIndex] =
            currentUser;
    }


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    calculateStatistics();

    updateTabCounts();

    displayBookings();
}

function showTab(tab) {

    const bookingsSection =
        document.getElementById("bookingsSection");

    const profileSection =
        document.getElementById("profileSection");

    const sectionLabel =
        document.querySelector(".section-label");

    const sectionTitle =
        document.querySelector(".section-heading h2");


    if (tab === "profile") {

        bookingsSection.classList.add("hidden");

        profileSection.classList.remove("hidden");

        return;
    }

    bookingsSection.classList.remove("hidden");

    profileSection.classList.add("hidden");

    if (sectionLabel) {
        sectionLabel.style.display = "none";
    }

    if (tab === "upcoming") {

        if (sectionTitle) {
            sectionTitle.textContent =
                "Upcoming Bookings";
        }

        displayBookings();
    }


    else if (tab === "past") {

        if (sectionTitle) {
            sectionTitle.textContent =
                "Completed Trips";
        }

        displayPastTrips();
    }


    else if (tab === "favorites") {

        if (sectionTitle) {
            sectionTitle.textContent =
                "Favorite Cars";
        }

        displayFavorites();
    }
}


function goToBookCar() {

    window.location.href =
        "../htmlFiles/searchCar.html";
}
document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderUserProfile();

        calculateStatistics();

        updateTabCounts();

        displayBookings();


        const saveBtn =
            document.getElementById("saveChangesBtn");

        if (saveBtn) {

            saveBtn.addEventListener(
                "click",
                saveProfileChanges
            );
        }


        document
            .querySelectorAll(".tab-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(".tab-btn")
                            .forEach(btn =>
                                btn.classList.remove(
                                    "active"
                                )
                            );

                        button.classList.add(
                            "active"
                        );

                        const tab =
                            button.dataset.tab;

                        showTab(tab);
                        

                    }
                );

            });

    }
);




