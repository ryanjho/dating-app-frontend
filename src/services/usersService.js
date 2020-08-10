import apiUtil from '../utils/api';
import imageApiUtil from '../utils/imageApi';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
}

export default {
    async getAll () {
        try {
            const response = await apiUtil.get(buildUrl('/'));
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    async getOne(id) {
        try {
            const response = await apiUtil.get(buildUrl(`/${id}`));
            return response.data;
        } catch(err) {
            console.log(err);
        }
    },
    async create (newUser) {
        const response = await apiUtil.post(buildUrl('/'), newUser);
        return response.data;
    },
    async update (id, updatedInformation) {
        const response = await apiUtil.update(buildUrl(`/${id}`), updatedInformation);
        return response.data;
    }, 
    async delete (id) {
        const response = await apiUtil.delete(buildUrl(`/${id}`));
        return response.data;
    },
    async updateCompletionStatus (id, isCompleted) {
        const response = await apiUtil.update(buildUrl(`/${id}`),
            isCompleted,
        );
        return response.data;
    },
    async uploadImage (formData) {
        const response = await imageApiUtil.post(buildUrl('/avatar-upload'), formData);
        return response.data;
    },
    async likeUser (currentUserId, likedUserId) {
        const response = await apiUtil.update(buildUrl(`/like/${currentUserId}`), 
            { _id: likedUserId}
        );
        return response.data;
    }
}