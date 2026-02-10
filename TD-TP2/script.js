const trajets = [
  { depart: "Pau", arrivee: "Bayonne", places: 3 },
  { depart: "Pau", arrivee: "Tarbes", places: 1 },
  { depart: "Bayonne", arrivee: "Dax", places: 4 },
];

const trajets2 = [
    ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']
];

// Get DOM elements
const ajouterTrajetBtn = document.querySelector("#btnAjouterTrajet");
const divTrajets = document.querySelector(".trajets");
const departInput = document.querySelector("#depart");
const arriveeInput = document.querySelector("#arrivee");
const placesInput = document.querySelector("#places");
const villesSelect = document.querySelector(".villes select");
const filtreBtn = document.querySelector("#btnFiltrer");
const villeFiltreInput = document.querySelector("#villeFiltre");

// Question 1: Vérification de l'existence d'un trajet
const trajetExiste = (nouveauTrajet) => {
  return trajets.some(
    (trajet) =>
      trajet.depart.toLowerCase() === nouveauTrajet.depart.toLowerCase() &&
      trajet.arrivee.toLowerCase() === nouveauTrajet.arrivee.toLowerCase() &&
      trajet.places === nouveauTrajet.places,
  );
};

// Question 2: Ajout d'un nouveau trajet + affichage

const afficherTrajets = (liste = trajets) => {
  divTrajets.innerHTML = "";
  liste.forEach(({ depart, arrivee, places }) => {
    const p = document.createElement("p");
    p.textContent = `${depart} → ${arrivee} | Places : ${places}`;
    divTrajets.appendChild(p);
  });
};

const resetForm = () => {
    departInput.value = "";
    arriveeInput.value = "";
    placesInput.value = "";
};

ajouterTrajetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const depart = departInput.value;
    const arrivee = arriveeInput.value;
    const places = Number(placesInput.value);
    const nouveauTrajet = { depart, arrivee, places };

    // Question 1 du TP
    // if(!validator(depart, arrivee, places)) {
    //     return;
    // }

    if(!depart || !arrivee || !places) {
        alert("Tous les champs doivent être remplis.");
        return;
    }

    if (trajetExiste(nouveauTrajet)) {
        alert("Ce trajet existe déjà.");
        return;
    }

    trajets.push(nouveauTrajet);
    afficherTrajets();
    resetForm();
    remplirComboBox();

}); 


/* Question 3
* const allDeparts = trajets.map(trajet => trajet.depart); All Departs, including duplicates
* const allUniqueDeparts: Set = new Set(trajets.map(trajet => trajet.depart));
* const allUniqueDeparts: Array = [...new Set(trajets.map(trajet => trajet.depart))];
*/

const allDeparts = [...new Set(trajets.map(trajet => trajet.depart))];

// Question 4
const remplirComboBox = () => {
    const villes = [...new Set([...trajets.map(trajet => trajet.depart), ...trajets.map(trajet => trajet.arrivee)])];
    // const villes = [...new Set(trajets.flatMap(trajet => [trajet.depart, trajet.arrivee]))]; // Alternative using flatMap
    villesSelect.innerHTML = ""; // Clear existing options
    villes.forEach(ville => {
        const option = document.createElement("option");
        option.value = ville;
        option.textContent = ville;
        villesSelect.appendChild(option);
    });
};

// Question 5
const totalPlaces = trajets.reduce((total, trajet) => total + trajet.places, 0);
console.log(`Nombre total de places disponibles : ${totalPlaces}`);

// Question 6
filtreBtn.addEventListener("click", () => {
    const filtre = villeFiltreInput.value.toLowerCase();
    const trajetsFiltres = trajets.filter(trajet =>
        trajet.depart.toLowerCase().includes(filtre) ||
        trajet.arrivee.toLowerCase().includes(filtre)
    );
    afficherTrajets(trajetsFiltres);
});


// TP

// Question 8.a
const voyageLabels = trajets.map(trajet => `${trajet.depart} → ${trajet.arrivee} (${trajet.places} places)`);
console.log("Voyages labels:", voyageLabels);

// Question 8.b
const voyageAvecPlacesRestantes = trajets.map(trajet => ({
    ...trajet,
    placesRestantes: trajet.places - Math.floor(Math.random() * (2)),
}));

// Si on veut le nombre de places restantes entre 0 et le nombre de places disponibles, on peut faire :
// const voyageAvecPlacesRestantes = trajets.map(trajet => ({
//     ...trajet,
//     placesRestantes: trajet.places - Math.floor(Math.random() * (trajet.places + 1)),
// }));

console.log("Voyages avec places restantes:", voyageAvecPlacesRestantes);3

// Question 9
const checkvilles = () => {
    return trajets.every(trajet => trajet.depart.toLowerCase() !== trajet.arrivee.toLowerCase());
};
console.log("Tous les trajets ont des villes de départ et d'arrivée différentes ?", checkvilles());

// Question 10
const allVilles = trajets.reduce((villes, trajet) => {
    if (!villes.includes(trajet.depart)) {
        villes.push(trajet.depart);
    }
    if (!villes.includes(trajet.arrivee)) {
        villes.push(trajet.arrivee);
    }
    return villes;
}, []);

console.log("Toutes les villes présentes dans les trajets :", allVilles.join("; "));


// Question 2 by Killian

// ajouterTrajetBtn.addEventListener("click", (event) => {
//     const nouveauTrajet = {depart: departInput.value, arrivee: arriveeInput.value, places: Number(placesInput.value)};
//     if(!trajetExiste(nouveauTrajet)) {
//         trajets.push(nouveauTrajet);
//     }
//     divTrajets.innerHTML = "";
//     for (let index=0; index<trajets.length; index++) {
//         const trajet= trajets[index];
//         divTrajets.innerHTML += `<p>${trajet.depart} → ${trajet.arrivee} | Places : ${trajet.places}</p>`;
//     }
// });