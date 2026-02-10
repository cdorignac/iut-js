const seatsField = document.querySelector("#seats");
const departureField = document.querySelector("#departure");
const arrivalField = document.querySelector("#arrival");
const submitButton = document.querySelector("#submitBtn");
const resumeArea = document.querySelector("#resume");

// Question 2
seatsField.addEventListener("keydown", (event) => {
  const seatsValue = seatsField.value;

  if (Number.isNaN(Number(event.key)) && event.key !== "Backspace") {
    alert("Veuillez entrer un nombre valide pour le nombre de places.");
    event.preventDefault();
  }
});

// Question 3

validator = () => {
  const seatsInput = Number(seatsField.value);
  const departureInput = departureField.value;
  const arrivalInput = arrivalField.value;

  /* aucun champ 
  n’est vide
  */
  if (!departureInput || !arrivalInput || !seatsInput) {
    alert("Tous les champs doivent être remplis.");
    return false;
  }

  //  la ville de départ est différente de la ville d’arrivée
  if (departureInput.toLowerCase() === arrivalInput.toLowerCase()) {
    alert("La ville de départ doit être différente de la ville d’arrivée.");
    return false;
  }

  //  le nombre de places est inférieur à 5
  if (seatsInput >= 5) {
    return false;
  }

  return true;
};

// Question 4
submitButton.addEventListener("click", (event) => {
  if (validator()) {
    resumeArea.textContent = `Trajet proposé : ${departureField.value} → ${arrivalField.value} (${seatsField.value} place(s) disponible(s))`;
  } else {
    resumeArea.textContent = "";
  }
});

// Question 5
const resetButton = document.querySelector("#submitBtn");
resetButton.addEventListener("click", (event) => {
    arrivalField.value = '';
    departureField.value = '';
    seatsField.value = '';
});

// Question 6
