import {HEADERS, POST_API_ENDPOINT} from "../../config";

export const getPosts = async (accessToken) => {
    try {
        const resp = await fetch(`${POST_API_ENDPOINT}/posts`, {
            method: "GET",
            headers: HEADERS(accessToken),
        });

        return await resp.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const getPost = async (id, accessToken) => {
    try {
        const resp = await fetch(`${POST_API_ENDPOINT}/posts/${id}`, {
            method: "GET",
            headers: HEADERS(accessToken),
        });

        return await resp.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const deletePost = async (id, accessToken) => {
    try {
        const resp = await fetch(`${POST_API_ENDPOINT}/posts/${id}`, {
            method: "DELETE",
            headers: HEADERS(accessToken),
        });
    } catch (err) {
        console.error(err);
    }
};

export const updatePost = async (id, postUpdate, accessToken) => {
    try {
        const resp = await fetch(`${POST_API_ENDPOINT}/posts/${id}`, {
            method: "PUT",
            headers: HEADERS(accessToken),
            body: JSON.stringify(postUpdate),
        });

        return await resp.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const createPost = async (post, accessToken) => {
    try {
        const resp = await fetch(`${POST_API_ENDPOINT}/posts`, {
            method: "POST",
            headers: HEADERS(accessToken),
            body: JSON.stringify(post),
        });

        return await resp.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};
