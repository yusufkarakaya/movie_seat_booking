const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
let total = document.getElementById('total');
let count = document.getElementById('count');
const movieSelect = document.getElementById('movieSelect');
const clearSeats = document.getElementById('clear-seats');

populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCountandTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCountandTotal();
});

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCountandTotal();
  }
});

clearSeats.addEventListener('click', () => {
  const cleanSeats = [];
  let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats.length > 0) {
    localStorage.setItem('selectedSeats', cleanSeats);
    seats.forEach((seat) => {
      seat.classList.remove('selected');
    });
  }
  updateSelectedCountandTotal();
});

updateSelectedCountandTotal();
