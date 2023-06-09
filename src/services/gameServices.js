import { httpRequest } from 'utils/index';
import Cookies from 'js-cookie';
import genre from 'menu-items/genre';

export const getGameTable = async (index, page) => {
    try {
        const res = await httpRequest.get(`Games/paging?PageIndex=${index}&PageSize=${page}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getGameBestSeller = async () => {
    try {
        const res = await httpRequest.get(`Games/bestseller?PageIndex=1&PageSize=100`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getProfileGame = async (id) => {
    try {
        const res = await httpRequest.get(`Games/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postNewGame = async (game) => {
    const formdata = new FormData();
    formdata.append('GameName', game.GameName);
    formdata.append('Price', game.Price);
    formdata.append('Discount', game.Discount);
    formdata.append('Description', game.Description);
    formdata.append('Gameplay', game.Gameplay);
    game.GenreList.forEach((genre) => formdata.append('GenreList', genre));
    formdata.append('Status', game.Status);
    formdata.append('PublisherId', game.PublisherId);
    formdata.append('ThumbnailImage', game.ThumbnailImage);
    formdata.append('FileGame', game.FileGame);
    formdata.append('SRM.OS', game.SRM.OS);
    formdata.append('SRM.Processor', game.SRM.Processor);
    formdata.append('SRM.Memory', game.SRM.Memory);
    formdata.append('SRM.Graphics', game.SRM.Graphics);
    formdata.append('SRM.Storage', game.SRM.Storage);
    formdata.append('SRM.AdditionalNotes', game.SRM.AdditionalNotes);
    formdata.append('SRM.Soundcard', game.SRM.Soundcard);
    formdata.append('SRR.OS', game.SRR.OS);
    formdata.append('SRR.Processor', game.SRR.Processor);
    formdata.append('SRR.Memory', game.SRR.Memory);
    formdata.append('SRR.Graphics', game.SRR.Graphics);
    formdata.append('SRR.Storage', game.SRR.Storage);
    formdata.append('SRR.AdditionalNotes', game.SRR.AdditionalNotes);
    formdata.append('SRR.Soundcard', game.SRR.Soundcard);

    console.log(game.GenreList);
    try {
        const res = await httpRequest.post(`Games`, formdata);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putGame = async (game) => {
    const formdata = new FormData();
    formdata.append('id', game.GameID);
    formdata.append('Name', game.Name);
    formdata.append('Price', game.Price);
    formdata.append('Discount', game.Discount);
    formdata.append('Description', game.Description);
    formdata.append('PublisherId', game.PublisherId);
    formdata.append('Gameplay', game.Gameplay);
    formdata.append('Status', game.Status);
    formdata.append('ThumbnailImage', game.ThumbnailImage);
    formdata.append('SRM.OS', game.SRM.os);
    formdata.append('SRM.Processor', game.SRM.processor);
    formdata.append('SRM.Memory', game.SRM.memory);
    formdata.append('SRM.Graphics', game.SRM.graphics);
    formdata.append('SRM.Storage', game.SRM.storage);
    formdata.append('SRM.AdditionalNotes', game.SRM.additionalNotes);
    formdata.append('SRM.Soundcard', game.SRM.soundcard);
    formdata.append('SRR.OS', game.SRR.os);
    formdata.append('SRR.Processor', game.SRR.processor);
    formdata.append('SRR.Memory', game.SRR.memory);
    formdata.append('SRR.Graphics', game.SRR.graphics);
    formdata.append('SRR.Storage', game.SRR.storage);
    formdata.append('SRR.AdditionalNotes', game.SRR.additionalNotes);
    formdata.append('SRR.Soundcard', game.SRR.soundcard);
    formdata.append('FileGame', game.FileGame);
    try {
        const res = await httpRequest.put(`Games/${game.GameID}`, formdata);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postNewIMG = async (img) => {
    const formdata = new FormData();
    formdata.append('GameID', 0);
    formdata.append('ImageFile', img.ThumbnailImage);
    formdata.append('Caption', img.Caption);
    formdata.append('isDefault', img.isDefault);
    formdata.append('SortOrder', img.SortOrder);

    const jwt_token = Cookies.get('jwt-admin');
    try {
        const res = await httpRequest.post(`Games/${img.GameID}/Images`, formdata, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putGameGenre = async (id, genres) => {
    try {
        const jwt_token = Cookies.get('jwt-admin');
        const res = await httpRequest.put(`Games/${id}/genres`, genres, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteGame = async (id) => {
    try {
        const jwt_token = Cookies.get('jwt-admin');
        const res = await httpRequest.remove(`Games/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getGameIMG = async (id) => {
    try {
        const res = await httpRequest.get(`games/${id}/images`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putGameIMG = async (img) => {
    const formdata = new FormData();
    formdata.append('ImageFile', img.newIMG);
    formdata.append('Caption', img.caption);
    formdata.append('isDefault', img.isDefault);
    formdata.append('SortOrder', img.sortOrder);

    const jwt_token = Cookies.get('jwt-admin');
    try {
        const res = await httpRequest.put(`games/${img.gameID}/images/${img.imageID}`, formdata, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Genre
export const getAllGenre = async () => {
    try {
        const res = await httpRequest.get(`Categories`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getGenre = async (id) => {
    try {
        const res = await httpRequest.get(`/Categories/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putGenre = async (genres) => {
    const jwt_token = Cookies.get('jwt-admin');
    try {
        const res = await httpRequest.put(`Categories`, genres, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postNewGenre = async (genre) => {
    const jwt_token = Cookies.get('jwt-admin');
    try {
        const res = await httpRequest.post(`Categories`, genre, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Publisher

export const getPublisher = async () => {
    try {
        const res = await httpRequest.get(`publisher`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const postPublisher = async (publisher) => {
    const jwt_token = Cookies.get('jwt-admin');
    try {
        const res = await httpRequest.post(`publisher`, publisher, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
