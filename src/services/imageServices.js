export const getImage = (imgPath) => {
    const imageBaseURL = 'https://localhost:5001/api/Images/Name?Name=';
    return imageBaseURL + imgPath;
};
