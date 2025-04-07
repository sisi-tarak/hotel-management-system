// Global variables
let currentPage = 1;
const itemsPerPage = 10;

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize based on current page
  const path = window.location.pathname.split("/").pop();

  // Set active menu item
  setActiveMenuItem(path);

  // Initialize page-specific functions
  switch (path) {
    case "index.html":
    case "":
      initLoginPage();
      break;
    case "home.html":
      initHomePage();
      break;
    case "rooms.html":
      initRoomsPage();
      break;
    case "reservations.html":
      initReservationsPage();
      break;
    case "guests.html":
      initGuestsPage();
      break;
    case "staff.html":
      initStaffPage();
      break;
    case "reports.html":
      initReportsPage();
      break;
  }

  // Common initializations
  initCommonElements();
});

// Set active menu item
function setActiveMenuItem(currentPage) {
  const menuItems = document.querySelectorAll(".sidebar nav ul li");
  if (menuItems.length > 0) {
    menuItems.forEach((item) => {
      item.classList.remove("active");
      const link = item.querySelector("a").getAttribute("href");
      if (link === currentPage) {
        item.classList.add("active");
      }
    });
  }
}

// Initialize common elements
function initCommonElements() {
  // Update date and time
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Logout button
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

  // Modal close buttons
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
}

// Update current date and time
function updateDateTime() {
  const now = new Date();
  const dateElement = document.getElementById("currentDate");
  const timeElement = document.getElementById("currentTime");

  if (dateElement) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    dateElement.textContent = now.toLocaleDateString("en-US", options);
  }

  if (timeElement) {
    timeElement.textContent = now.toLocaleTimeString("en-US");
  }
}

// Login Page
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simple validation
      if (username === "admin" && password === "admin123") {
        window.location.href = "home.html";
      } else {
        alert("Invalid username or password");
      }
    });
  }
}

// Home Page
function initHomePage() {
  // Sample data for recent bookings
  const recentBookings = [
    {
      id: "BK1001",
      name: "John Smith",
      type: "Deluxe",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      status: "Checked-in",
    },
    {
      id: "BK1002",
      name: "Sarah Johnson",
      type: "Suite",
      checkIn: "2023-06-16",
      checkOut: "2023-06-18",
      status: "Confirmed",
    },
    {
      id: "BK1003",
      name: "Michael Brown",
      type: "Double",
      checkIn: "2023-06-14",
      checkOut: "2023-06-17",
      status: "Checked-out",
    },
    {
      id: "BK1004",
      name: "Emily Davis",
      type: "Single",
      checkIn: "2023-06-18",
      checkOut: "2023-06-22",
      status: "Confirmed",
    },
    {
      id: "BK1005",
      name: "Robert Wilson",
      type: "Deluxe",
      checkIn: "2023-06-12",
      checkOut: "2023-06-15",
      status: "Checked-out",
    },
  ];

  // Populate recent bookings table
  const bookingsTable = document.getElementById("recentBookingsTable");
  if (bookingsTable) {
    bookingsTable.innerHTML = recentBookings
      .map(
        (booking) => `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.name}</td>
                <td>${booking.type}</td>
                <td>${booking.checkIn}</td>
                <td>${booking.checkOut}</td>
                <td><span class="status status-${booking.status
                  .toLowerCase()
                  .replace(" ", "-")}">${booking.status}</span></td>
            </tr>
        `
      )
      .join("");
  }

  // Initialize occupancy chart
  const ctx = document.getElementById("occupancyChart");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Occupancy Rate %",
            data: [65, 59, 70, 71, 76, 78, 82, 85, 80, 75, 70, 68],
            backgroundColor: "rgba(52, 152, 219, 0.7)",
            borderColor: "rgba(52, 152, 219, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }
}

// Rooms Page
function initRoomsPage() {
  // Sample room data
  const rooms = [
    {
      number: "101",
      type: "Single",
      price: 120,
      capacity: 1,
      status: "Available",
      amenities: ["wifi", "tv", "ac"],
    },
    {
      number: "102",
      type: "Single",
      price: 120,
      capacity: 1,
      status: "Available",
      amenities: ["wifi", "tv", "ac"],
    },
    {
      number: "201",
      type: "Double",
      price: 180,
      capacity: 2,
      status: "Occupied",
      amenities: ["wifi", "tv", "ac", "minibar"],
    },
    {
      number: "202",
      type: "Double",
      price: 180,
      capacity: 2,
      status: "Available",
      amenities: ["wifi", "tv", "ac", "minibar"],
    },
    {
      number: "301",
      type: "Suite",
      price: 250,
      capacity: 2,
      status: "Maintenance",
      amenities: ["wifi", "tv", "ac", "minibar", "safe"],
    },
    {
      number: "302",
      type: "Suite",
      price: 250,
      capacity: 2,
      status: "Available",
      amenities: ["wifi", "tv", "ac", "minibar", "safe"],
    },
    {
      number: "401",
      type: "Deluxe",
      price: 350,
      capacity: 2,
      status: "Occupied",
      amenities: ["wifi", "tv", "ac", "minibar", "safe"],
    },
    {
      number: "402",
      type: "Deluxe",
      price: 350,
      capacity: 2,
      status: "Available",
      amenities: ["wifi", "tv", "ac", "minibar", "safe"],
    },
    {
      number: "501",
      type: "Deluxe",
      price: 400,
      capacity: 4,
      status: "Available",
      amenities: ["wifi", "tv", "ac", "minibar", "safe"],
    },
    {
      number: "502",
      type: "Deluxe",
      price: 400,
      capacity: 4,
      status: "Occupied",
      amenities: ["wifi", "tv", "ac", "minibar", "safe"],
    },
    {
      number: "503",
      type: "Deluxe",
      price: 400,
      capacity: 4,
      status: "Available",
      amenities: ["wifi", "tv", "ac", "minibar", "safe"],
    },
  ];

  // Add Room Button
  const addRoomBtn = document.getElementById("addRoomBtn");
  if (addRoomBtn) {
    addRoomBtn.addEventListener("click", function () {
      document.getElementById("addRoomModal").style.display = "flex";
    });
  }

  // Apply Filters Button
  const applyFiltersBtn = document.getElementById("applyFilters");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function () {
      const typeFilter = document.getElementById("roomTypeFilter").value;
      const statusFilter = document.getElementById("roomStatusFilter").value;

      const filteredRooms = rooms.filter((room) => {
        const typeMatch =
          typeFilter === "all" || room.type.toLowerCase() === typeFilter;
        const statusMatch =
          statusFilter === "all" || room.status.toLowerCase() === statusFilter;
        return typeMatch && statusMatch;
      });

      renderRoomsTable(filteredRooms);
    });
  }

  // Reset Filters Button
  const resetFiltersBtn = document.getElementById("resetFilters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function () {
      document.getElementById("roomTypeFilter").value = "all";
      document.getElementById("roomStatusFilter").value = "all";
      renderRoomsTable(rooms);
    });
  }

  // Pagination
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  if (prevPageBtn && nextPageBtn && pageInfo) {
    prevPageBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderRoomsTable(rooms);
      }
    });

    nextPageBtn.addEventListener("click", function () {
      const totalPages = Math.ceil(rooms.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderRoomsTable(rooms);
      }
    });
  }

  // Add Room Form
  const addRoomForm = document.getElementById("addRoomForm");
  if (addRoomForm) {
    addRoomForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const roomNumber = document.getElementById("roomNumber").value;
      const roomType = document.getElementById("roomType").value;
      const roomPrice = document.getElementById("roomPrice").value;
      const roomCapacity = document.getElementById("roomCapacity").value;

      const amenities = [];
      document
        .querySelectorAll('input[name="amenities"]:checked')
        .forEach((checkbox) => {
          amenities.push(checkbox.value);
        });

      // In a real app, you would send this data to the server
      console.log("New room added:", {
        number: roomNumber,
        type: roomType,
        price: roomPrice,
        capacity: roomCapacity,
        amenities: amenities,
      });

      // Close modal and reset form
      document.getElementById("addRoomModal").style.display = "none";
      addRoomForm.reset();

      // Show success message
      alert("Room added successfully!");
    });
  }

  // Initial render
  renderRoomsTable(rooms);

  // Function to render rooms table
  function renderRoomsTable(roomsData) {
    const tableBody = document.getElementById("roomsTableBody");
    if (!tableBody) return;

    const totalPages = Math.ceil(roomsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, roomsData.length);
    const paginatedRooms = roomsData.slice(startIndex, endIndex);

    tableBody.innerHTML = paginatedRooms
      .map(
        (room) => `
            <tr>
                <td>${room.number}</td>
                <td>${room.type}</td>
                <td>$${room.price}</td>
                <td>${room.capacity}</td>
                <td><span class="status status-${room.status.toLowerCase()}">${
          room.status
        }</span></td>
                <td>${room.amenities
                  .map((a) => a.toUpperCase())
                  .join(", ")}</td>
                <td>
                    <button class="btn btn-outline btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `
      )
      .join("");

    // Update pagination info
    if (pageInfo) {
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    if (prevPageBtn) {
      prevPageBtn.disabled = currentPage === 1;
    }

    if (nextPageBtn) {
      nextPageBtn.disabled = currentPage === totalPages;
    }
  }
}

// Reservations Page
function initReservationsPage() {
  // Sample reservation data
  const reservations = [
    {
      id: "RES1001",
      guest: "John Smith",
      room: "401",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      status: "Checked-in",
      amount: 1750,
    },
    {
      id: "RES1002",
      guest: "Sarah Johnson",
      room: "301",
      checkIn: "2023-06-16",
      checkOut: "2023-06-18",
      status: "Confirmed",
      amount: 500,
    },
    {
      id: "RES1003",
      guest: "Michael Brown",
      room: "201",
      checkIn: "2023-06-14",
      checkOut: "2023-06-17",
      status: "Checked-out",
      amount: 540,
    },
    {
      id: "RES1004",
      guest: "Emily Davis",
      room: "101",
      checkIn: "2023-06-18",
      checkOut: "2023-06-22",
      status: "Confirmed",
      amount: 480,
    },
    {
      id: "RES1005",
      guest: "Robert Wilson",
      room: "402",
      checkIn: "2023-06-12",
      checkOut: "2023-06-15",
      status: "Checked-out",
      amount: 1050,
    },
    {
      id: "RES1006",
      guest: "Lisa Miller",
      room: "302",
      checkIn: "2023-06-19",
      checkOut: "2023-06-25",
      status: "Confirmed",
      amount: 1500,
    },
    {
      id: "RES1007",
      guest: "David Wilson",
      room: "202",
      checkIn: "2023-06-20",
      checkOut: "2023-06-22",
      status: "Confirmed",
      amount: 360,
    },
    {
      id: "RES1008",
      guest: "Jennifer Lee",
      room: "102",
      checkIn: "2023-06-17",
      checkOut: "2023-06-19",
      status: "Checked-out",
      amount: 240,
    },
    {
      id: "RES1009",
      guest: "Thomas Taylor",
      room: "501",
      checkIn: "2023-06-21",
      checkOut: "2023-06-28",
      status: "Confirmed",
      amount: 2800,
    },
    {
      id: "RES1010",
      guest: "Jessica White",
      room: "502",
      checkIn: "2023-06-15",
      checkOut: "2023-06-22",
      status: "Checked-in",
      amount: 2800,
    },
  ];

  // Sample guest data for dropdown
  const guests = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "Robert Wilson" },
  ];

  // Sample room data for dropdown
  const rooms = [
    { number: "101", type: "Single" },
    { number: "102", type: "Single" },
    { number: "201", type: "Double" },
    { number: "202", type: "Double" },
    { number: "301", type: "Suite" },
    { number: "302", type: "Suite" },
    { number: "401", type: "Deluxe" },
    { number: "402", type: "Deluxe" },
    { number: "501", type: "Deluxe" },
    { number: "502", type: "Deluxe" },
  ];

  // New Reservation Button
  const newReservationBtn = document.getElementById("newReservationBtn");
  if (newReservationBtn) {
    newReservationBtn.addEventListener("click", function () {
      // Populate guest dropdown
      const guestSelect = document.getElementById("reservationGuest");
      guestSelect.innerHTML = guests
        .map((guest) => `<option value="${guest.id}">${guest.name}</option>`)
        .join("");

      // Populate room dropdown
      const roomSelect = document.getElementById("reservationRoom");
      roomSelect.innerHTML = rooms
        .map(
          (room) =>
            `<option value="${room.number}">${room.number} (${room.type})</option>`
        )
        .join("");

      // Initialize date pickers
      if (typeof flatpickr !== "undefined") {
        flatpickr(".datepicker", {
          dateFormat: "Y-m-d",
          minDate: "today",
        });
      }

      document.getElementById("newReservationModal").style.display = "flex";
    });
  }

  // Apply Filters Button
  const applyFiltersBtn = document.getElementById("applyReservationFilters");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function () {
      const statusFilter = document.getElementById("reservationStatus").value;
      const searchFilter = document
        .getElementById("searchReservation")
        .value.toLowerCase();

      const filteredReservations = reservations.filter((reservation) => {
        const statusMatch =
          statusFilter === "all" ||
          (statusFilter === "confirmed" &&
            reservation.status === "Confirmed") ||
          (statusFilter === "checked-in" &&
            reservation.status === "Checked-in") ||
          (statusFilter === "checked-out" &&
            reservation.status === "Checked-out") ||
          (statusFilter === "cancelled" && reservation.status === "Cancelled");

        const searchMatch =
          searchFilter === "" ||
          reservation.guest.toLowerCase().includes(searchFilter) ||
          reservation.id.toLowerCase().includes(searchFilter);

        return statusMatch && searchMatch;
      });

      renderReservationsTable(filteredReservations);
    });
  }

  // Reset Filters Button
  const resetFiltersBtn = document.getElementById("resetReservationFilters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function () {
      document.getElementById("reservationStatus").value = "all";
      document.getElementById("searchReservation").value = "";
      document.getElementById("reservationDateRange").value = "";
      renderReservationsTable(reservations);
    });
  }

  // Initialize date range picker
  if (
    typeof flatpickr !== "undefined" &&
    document.getElementById("reservationDateRange")
  ) {
    flatpickr("#reservationDateRange", {
      mode: "range",
      dateFormat: "Y-m-d",
      placeholder: "Select date range",
    });
  }

  // New Reservation Form
  const newReservationForm = document.getElementById("newReservationForm");
  if (newReservationForm) {
    newReservationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const guestId = document.getElementById("reservationGuest").value;
      const roomNumber = document.getElementById("reservationRoom").value;
      const checkIn = document.getElementById("reservationCheckIn").value;
      const checkOut = document.getElementById("reservationCheckOut").value;
      const adults = document.getElementById("reservationAdults").value;
      const children = document.getElementById("reservationChildren").value;
      const specialRequests = document.getElementById(
        "reservationSpecialRequests"
      ).value;
      const paymentStatus = document.getElementById(
        "reservationPaymentStatus"
      ).value;

      // In a real app, you would send this data to the server
      console.log("New reservation:", {
        guestId,
        roomNumber,
        checkIn,
        checkOut,
        adults,
        children,
        specialRequests,
        paymentStatus,
      });

      // Close modal and reset form
      document.getElementById("newReservationModal").style.display = "none";
      newReservationForm.reset();

      // Show success message
      alert("Reservation created successfully!");
    });
  }

  // Cancel Reservation Button
  const cancelReservationBtn = document.getElementById("cancelReservation");
  if (cancelReservationBtn) {
    cancelReservationBtn.addEventListener("click", function () {
      document.getElementById("newReservationModal").style.display = "none";
      document.getElementById("newReservationForm").reset();
    });
  }

  // Pagination
  const prevPageBtn = document.getElementById("reservationsPrevPage");
  const nextPageBtn = document.getElementById("reservationsNextPage");
  const pageInfo = document.getElementById("reservationsPageInfo");

  if (prevPageBtn && nextPageBtn && pageInfo) {
    prevPageBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderReservationsTable(reservations);
      }
    });

    nextPageBtn.addEventListener("click", function () {
      const totalPages = Math.ceil(reservations.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderReservationsTable(reservations);
      }
    });
  }

  // Initial render
  renderReservationsTable(reservations);

  // Function to render reservations table
  function renderReservationsTable(reservationsData) {
    const tableBody = document.getElementById("reservationsTableBody");
    if (!tableBody) return;

    const totalPages = Math.ceil(reservationsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(
      startIndex + itemsPerPage,
      reservationsData.length
    );
    const paginatedReservations = reservationsData.slice(startIndex, endIndex);

    tableBody.innerHTML = paginatedReservations
      .map(
        (reservation) => `
            <tr>
                <td>${reservation.id}</td>
                <td>${reservation.guest}</td>
                <td>${reservation.room}</td>
                <td>${reservation.checkIn}</td>
                <td>${reservation.checkOut}</td>
                <td><span class="status status-${reservation.status
                  .toLowerCase()
                  .replace(" ", "-")}">${reservation.status}</span></td>
                <td>$${reservation.amount}</td>
                <td>
                    <button class="btn btn-outline btn-sm">View</button>
                    <button class="btn btn-danger btn-sm">Cancel</button>
                </td>
            </tr>
        `
      )
      .join("");

    // Update pagination info
    if (pageInfo) {
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    if (prevPageBtn) {
      prevPageBtn.disabled = currentPage === 1;
    }

    if (nextPageBtn) {
      nextPageBtn.disabled = currentPage === totalPages;
    }
  }
}

// Guests Page
function initGuestsPage() {
  // Sample guest data
  const guests = [
    {
      id: "G1001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      phone: "555-0101",
      address: "123 Main St, Anytown, USA",
      idType: "Passport",
      idNumber: "P12345678",
      vipStatus: "Gold",
    },
    {
      id: "G1002",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@example.com",
      phone: "555-0102",
      address: "456 Oak Ave, Somewhere, USA",
      idType: "Driver License",
      idNumber: "DL87654321",
      vipStatus: "Silver",
    },
    {
      id: "G1003",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.b@example.com",
      phone: "555-0103",
      address: "789 Pine Rd, Nowhere, USA",
      idType: "National ID",
      idNumber: "NID19283746",
      vipStatus: "Regular",
    },
    {
      id: "G1004",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.d@example.com",
      phone: "555-0104",
      address: "321 Elm St, Anywhere, USA",
      idType: "Passport",
      idNumber: "P98765432",
      vipStatus: "Platinum",
    },
    {
      id: "G1005",
      firstName: "Robert",
      lastName: "Wilson",
      email: "robert.w@example.com",
      phone: "555-0105",
      address: "654 Maple Dr, Everywhere, USA",
      idType: "Driver License",
      idNumber: "DL56473829",
      vipStatus: "Gold",
    },
    {
      id: "G1006",
      firstName: "Lisa",
      lastName: "Miller",
      email: "lisa.m@example.com",
      phone: "555-0106",
      address: "987 Cedar Ln, Somewhere, USA",
      idType: "National ID",
      idNumber: "NID65748392",
      vipStatus: "Regular",
    },
    {
      id: "G1007",
      firstName: "David",
      lastName: "Wilson",
      email: "david.w@example.com",
      phone: "555-0107",
      address: "159 Birch Blvd, Nowhere, USA",
      idType: "Passport",
      idNumber: "P74638291",
      vipStatus: "Silver",
    },
    {
      id: "G1008",
      firstName: "Jennifer",
      lastName: "Lee",
      email: "jennifer.l@example.com",
      phone: "555-0108",
      address: "753 Spruce Way, Anywhere, USA",
      idType: "Driver License",
      idNumber: "DL91827364",
      vipStatus: "Regular",
    },
    {
      id: "G1009",
      firstName: "Thomas",
      lastName: "Taylor",
      email: "thomas.t@example.com",
      phone: "555-0109",
      address: "486 Willow Cir, Everywhere, USA",
      idType: "National ID",
      idNumber: "NID28374659",
      vipStatus: "Gold",
    },
    {
      id: "G1010",
      firstName: "Jessica",
      lastName: "White",
      email: "jessica.w@example.com",
      phone: "555-0110",
      address: "624 Aspen Ct, Somewhere, USA",
      idType: "Passport",
      idNumber: "P46573829",
      vipStatus: "Platinum",
    },
  ];

  // Add Guest Button
  const addGuestBtn = document.getElementById("addGuestBtn");
  if (addGuestBtn) {
    addGuestBtn.addEventListener("click", function () {
      document.getElementById("addGuestModal").style.display = "flex";
    });
  }

  // Export Guests Button
  const exportGuestsBtn = document.getElementById("exportGuestsBtn");
  if (exportGuestsBtn) {
    exportGuestsBtn.addEventListener("click", function () {
      alert("Exporting guests data to CSV...");
      // In a real app, this would generate and download a CSV file
    });
  }

  // Apply Filters Button
  const applyFiltersBtn = document.getElementById("applyGuestFilters");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function () {
      const searchFilter = document
        .getElementById("guestSearch")
        .value.toLowerCase();
      const statusFilter = document.getElementById("guestStatus").value;

      const filteredGuests = guests.filter((guest) => {
        const searchMatch =
          searchFilter === "" ||
          guest.firstName.toLowerCase().includes(searchFilter) ||
          guest.lastName.toLowerCase().includes(searchFilter) ||
          guest.email.toLowerCase().includes(searchFilter) ||
          guest.phone.includes(searchFilter);

        const statusMatch =
          statusFilter === "all" ||
          (statusFilter === "current" &&
            ["Gold", "Platinum", "Silver"].includes(guest.vipStatus)) ||
          (statusFilter === "past" && guest.vipStatus === "Regular") ||
          (statusFilter === "vip" &&
            ["Gold", "Platinum"].includes(guest.vipStatus));

        return searchMatch && statusMatch;
      });

      renderGuestsTable(filteredGuests);
    });
  }

  // Reset Filters Button
  const resetFiltersBtn = document.getElementById("resetGuestFilters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function () {
      document.getElementById("guestSearch").value = "";
      document.getElementById("guestStatus").value = "all";
      renderGuestsTable(guests);
    });
  }

  // Add Guest Form
  const addGuestForm = document.getElementById("addGuestForm");
  if (addGuestForm) {
    addGuestForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("guestFirstName").value;
      const lastName = document.getElementById("guestLastName").value;
      const email = document.getElementById("guestEmail").value;
      const phone = document.getElementById("guestPhone").value;
      const address = document.getElementById("guestAddress").value;
      const idType = document.getElementById("guestIdType").value;
      const idNumber = document.getElementById("guestIdNumber").value;
      const vipStatus = document.getElementById("guestVipStatus").value;

      // In a real app, you would send this data to the server
      console.log("New guest added:", {
        firstName,
        lastName,
        email,
        phone,
        address,
        idType,
        idNumber,
        vipStatus,
      });

      // Close modal and reset form
      document.getElementById("addGuestModal").style.display = "none";
      addGuestForm.reset();

      // Show success message
      alert("Guest added successfully!");
    });
  }

  // Cancel Guest Button
  const cancelGuestBtn = document.getElementById("cancelGuest");
  if (cancelGuestBtn) {
    cancelGuestBtn.addEventListener("click", function () {
      document.getElementById("addGuestModal").style.display = "none";
      document.getElementById("addGuestForm").reset();
    });
  }

  // Pagination
  const prevPageBtn = document.getElementById("guestsPrevPage");
  const nextPageBtn = document.getElementById("guestsNextPage");
  const pageInfo = document.getElementById("guestsPageInfo");

  if (prevPageBtn && nextPageBtn && pageInfo) {
    prevPageBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderGuestsTable(guests);
      }
    });

    nextPageBtn.addEventListener("click", function () {
      const totalPages = Math.ceil(guests.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderGuestsTable(guests);
      }
    });
  }

  // Initial render
  renderGuestsTable(guests);

  // Function to render guests table
  function renderGuestsTable(guestsData) {
    const tableBody = document.getElementById("guestsTableBody");
    if (!tableBody) return;

    const totalPages = Math.ceil(guestsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, guestsData.length);
    const paginatedGuests = guestsData.slice(startIndex, endIndex);

    tableBody.innerHTML = paginatedGuests
      .map(
        (guest) => `
        <tr>
            <td>${guest.id}</td>
            <td>${guest.firstName} ${guest.lastName}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td>${guest.address}</td>
            <td>${guest.idType}</td>
            <td>${guest.idNumber}</td>
            <td><span class="status">${guest.vipStatus}</span></td>
            <td>
                <button class="btn btn-outline btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
    `
      )
      .join("");

    // Update pagination info
    if (pageInfo) {
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    if (prevPageBtn) {
      prevPageBtn.disabled = currentPage === 1;
    }

    if (nextPageBtn) {
      nextPageBtn.disabled = currentPage === totalPages;
    }
  }
}

// Staff Page
function initStaffPage() {
  // Sample staff data
  const staff = [
    {
      id: "S1001",
      firstName: "James",
      lastName: "Wilson",
      position: "Receptionist",
      department: "Front Desk",
      email: "james.w@hotel.com",
      phone: "555-0201",
      hireDate: "2020-05-15",
      status: "Active",
    },
    {
      id: "S1002",
      firstName: "Mary",
      lastName: "Johnson",
      position: "Housekeeping Supervisor",
      department: "Housekeeping",
      email: "mary.j@hotel.com",
      phone: "555-0202",
      hireDate: "2019-08-22",
      status: "Active",
    },
    {
      id: "S1003",
      firstName: "Robert",
      lastName: "Brown",
      position: "Chef",
      department: "Kitchen",
      email: "robert.b@hotel.com",
      phone: "555-0203",
      hireDate: "2021-01-10",
      status: "Active",
    },
    {
      id: "S1004",
      firstName: "Patricia",
      lastName: "Davis",
      position: "General Manager",
      department: "Management",
      email: "patricia.d@hotel.com",
      phone: "555-0204",
      hireDate: "2018-03-05",
      status: "Active",
    },
    {
      id: "S1005",
      firstName: "John",
      lastName: "Miller",
      position: "Maintenance Technician",
      department: "Maintenance",
      email: "john.m@hotel.com",
      phone: "555-0205",
      hireDate: "2022-02-18",
      status: "Active",
    },
    {
      id: "S1006",
      firstName: "Jennifer",
      lastName: "Wilson",
      position: "Front Desk Agent",
      department: "Front Desk",
      email: "jennifer.w@hotel.com",
      phone: "555-0206",
      hireDate: "2021-11-30",
      status: "Active",
    },
    {
      id: "S1007",
      firstName: "Michael",
      lastName: "Moore",
      position: "Housekeeper",
      department: "Housekeeping",
      email: "michael.m@hotel.com",
      phone: "555-0207",
      hireDate: "2022-06-15",
      status: "Active",
    },
    {
      id: "S1008",
      firstName: "Linda",
      lastName: "Taylor",
      position: "Sous Chef",
      department: "Kitchen",
      email: "linda.t@hotel.com",
      phone: "555-0208",
      hireDate: "2020-09-12",
      status: "Active",
    },
    {
      id: "S1009",
      firstName: "William",
      lastName: "Anderson",
      position: "Assistant Manager",
      department: "Management",
      email: "william.a@hotel.com",
      phone: "555-0209",
      hireDate: "2019-04-25",
      status: "Active",
    },
    {
      id: "S1010",
      firstName: "Elizabeth",
      lastName: "Thomas",
      position: "Maintenance Assistant",
      department: "Maintenance",
      email: "elizabeth.t@hotel.com",
      phone: "555-0210",
      hireDate: "2022-03-08",
      status: "Active",
    },
  ];

  // Add Staff Button
  const addStaffBtn = document.getElementById("addStaffBtn");
  if (addStaffBtn) {
    addStaffBtn.addEventListener("click", function () {
      document.getElementById("addStaffModal").style.display = "flex";
    });
  }

  // Apply Filters Button
  const applyFiltersBtn = document.getElementById("applyStaffFilters");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function () {
      const searchFilter = document
        .getElementById("staffSearch")
        .value.toLowerCase();
      const departmentFilter = document.getElementById("staffDepartment").value;

      const filteredStaff = staff.filter((staffMember) => {
        const searchMatch =
          searchFilter === "" ||
          staffMember.firstName.toLowerCase().includes(searchFilter) ||
          staffMember.lastName.toLowerCase().includes(searchFilter) ||
          staffMember.position.toLowerCase().includes(searchFilter);

        const departmentMatch =
          departmentFilter === "all" ||
          staffMember.department.toLowerCase().replace(" ", "_") ===
            departmentFilter;

        return searchMatch && departmentMatch;
      });

      renderStaffTable(filteredStaff);
    });
  }

  // Reset Filters Button
  const resetFiltersBtn = document.getElementById("resetStaffFilters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function () {
      document.getElementById("staffSearch").value = "";
      document.getElementById("staffDepartment").value = "all";
      renderStaffTable(staff);
    });
  }

  // Add Staff Form
  const addStaffForm = document.getElementById("addStaffForm");
  if (addStaffForm) {
    addStaffForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("staffFirstName").value;
      const lastName = document.getElementById("staffLastName").value;
      const email = document.getElementById("staffEmail").value;
      const phone = document.getElementById("staffPhone").value;
      const position = document.getElementById("staffPosition").value;
      const department = document.getElementById("staffDepartmentSelect").value;
      const hireDate = document.getElementById("staffHireDate").value;
      const salary = document.getElementById("staffSalary").value;
      const address = document.getElementById("staffAddress").value;

      // In a real app, you would send this data to the server
      console.log("New staff added:", {
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        hireDate,
        salary,
        address,
      });

      // Close modal and reset form
      document.getElementById("addStaffModal").style.display = "none";
      addStaffForm.reset();

      // Show success message
      alert("Staff member added successfully!");
    });
  }

  // Cancel Staff Button
  const cancelStaffBtn = document.getElementById("cancelStaff");
  if (cancelStaffBtn) {
    cancelStaffBtn.addEventListener("click", function () {
      document.getElementById("addStaffModal").style.display = "none";
      document.getElementById("addStaffForm").reset();
    });
  }

  // Pagination
  const prevPageBtn = document.getElementById("staffPrevPage");
  const nextPageBtn = document.getElementById("staffNextPage");
  const pageInfo = document.getElementById("staffPageInfo");

  if (prevPageBtn && nextPageBtn && pageInfo) {
    prevPageBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderStaffTable(staff);
      }
    });

    nextPageBtn.addEventListener("click", function () {
      const totalPages = Math.ceil(staff.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderStaffTable(staff);
      }
    });
  }

  // Initial render
  renderStaffTable(staff);

  // Function to render staff table
  function renderStaffTable(staffData) {
    const tableBody = document.getElementById("staffTableBody");
    if (!tableBody) return;

    const totalPages = Math.ceil(staffData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, staffData.length);
    const paginatedStaff = staffData.slice(startIndex, endIndex);

    tableBody.innerHTML = paginatedStaff
      .map(
        (staffMember) => `
        <tr>
            <td>${staffMember.id}</td>
            <td>${staffMember.firstName} ${staffMember.lastName}</td>
            <td>${staffMember.position}</td>
            <td>${staffMember.department}</td>
            <td>${staffMember.email}</td>
            <td>${staffMember.phone}</td>
            <td>${staffMember.hireDate}</td>
            <td><span class="status">${staffMember.status}</span></td>
            <td>
                <button class="btn btn-outline btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
    `
      )
      .join("");

    // Update pagination info
    if (pageInfo) {
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    if (prevPageBtn) {
      prevPageBtn.disabled = currentPage === 1;
    }

    if (nextPageBtn) {
      nextPageBtn.disabled = currentPage === totalPages;
    }
  }
}

// Reports Page
function initReportsPage() {
  // Report Type Change
  const reportTypeSelect = document.getElementById("reportType");
  if (reportTypeSelect) {
    reportTypeSelect.addEventListener("change", function () {
      updateReportTitle();
    });
  }

  // Report Period Change
  const reportPeriodSelect = document.getElementById("reportPeriod");
  if (reportPeriodSelect) {
    reportPeriodSelect.addEventListener("change", function () {
      const customDateRange = document.getElementById("customDateRange");
      if (this.value === "custom") {
        customDateRange.style.display = "flex";
      } else {
        customDateRange.style.display = "none";
      }
      updateReportDateRange();
    });
  }

  // Generate Report Button
  const generateReportBtn = document.getElementById("generateReportBtn");
  if (generateReportBtn) {
    generateReportBtn.addEventListener("click", function () {
      generateReport();
    });
  }

  // Print Report Button
  const printReportBtn = document.getElementById("printReportBtn");
  if (printReportBtn) {
    printReportBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // Export Report Button
  const exportReportBtn = document.getElementById("exportReportBtn");
  if (exportReportBtn) {
    exportReportBtn.addEventListener("click", function () {
      alert("Exporting report to PDF...");
      // In a real app, this would generate and download a PDF
    });
  }

  // Initial report generation
  generateReport();

  // Function to update report title
  function updateReportTitle() {
    const reportTitle = document.getElementById("reportTitle");
    if (reportTitle) {
      const reportType = document.getElementById("reportType").value;
      const titles = {
        occupancy: "Occupancy Report",
        revenue: "Revenue Report",
        guest: "Guest Report",
        reservation: "Reservation Report",
      };
      reportTitle.textContent = titles[reportType] || "Report";
    }
  }

  // Function to update report date range
  function updateReportDateRange() {
    const reportDateRange = document.getElementById("reportDateRange");
    if (reportDateRange) {
      const period = document.getElementById("reportPeriod").value;
      const now = new Date();
      let rangeText = "";

      switch (period) {
        case "daily":
          rangeText = `For ${now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`;
          break;
        case "weekly":
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          rangeText = `For the week of ${weekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} to ${weekEnd.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`;
          break;
        case "monthly":
          rangeText = `For the month of ${now.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}`;
          break;
        case "yearly":
          rangeText = `For the year ${now.getFullYear()}`;
          break;
        case "custom":
          const startDate = document.getElementById("reportStartDate").value;
          const endDate = document.getElementById("reportEndDate").value;
          if (startDate && endDate) {
            rangeText = `From ${new Date(
              startDate
            ).toLocaleDateString()} to ${new Date(
              endDate
            ).toLocaleDateString()}`;
          } else {
            rangeText = "Custom date range";
          }
          break;
        default:
          rangeText = "Date range not specified";
      }

      reportDateRange.textContent = rangeText;
    }
  }

  // Function to generate report
  function generateReport() {
    updateReportTitle();
    updateReportDateRange();

    const reportType = document.getElementById("reportType").value;

    // Initialize charts
    initReportCharts(reportType);

    // Populate report details table
    populateReportDetails(reportType);
  }

  // Function to initialize report charts
  function initReportCharts(reportType) {
    const mainCtx = document.getElementById("reportMainChart");
    const secondaryCtx = document.getElementById("reportSecondaryChart");

    if (mainCtx && secondaryCtx) {
      // Destroy existing charts if they exist
      if (mainCtx.chart) {
        mainCtx.chart.destroy();
      }
      if (secondaryCtx.chart) {
        secondaryCtx.chart.destroy();
      }

      // Sample data for different report types
      const chartData = {
        occupancy: {
          main: {
            type: "line",
            data: {
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "Occupancy Rate %",
                  data: [65, 59, 70, 71, 76, 78, 82, 85, 80, 75, 70, 68],
                  backgroundColor: "rgba(52, 152, 219, 0.2)",
                  borderColor: "rgba(52, 152, 219, 1)",
                  borderWidth: 2,
                  tension: 0.1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            },
          },
          secondary: {
            type: "bar",
            data: {
              labels: ["Single", "Double", "Suite", "Deluxe"],
              datasets: [
                {
                  label: "Room Type Occupancy",
                  data: [72, 85, 68, 90],
                  backgroundColor: [
                    "rgba(52, 152, 219, 0.7)",
                    "rgba(46, 204, 113, 0.7)",
                    "rgba(155, 89, 182, 0.7)",
                    "rgba(241, 196, 15, 0.7)",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            },
          },
        },
        revenue: {
          main: {
            type: "bar",
            data: {
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "Revenue ($)",
                  data: [
                    12500, 11800, 14000, 14200, 15200, 15600, 16400, 17000,
                    16000, 15000, 14000, 13600,
                  ],
                  backgroundColor: "rgba(46, 204, 113, 0.7)",
                },
              ],
            },
            options: {
              responsive: true,
            },
          },
          secondary: {
            type: "doughnut",
            data: {
              labels: ["Room Revenue", "Food & Beverage", "Other Services"],
              datasets: [
                {
                  data: [75, 20, 5],
                  backgroundColor: [
                    "rgba(52, 152, 219, 0.7)",
                    "rgba(46, 204, 113, 0.7)",
                    "rgba(155, 89, 182, 0.7)",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
            },
          },
        },
        guest: {
          main: {
            type: "line",
            data: {
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "New Guests",
                  data: [45, 40, 55, 50, 60, 65, 70, 75, 65, 60, 55, 50],
                  borderColor: "rgba(52, 152, 219, 1)",
                  backgroundColor: "rgba(52, 152, 219, 0.1)",
                  borderWidth: 2,
                  fill: true,
                },
                {
                  label: "Returning Guests",
                  data: [20, 18, 25, 22, 28, 30, 35, 40, 30, 25, 22, 20],
                  borderColor: "rgba(46, 204, 113, 1)",
                  backgroundColor: "rgba(46, 204, 113, 0.1)",
                  borderWidth: 2,
                  fill: true,
                },
              ],
            },
            options: {
              responsive: true,
            },
          },
          secondary: {
            type: "pie",
            data: {
              labels: ["Domestic", "International"],
              datasets: [
                {
                  data: [65, 35],
                  backgroundColor: [
                    "rgba(52, 152, 219, 0.7)",
                    "rgba(241, 196, 15, 0.7)",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
            },
          },
        },
        reservation: {
          main: {
            type: "bar",
            data: {
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "Online Bookings",
                  data: [30, 28, 35, 32, 38, 42, 45, 50, 40, 38, 35, 32],
                  backgroundColor: "rgba(52, 152, 219, 0.7)",
                },
                {
                  label: "Direct Bookings",
                  data: [15, 12, 20, 18, 22, 23, 25, 30, 25, 22, 20, 18],
                  backgroundColor: "rgba(46, 204, 113, 0.7)",
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            },
          },
          secondary: {
            type: "radar",
            data: {
              labels: ["Single", "Double", "Suite", "Deluxe", "VIP"],
              datasets: [
                {
                  label: "Room Type Popularity",
                  data: [65, 59, 90, 81, 56],
                  backgroundColor: "rgba(52, 152, 219, 0.2)",
                  borderColor: "rgba(52, 152, 219, 1)",
                  pointBackgroundColor: "rgba(52, 152, 219, 1)",
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(52, 152, 219, 1)",
                },
              ],
            },
            options: {
              responsive: true,
            },
          },
        },
      };

      // Create new charts
      mainCtx.chart = new Chart(mainCtx, chartData[reportType].main);
      secondaryCtx.chart = new Chart(
        secondaryCtx,
        chartData[reportType].secondary
      );
    }
  }

  // Function to populate report details table
  function populateReportDetails(reportType) {
    const detailsTable = document.getElementById("reportDetailsTable");
    if (!detailsTable) return;

    // Sample data for different report types
    const tableData = {
      occupancy: {
        headers: [
          "Date",
          "Total Rooms",
          "Occupied",
          "Vacant",
          "Occupancy Rate",
        ],
        rows: [
          ["2023-06-01", "120", "85", "35", "70.8%"],
          ["2023-06-02", "120", "88", "32", "73.3%"],
          ["2023-06-03", "120", "92", "28", "76.7%"],
          ["2023-06-04", "120", "94", "26", "78.3%"],
          ["2023-06-05", "120", "90", "30", "75.0%"],
        ],
      },
      revenue: {
        headers: [
          "Date",
          "Room Revenue",
          "F&B Revenue",
          "Other Revenue",
          "Total Revenue",
        ],
        rows: [
          ["2023-06-01", "$8,500", "$2,300", "$500", "$11,300"],
          ["2023-06-02", "$8,800", "$2,400", "$550", "$11,750"],
          ["2023-06-03", "$9,200", "$2,500", "$600", "$12,300"],
          ["2023-06-04", "$9,400", "$2,600", "$650", "$12,650"],
          ["2023-06-05", "$9,000", "$2,400", "$600", "$12,000"],
        ],
      },
      guest: {
        headers: [
          "Date",
          "New Guests",
          "Returning Guests",
          "Total Guests",
          "Average Stay",
        ],
        rows: [
          ["2023-06-01", "12", "8", "20", "2.5 nights"],
          ["2023-06-02", "15", "10", "25", "2.7 nights"],
          ["2023-06-03", "18", "12", "30", "2.8 nights"],
          ["2023-06-04", "20", "15", "35", "3.0 nights"],
          ["2023-06-05", "16", "14", "30", "3.1 nights"],
        ],
      },
      reservation: {
        headers: [
          "Date",
          "Online Bookings",
          "Phone Bookings",
          "Walk-ins",
          "Total Bookings",
        ],
        rows: [
          ["2023-06-01", "15", "5", "3", "23"],
          ["2023-06-02", "18", "6", "4", "28"],
          ["2023-06-03", "20", "7", "5", "32"],
          ["2023-06-04", "22", "8", "6", "36"],
          ["2023-06-05", "19", "7", "5", "31"],
        ],
      },
    };

    // Create table HTML
    let tableHTML = `
        <thead>
            <tr>
                ${tableData[reportType].headers
                  .map((header) => `<th>${header}</th>`)
                  .join("")}
            </tr>
        </thead>
        <tbody>
            ${tableData[reportType].rows
              .map(
                (row) => `
                <tr>
                    ${row.map((cell) => `<td>${cell}</td>`).join("")}
                </tr>
            `
              )
              .join("")}
        </tbody>
    `;

    detailsTable.innerHTML = tableHTML;
  }
}
