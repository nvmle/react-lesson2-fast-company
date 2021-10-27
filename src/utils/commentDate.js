export const takeDate = (createdAt) => {
  const difference = Date.now() - createdAt;
  const commentDate = new Date("", "", "", "", "", "", createdAt);

  if (difference < 1000 * 60 * 5) return "1 минуту назад";
  if (difference >= 1000 * 60 * 5 && difference < 1000 * 60 * 10) {
    return "5 минут назад";
  }
  if (difference >= 1000 * 60 * 10 && difference < 1000 * 60 * 30) {
    return "10 минут назад";
  }
  if (difference >= 1000 * 60 * 30 && difference < 1000 * 60 * 60) {
    return "30 минут назад";
  }
  if (difference >= 1000 * 60 * 60 && difference < 1000 * 60 * 60 * 24) {
    return `${commentDate.getHours()}:${
      commentDate.getMinutes() < 10
        ? "0" + commentDate.getMinutes()
        : commentDate.getMinutes()
    }`;
  }
  if (
    difference >= 1000 * 60 * 60 * 24 &&
    difference < 1000 * 60 * 60 * 24 * 30
  ) {
    const month = monthName(commentDate.getMonth());

    return `${commentDate.getDate()} ${month}`;
  }
  if (difference >= 1000 * 60 * 60 * 24 * 30) {
    const month = monthName(commentDate.getMonth());

    return `${commentDate.getDate()} ${month} ${commentDate.getFullYear()}`;
  }

  return createdAt;
};

const monthName = (month) => {
  if (month === 0) {
    return "Января";
  }
  if (month === 1) {
    return "Февраля";
  }
  if (month === 2) {
    return "Марта";
  }
  if (month === 3) {
    return "Апреля";
  }
  if (month === 4) {
    return "Мая";
  }
  if (month === 5) {
    return "Июня";
  }
  if (month === 6) {
    return "Июля";
  }
  if (month === 7) {
    return "Августа";
  }
  if (month === 8) {
    return "Сентября";
  }
  if (month === 9) {
    return "Октября";
  }
  if (month === 10) {
    return "Новября";
  }
  if (month === 11) {
    return "Декабря";
  }
};
