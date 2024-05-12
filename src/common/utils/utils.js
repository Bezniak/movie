export function formatCount(count) {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(0)}K`;
    } else {
        return count?.toString();
    }
}

export function getGenreNamesByIds(genresArray, idsToFind) {
    const genreNames = [];
    idsToFind?.forEach(id => {
        const genre = genresArray.find(genre => genre.value === String(id));
        if (genre) {
            genreNames.push(genre.label);
        }
    });
    return genreNames;
}

export function extractGenres(data) {
    let genres = [];

    if (data?.genres) {
        data?.genres.forEach(genre => {
            genres.push({
                value: String(genre.id),
                label: genre.name
            });
        });
    }

    return genres;
}

export const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    return dateObj.toLocaleDateString('en-US', options);
};

export const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours > 0 ? `${hours}h` : ''; // добавляем 'h' только если часы не нулевые
    const formattedMinutes = `${remainingMinutes}m`.padStart(3, '0'); // всегда добавляем 'm', дополняя минуты до трех символов, начиная с нуля

    return `${formattedHours} ${formattedMinutes}`;
};
