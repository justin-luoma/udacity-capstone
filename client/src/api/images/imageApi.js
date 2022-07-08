import {IMAGE_API_ENDPOINT} from "../../config";
import axios from "axios";

const getImageUrl = async (id, accessToken) => {
    try {
        const resp = await axios.post(`${IMAGE_API_ENDPOINT}/images/${id}`, null, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });

        return resp.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const uploadImage = async (id, image, accessToken) => {
    const imageResp = await getImageUrl(id, accessToken);
    console.log("imageResp: ", imageResp);
    if (imageResp != null) {
        try {
            const resp = await fetch(imageResp.uploadUrl, {
                method: "PUT",
                body: image,
            });

            console.log(resp);

            return imageResp.imageUrl;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
};
