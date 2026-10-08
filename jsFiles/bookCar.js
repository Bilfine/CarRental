let selectedCar = JSON.parse(localStorage.getItem("selectedCar"));

document.getElementById('car').src = selectedCar.image;
document.getElementById('car-name').innerText = selectedCar.name;
document.getElementById('year-color').innerText = selectedCar.extraForCar;

document.getElementById('ch-img').src = selectedCar.driverImage;
document.getElementById('ch-name').innerText = selectedCar.driverName;
document.getElementById('experience').innerText = selectedCar.experience;
document.getElementById('trips').innerText = selectedCar.driverTrips;
document.getElementById('total-estimate').innerText = "$" + selectedCar.price;

document.getElementById('btn').addEventListener('click', function() {
    let pickup = document.getElementById("pickup-location").value.trim();
    let destination = document.getElementById("destination").value.trim();
    let date = document.getElementById("pickup-date").value;
    let time = document.getElementById("pickup-time").value;
    let passengers = document.getElementById("passengers").value.trim();
    let tripType = document.getElementById("trip-type").value;
    if (pickup === "" || destination === "" || date === "" || time === "" || passengers === "") {
        alert("Please fill in all required fields.");
        return;
    }
    let dataForBook = {
        pickup: pickup,
        destination: destination,
        date: date,
        time: time,
        passengers: passengers,
        tripType: tripType
    };
    localStorage.setItem("bookData", JSON.stringify(dataForBook));
    window.location.href = "../htmlFiles/confirmed-page.html";
});