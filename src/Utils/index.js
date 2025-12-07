import axios from "axios";

// Upload image by imagbb
export const uploadImage = async (imageData) => {
    const formData = new FormData()
    formData.append('image', imageData)
    const imageApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

    const result = await axios.post(imageApi, formData);
    return result.data.data.url
}