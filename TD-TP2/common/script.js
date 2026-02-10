const validator = (depart, arrivee, places) => {
  console.log("Validator called with:", { depart, arrivee, places });
  // aucun champ n’est vide
  if (!depart || !arrivee || !places) {
    alert("Tous les champs doivent être remplis.");
    return false;
  }

  //  la ville de départ est différente de la ville d’arrivée
  if (depart.toLowerCase() === arrivee.toLowerCase()) {
    alert("La ville de départ doit être différente de la ville d’arrivée.");
    return false;
  }

  //  le nombre de places est inférieur à 5
  if (places >= 5) {
    alert("Le nombre de places doit être inférieur à 5.");
    return false;
  }

  return true;
};