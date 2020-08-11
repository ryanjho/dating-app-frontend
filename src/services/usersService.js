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
    },
    async createChatRoom (data) {
        try {
            const response = await apiUtil.post(buildUrl(`/chat_room`), data);
            return response.data;
        } catch(err) {
            console.log(err);
        }
    },
    async getAllMessages (currentUserId) {
        try {
            // console.log(currentUserId);
            let otherUserIndex = [];
            const response = await apiUtil.get(buildUrl(`/chat_room`));
            // console.log(response.data);
            const promises = response.data.map(async (element, index) => {
                // console.log(element);
                
                // Check which index in users array is the other user
                // for (let [index, value] of element.users.entries()) {
                //     console.log(index);
                //     if (value !== currentUserId) {
                //         otherUserIndex.push(index);
                //     }
                //     console.log(otherUserIndex);
                //     const otherUserDetail = await apiUtil.get(buildUrl(`/${element.users[otherUserIndex]}`))
                //     console.log(otherUserDetail);
                //     return otherUserDetail.data;
                // }
                // console.log(index);
                for (let i = 0; i < element.users.length; i++) {
                    // console.log(element.users[i] !== currentUserId);
                    if (element.users[i] !== currentUserId) {
                        otherUserIndex.push(i);
                    }
                }
                // console.log(otherUserIndex);
                const otherUserDetail = await apiUtil.get(buildUrl(`/${element.users[otherUserIndex[index]]}`))
                // console.log(otherUserDetail);
                return otherUserDetail.data;
            })
            const otherUserDetails = await Promise.all(promises);
            // console.log(otherUserIndex);
            console.log('OtherUserDetails');
            console.log(otherUserDetails);
            // console.log(response.data);

            const formattedDetails = await this.joinDetails(response.data, otherUserDetails, otherUserIndex);
            console.log('formattedDetails');
            console.log(formattedDetails);
            return formattedDetails;
        } catch(err) {
            console.log(err);
        }
    },
    async joinDetails (getAllArray, otherUserDetails, otherUserIndex) {
        let response = getAllArray;
        for (let i = 0; i < response.length; i++){
            for (let j = 0; j < otherUserDetails.length; j++) {
                if (response[i].users[otherUserIndex[i]] === otherUserDetails[j]._id) {
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