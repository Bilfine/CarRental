let selectedSeats = "any";
let selectedTypes = [];
let maxPrice = 300;
let searchPickupQuery = "";
let searchDestinationQuery = "";

function getFavorites() {
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        return [];
    }

    return currentUser.favorites || [];
}


function isFavorite(carId) {
    const favorites = getFavorites();

    return favorites.some(car => car.id == carId);
}


function toggleFavorite(carId) {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        alert("Please login first.");
        return;
    }

    let favorites = currentUser.favorites || [];

    const car = carsData.find(
        car => car.id == carId
    );

    if (!car) return;

    const existingIndex = favorites.findIndex(
        favorite => favorite.id == carId
    );

    // Remove from favorites
    if (existingIndex !== -1) {

        favorites.splice(existingIndex, 1);

    }

    // Add to favorites
    else {

        favorites.push({

            id: car.id,
            name: car.name,
            image: car.image,
            type: car.type,
            seats: car.seats,
            price: car.price,
            year: car.year,
            color: car.color,
            distance: car.distance,
            rating: car.rating

        });

    }

    // Update current user
    currentUser.favorites = favorites;

    // Save current user
    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    // Update users array too
    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const userIndex = users.findIndex(
        user =>
            user.id === currentUser.id ||
            user.email === currentUser.email
    );

    if (userIndex !== -1) {

        users[userIndex] = currentUser;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

    applyFilters();
}
document.addEventListener("DOMContentLoaded", () => {

      const from = localStorage.getItem("searchFrom");
// -----------------------------------------------------------
    const to = localStorage.getItem("searchTo");
    const time = localStorage.getItem("searchTime");

    if (from && to) {

        const filteredCars = carsData.filter(car =>
            car.from === from &&
            car.to === to
        );

        renderCars(filteredCars);

    } else {

        renderCars(carsData);

    }

    setupEventListeners();
// ------------------------------------------------------------


    // Dashboard Button
    const dashBtn =
        document.getElementById("btn-to-dashboard");


    if (dashBtn) {

        dashBtn.addEventListener("click", () => {

            window.location.href = "dashboard.html";

        });

    }

});

function renderCars(cars) {

    const container =
        document.getElementById("cars-grid");

    const countEl =
        document.getElementById("results-count");


    if (!container) return;


    container.innerHTML = "";


    if (countEl) {

        countEl.innerText =
            `${cars.length} results`;

    }

    if (cars.length === 0) {

        container.innerHTML = `
            <p style="
                color: var(--text-secondary);
                font-size: 16px;
                padding: 30px;
            ">
                No cars found.
            </p>
        `;

        return;
    }
    cars.forEach(car => {

        const cardHTML = `

            <div class="car-card">

                <!-- Car Image -->
                <div class="car-image">

                    <img
                        src="${car.image}"
                        alt="${car.name}"
                    >


                    <!-- Price -->
                    <div class="car-price-tag">

                        $${car.price}

                        <small>/ hr</small>

                    </div>


                    <!-- Favorite -->
                    <button
                        class="favorite-btn ${
                            isFavorite(car.id)
                                ? "favorite-active"
                                : ""
                        }"
                        data-favorite-id="${car.id}"
                    >

                        ${
                            isFavorite(car.id)
                                ? "♥"
                                : "♡"
                        }

                    </button>

                </div>


                <!-- Car Body -->
                <div class="car-body">


                    <h3>
                        ${car.name}
                    </h3>


                    <p style="
                        color: var(--text-secondary);
                        font-size: 12px;
                        margin-top: 4px;
                    ">

                        ${car.year} • ${car.color}

                    </p>


                    <!-- Specs -->
                    <div class="car-specs">

                        <span>
                            💺 ${car.seats} seats
                        </span>

                        <span>
                            📍 ${car.distance}
                        </span>

                        <span>
                            ⭐ ${car.rating}
                        </span>

                    </div>


                    <!-- Driver -->
                    <div class="driver-info">


                        <img
                            src="${car.driver.avatar}"
                            class="driver-avatar"
                            alt="${car.driver.name}"
                        >


                        <div>

                            <div style="
                                font-size: 13px;
                                font-weight: bold;
                            ">

                                ${car.driver.name}

                            </div>


                            <div
                                style="
                                    font-size: 11px;
                                    color: var(--text-secondary);
                                "
                                class="driver-trips"
                            >

                                ${car.driver.trips}

                            </div>

                        </div>

                    </div>


                    <!-- Book Button -->
                    <div class="card-actions">

                        <button
                            class="btn-book"
                            data-car-id="${car.id}"
                        >

                            Book Now

                        </button>

                    </div>


                </div>

            </div>

        `;


        container.insertAdjacentHTML(
            "beforeend",
            cardHTML
        );

    });

    container.onclick = function (e) {

        if (
            e.target.classList.contains(
                "favorite-btn"
            )
        ) {

            const carId =
                e.target.dataset.favoriteId;


            toggleFavorite(carId);


            return;
        }

        if (
            e.target.classList.contains(
                "btn-book"
            )
        ) {

            const carId =
                e.target.dataset.carId;


            const selectedCar =
                carsData.find(
                    car => car.id == carId
                );


            if (!selectedCar) return;


            const myCar = {

                name:
                    selectedCar.name,

                image:
                    selectedCar.image,

                extraForCar:
                    `${selectedCar.year} • ${selectedCar.color}`,

                driverName:
                    selectedCar.driver.name,

                driverImage:
                    selectedCar.driver.avatar,

                driverTrips:
                    selectedCar.driver.trips,

                experience:
                    myCarDetails[
                        selectedCar.name
                    ]?.experience || "",

                price:
                    myCarDetails[
                        selectedCar.name
                    ]?.price ||
                    selectedCar.price
            };

            localStorage.setItem(
                "selectedCar",
                JSON.stringify(myCar)
            );

            window.location.href =
                "bookCar.html";

        }

    };

}
function setupEventListeners() {

    document
        .querySelectorAll(".filter-type")
        .forEach(checkbox => {

            checkbox.addEventListener(
                "change",
                () => {

                    selectedTypes =
                        Array.from(
                            document.querySelectorAll(
                                ".filter-type:checked"
                            )
                        ).map(
                            checkbox =>
                                checkbox.value
                        );


                    applyFilters();

                }
            );

        });

    document
        .querySelectorAll(".seat-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {


                    document
                        .querySelectorAll(
                            ".seat-btn"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    event.target.classList.add(
                        "active"
                    );


                    selectedSeats =
                        event.target.dataset.seats;


                    applyFilters();

                }
            );

        });
  // 4. فلتر السعر (Range Input)

    const priceInput =
        document.getElementById(
            "price-range"
        );


    if (priceInput) {

        priceInput.addEventListener(
            "input",
            event => {

                maxPrice =
                    parseInt(
                        event.target.value
                    );


                const priceValue =
                    document.getElementById(
                        "price-value"
                    );


                if (priceValue) {

                    priceValue.innerText =
                        `$${maxPrice}`;

                }


                applyFilters();

            }
        );

    }

  // 5. القائمة المنسدلة للفرز (Sorting)

    const sortSelect =
        document.getElementById(
            "sort-select"
        );


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            applyFilters
        );

    }


    // 6. زر إعادة الضبط (Reset)

    const resetButton =
        document.getElementById(
            "reset-filters"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {


                selectedSeats = "any";

                selectedTypes = [];

                maxPrice = 300;
                document
                    .querySelectorAll(
                        ".filter-type"
                    )
                    .forEach(
                        checkbox =>
                            checkbox.checked = false
                    );
                document
                    .querySelectorAll(
                        ".seat-btn"
                    )
                    .forEach(
                        button =>
                            button.classList.remove(
                                "active"
                            )
                    );


                const anySeat =
                    document.querySelector(
                        '.seat-btn[data-seats="any"]'
                    );


                if (anySeat) {

                    anySeat.classList.add(
                        "active"
                    );

                }

                if (priceInput) {

                    priceInput.value = 300;

                }


                const priceValue =
                    document.getElementById(
                        "price-value"
                    );


                if (priceValue) {

                    priceValue.innerText =
                        "$300";

                }


                if (sortSelect) {

                    sortSelect.value =
                        "nearest";

                }


                applyFilters();

            }
        );

    }

}



function applyFilters() {


    let filtered =
        carsData.filter(car => {


            // Car Type
            const matchType =
                selectedTypes.length === 0 ||
                selectedTypes.includes(
                    car.type
                );


            // Price
            const matchPrice =
                car.price <= maxPrice;


            // Seats
            const matchSeats =
                selectedSeats === "any" ||
                car.seats >=
                parseInt(selectedSeats);


            return (
                matchType &&
                matchPrice &&
                matchSeats
            );

        });


    // ======================================
    // SORT
    // ======================================

    const sortSelect =
        document.getElementById(
            "sort-select"
        );


    if (sortSelect) {


        const sortValue =
            sortSelect.value;


        // Price Low → High
        if (
            sortValue === "price-low"
        ) {

            filtered.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        // Price High → Low
        else if (
            sortValue === "price-high"
        ) {

            filtered.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        // Nearest
        else if (
            sortValue === "nearest"
        ) {

            filtered.sort(
                (a, b) =>
                    parseFloat(a.distance) -
                    parseFloat(b.distance)
            );

        }

    }


    // Render
    renderCars(filtered);

}
