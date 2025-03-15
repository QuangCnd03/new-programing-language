import axios from "axios";

export const getProfile = async (token) => {
    const response = await axios.get("http://127.0.0.1:8000/api/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const { success, user } = response.data;
    if(!success) {
        return false;
    }
    
    return user;
}
