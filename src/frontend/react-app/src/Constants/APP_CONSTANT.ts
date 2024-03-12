export const post_time = (creationDate: Date) => {
  const ct = new Date(creationDate).toLocaleDateString();
  const parts = ct.split('/');
  const month = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']

  const dateObj = new Date(+parts[2], +parts[1] - 1, +parts[0]);

  const formattedDate = dateObj.getDate() + ' ' + month[dateObj.getMonth()] + ' ' + dateObj.getFullYear();

  return (formattedDate);
}

//generer une liste aleatoire de couleur
export const getRandomColors = (n: number) => {
  var colors = [];
  for (var i = 0; i < n; i++) {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }
  return colors;
}
// const colors: string[] = getRandomColors(article.tags?.length!);

export const hexToRGBA = (hex: string, opacity: number) => {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (opacity) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}