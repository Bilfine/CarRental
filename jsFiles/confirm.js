let dataForBook = JSON.parse(
    localStorage.getItem("bookData")
);

let car = JSON.parse(
    localStorage.getItem("selectedCar")
);

let currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);


let users = JSON.parse(
    localStorage.getItem("users")
) || [];

if (!dataForBook || !car || !currentUser) {

    alert("Please sign up to book a car");

    window.location.href = "../htmlFiles/searchCar.html";

}

function saveBooking() {

    if (!currentUser || !car || !dataForBook) {
        return;
    }


    if (dataForBook.bookingId) {

        console.log("Booking already saved.");

        return;
    }
    const newBooking = {

        id: Date.now(),

        car: car.name,

        image: car.image,

        pickup: dataForBook.pickup,

        destination: dataForBook.destination,

        date: dataForBook.date,

        time: dataForBook.time,

        passengers: Number(dataForBook.passengers),

        tripType: dataForBook.tripType,

        price: Number(car.price),

        status: "upcoming"

    };

    currentUser.bookings =currentUser.bookings || [];
    currentUser.bookings.push(newBooking);
    dataForBook.bookingId = newBooking.id;

    const userIndex = users.findIndex(

        user =>
            user.id === currentUser.id ||
            user.email === currentUser.email

    );


    if (userIndex !== -1) {

        users[userIndex] = currentUser;

    } else {

        users.push(currentUser);

    }

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    localStorage.setItem(
        "bookData",
        JSON.stringify(dataForBook)
    );
}


function displayBookingData() {

    if (!dataForBook || !car) {
        return;
    }

    const typeTrip =
        document.getElementById("type-trip");

    const pickupLoc =
        document.getElementById("Pickup-loc");

    const destinationLoc =
        document.getElementById("Destination-loc");

    const pickupDate =
        document.getElementById("Pickup-date");

    const pickupTime =
        document.getElementById("Pickup-time");

    const passengersNum =
        document.getElementById("Passengers-num");


    if (typeTrip) {

        typeTrip.innerText =
            dataForBook.tripType || "Standard";

    }


    if (pickupLoc) {

        pickupLoc.innerText =
            dataForBook.pickup || "";

    }


    if (destinationLoc) {

        destinationLoc.innerText =
            dataForBook.destination || "";

    }


    if (pickupDate) {

        pickupDate.innerText =
            dataForBook.date || "";

    }


    if (pickupTime) {

        pickupTime.innerText =
            dataForBook.time || "";

    }


    if (passengersNum) {

        passengersNum.innerText =
            dataForBook.passengers || "";

    }


    const carImage =
        document.getElementById("car");

    const carName =
        document.getElementById("car-name");

    const yearColor =
        document.getElementById("year-color");


    if (carImage) {

        carImage.src =
            car.image;

    }


    if (carName) {

        carName.innerText =
            car.name;

    }


    if (yearColor) {

        yearColor.innerText =
            car.extraForCar || "";

    }


    const driverImage =
        document.getElementById("ch-img");

    const driverName =
        document.getElementById("ch-name");

    const experience =
        document.getElementById("experience");

    const trips =
        document.getElementById("trips");


    if (driverImage) {

        driverImage.src =
            car.driverImage;

    }


    if (driverName) {

        driverName.innerText =
            car.driverName || "";

    }


    if (experience) {

        experience.innerText =
            car.experience || "";

    }


    if (trips) {

        trips.innerText =
            car.driverTrips || "";

    }

    const finalPrice =
        document.getElementById("final-price");


    if (finalPrice) {

        finalPrice.innerText =
            "$" + car.price;

    }

}

document.addEventListener(
    "DOMContentLoaded",
    function () {


        saveBooking();

        displayBookingData();
        const viewDashboardBtn =
            document.querySelector(".veiw");


        if (viewDashboardBtn) {

            viewDashboardBtn.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "../htmlFiles/dashboard.html";

                }
            );

        }
        const bookAnotherBtn =
            document.querySelector(".another-book");


        if (bookAnotherBtn) {

            bookAnotherBtn.addEventListener(
                "click",
                function () {


                    localStorage.removeItem(
                        "selectedCar"
                    );


                    localStorage.removeItem(
                        "bookData"
                    );


                    window.location.href =
                        "../htmlFiles/searchCar.html";

                }
            );

        }

    }
);