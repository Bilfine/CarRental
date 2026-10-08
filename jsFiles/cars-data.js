const carsData = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class 580",
    type: "Ultra Luxury Sedan",
    year: "2024",
    color: "Obsidian Black",
    seats: 4,
    distance: "2.4 km",
    rating: 4.98,
    price: 120,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    driver: {
      name: "James Harrington",
      trips: "1,245 completed trips",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      verified: true
    },
      // ---------------------
      from:"qena",
      to:"cairo",
      fromTome:"1",
      toTome:"12",
  },
  {
    id: 2,
    name: "BMW 7 Series 760i",
    type: "Executive Sedan",
    year: "2024",
    color: "Mineral White",
    seats: 4,
    distance: "3.7 km",
    rating: 4.96,
    price: 95,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    driver: {
      name: "Sofia Chen",
      trips: "987 completed trips",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      verified: true
    },
        // ---------------------
      from:"qena",
      to:"Alex",
      fromTome:"1",
      toTome:"12",
  },
  {
    id: 3,
    name: "Audi A8 L 60 TFSI",
    type: "Executive Sedan",
    year: "2023",
    color: "Moonlight Blue",
    seats: 4,
    distance: "4.2 km",
    rating: 4.97,
    price: 110,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    driver: {
      name: "Elena Kaslov",
      trips: "754 completed trips",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      verified: true
    },
        // ---------------------
      from:"qena",
      to:"luxor",
      fromTome:"1",
      toTome:"12",
  },
  {
    id: 4,
    name: "Cadillac Escalade ESV",
    type: "Luxury SUV",
    year: "2024",
    color: "Black Raven",
    seats: 7,
    distance: "5.1 km",
    rating: 4.95,
    price: 150,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    driver: {
      name: "Marcus Williams",
      trips: "2,300 completed trips",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      verified: true
    },
        // ---------------------
       from:"qena",
      to:"luxor",
      fromTome:"1",
      toTome:"12",
  },
  {
    id: 5,
    name: "Land Rover Range Rover SV",
    type: "Premium SUV",
    year: "2024",
    color: "Santorini Black",
    seats: 5,
    distance: "6.8 km",
    rating: 4.94,
    price: 180,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    driver: {
      name: "David Thompson",
      trips: "1,567 completed trips",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      verified: true
    },
    // ---------------------
    from:"qena",
      to:"Alex",
      fromTome:"1",
      toTome:"12",
  },
  {
    id: 6,
    name: "Rolls-Royce Ghost Extended",
    type: "Bespoke Luxury",
    year: "2024",
    color: "Midnight Emerald",
    seats: 4,
    distance: "8.5 km",
    rating: 4.99,
    price: 250,
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80",
    driver: {
      name: "Aisha Patel",
      trips: "412 completed trips",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
      verified: true
    },
      // ---------------------
       from:"qena",
      to:"cairo",
      fromTome:"1",
      toTome:"12",
  }
];
// -------------------------------------------------
let btn=document.getElementById("btn-submit-search")
btn.addEventListener("click", function () {

    let from = document.getElementById("pickup").value;
    let to = document.getElementById("destination").value;
    let time = document.getElementById("search-time").value;

    console.log(from);
    console.log(to);
    console.log(time);

    localStorage.setItem("searchFrom", from);
    localStorage.setItem("searchTo", to);
    localStorage.setItem("searchTime", time);
    window.location.href = "../htmlFiles/searchCar.html";
});