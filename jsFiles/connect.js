// const {json}=require("node:stream/consumers")

let myCarDetails={
    "Mercedes-Benz S-Class 580": {
        chauffeurName: "James Harrington",
        experience: "5 years",
        price: 120
    },
    "BMW 7 Series 760i":{
        chauffeurName: "Sofia Chen",
        experience: "3 years",
        price: 180
    },
    "Audi A8 L 60 TFSI":{
        chauffeurName: "Elena Kaslov",
        experience: "6 years",
        price: 150
    },
    "Cadillac Escalade ESV":{
        chauffeurName: "Marcus Williams",
        experience: "5 years",
        price: 200
    },
    "Land Rover Range Rover SV":{
        chauffeurName: "David Thompson",
        experience: "4 years",
        price: 190
    },
    "Rolls-Royce Ghost Extended":{
        chauffeurName: "Aisha Patel",
        experience: "3 years",
        price: 210
    }
};

document.addEventListener("DOMContentLoaded", function(){
let cards = document.querySelectorAll(".car-card");

cards.forEach(function(card){
    let btns = card.querySelector(".btn-book");
    btns.addEventListener('click',function(){
        let carName = card.querySelector("h3").innerText.trim();
        let carImage = card.querySelector("img").src;
        let YearColor = card.querySelector("p").innerText.trim();
        let chauffeurImage = card.querySelector(".driver-avatar").src;
        let trips = card.querySelector(".driver-trips").innerText.trim();

        let extraData = myCarDetails[carName];


        let myCar = {
            name: carName,
            image: carImage,
            extraForCar: YearColor,
            driverName: extraData.chauffeurName,
            driverImage: chauffeurImage,
            experience: extraData.experience,
            price: extraData.price,
            driverTrips: trips
        }

        localStorage.setItem("selectedCar" , JSON.stringify(myCar));
        window.location.href="../htmlFiles/bookCar.html";
    })

})
})
