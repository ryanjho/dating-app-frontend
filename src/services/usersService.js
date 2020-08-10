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
    },
    async createChatRoom (data) {
        try {
            const response = await apiUtil.post(buildUrl(`/chat_room`), data);
            return response.data;
        } catch(err) {
            console.log(err);
        }
    },
    async getAllMessages () {
        try {
            const response = await apiUtil.get(buildUrl(`/chat_room`));
            const promises = response.data.map(async element => {
                // console.log(element);
                const otherUserDetail = await apiUtil.get(buildUrl(`/${element.users[1]}`))
                return otherUserDetail.data;
            })
            const otherUserDetails = await Promise.all(promises);

            const formattedDetails = this.joinDetails(response.data, otherUserDetails);

            return formattedDetails;
        } catch(err) {
            console.log(err);
        }
    },
    async joinDetails (getAllArray, otherUserDetails) {
        let response = getAllArray;
        for (let i = 0; i < response.length; i++){
            for (let j = 0; j < 2; j++) {
                if (response[i].users[1] === otherUserDetails[j]._id) {
                    response[i].userName = otherUserDetails[j].userName;
                    response[i].image = otherUserDetails[j].image;
                }
            }
        };
        return response;
    },
    async getCurrentChatRoom (chatRoomID) {
        try {
            const response = await apiUtil.get(buildUrl(`/chat_room/${chatRoomID}`));
            return response.data;
        } catch(err) {
            console.log(err);
        }
    },
    async sendMessage (chatRoomID, payload) {
        try {
            const response = await apiUtil.update(buildUrl(`/chat_room/${chatRoomID}`), payload);
            return response.data;
        } catch(err) {
            console.log(err);
        }
    },
}