const getDayMonthYear = (date: Date) => ({
    day: date.getDate(),
    mouth: date.getMonth() + 1,
    year: date.getFullYear()
});

export const formatEua = (date: Date) =>  {
    const { day, mouth, year } = getDayMonthYear(date);

    return `${year}-${mouth < 10 ? `0${mouth}`: mouth}-${day < 10 ? `0${day}`: day}`;
}

export const formatBr = (date: Date) =>  {
    const { day, mouth, year } = getDayMonthYear(date);

    return `${day < 10 ? `0${day}`: day}/${mouth < 10 ? `0${mouth}`: mouth}/${year}`;
}
