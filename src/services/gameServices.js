import { httpRequest } from 'utils/index';
import Cookies from 'js-cookie';

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
    formdata.append('FileGame', game.FileGame);
    formdata.append('GameName', game.GameName);
    formdata.append('Price', game.Price);
    formdata.append('Discount', game.Discount);
    formdata.append('Description', game.Description);
    formdata.append('Gameplay', game.Gameplay);
    formdata.append('Genre', game.Genre);
    formdata.append('Status', game.Status);
    formdata.append('ThumbnailImage', game.ThumbnailImage);
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

    try {
        const res = await httpRequest.post(`Games`, formdata);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postNewIMG = async (img) => {
    const formdata = new FormData();
    formdata.append('GameID', img.GameID);
    formdata.append('ImageFile', img.ThumbnailImage);
    formdata.append('Caption', img.Caption);
    formdata.append('isDefault', img.isDefault);
    formdata.append('SortOrder', img.SortOrder);
    try {
        const res = await httpRequest.post(`Games/${img.GameID}/Images`, formdata);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putGame = async (game) => {
    const formdata = new FormData();
    formdata.append('GameID', game.GameID);
    formdata.append('Name', game.Name);
    formdata.append('Price', game.Price);
    formdata.append('Discount', game.Discount);
    formdata.append('Description', game.Description);
    formdata.append('Publisher', game.Publisher);
    formdata.append('Gameplay', game.Gameplay);
    formdata.append('Status', game.Status);
    formdata.append('ThumbnailImage', game.ThumbnailImage);
    formdata.append('FileGame', game.FileGame);
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
    try {
        const res = await httpRequest.put(`Games/${game.GameID}`, formdata);
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
    try {
        const res = await httpRequest.put(`Categories`, genres);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postNewGenre = async (genre) => {
    try {
        const res = await httpRequest.post(`Categories`, genre);
        return res;
    } catch (error) {
        console.log(error);
    }
};
