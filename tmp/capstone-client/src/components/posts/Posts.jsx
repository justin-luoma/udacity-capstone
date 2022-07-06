import React, {useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {createPost, getPosts, updatePost} from "../../api/posts/postApi";
import Post from "./Post";
import {Modal, Nav, Row, Spinner} from "react-bootstrap";
import CreatePost from "./CreatePost.";
import {uploadImage} from "../../api/images/imageApi";

const Posts = ({setCreatePostRef: setCreatePostRef}) => {
    const {getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [validated, setValidated] = useState(false);

    const fetchPosts = async () => {
        const token = await getAccessTokenSilently();
        setPosts(await getPosts(token));
        setLoading(false);
    };

    const savePost = async (post) => {
        const token = await getAccessTokenSilently();
        const newPost = await createPost(post, token);
        setLoading(false);

        console.log(newPost);
        return newPost;
    };

    const saveImage = async (id, image) => {
        const token = await getAccessTokenSilently();
        const imageUrl = await uploadImage(id, image, token);
        const updated = await updatePost(id, {
            "imageUrl": imageUrl,
        }, token);

        console.log("updated: ", updated);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        setShowCreateModel(false);

        const saved = await savePost({
            "text": values.text,
        });

        if (values.image !== undefined) {
            await saveImage(saved.id, values.image);
        }

        await fetchPosts();
        setValidated(true);
    };

    const handleCreate = () => {
        setLoading(false);
        setValidated(false);
        setShowCreateModel(true);
    };


    useEffect(() => {
        if (posts === null && loading === true) {
            fetchPosts();
        }
        if (loading) {
            setCreatePostRef(<Spinner animation="border" role="status"/>);
        } else {
            setCreatePostRef(<Nav.Link onClick={handleCreate}>Create Post</Nav.Link>);
        }
    }, [loading]);

    return <>
        {posts && posts.map(post => (
            <Row className="mb-3">
                <Post key={post.id} post={post}/>
            </Row>
        ))}
        <Modal show={showCreateModel} onHide={() => setShowCreateModel(false)}>
            <Modal.Header closeButton>
                Create Post
            </Modal.Header>
            <Modal.Body>
                <CreatePost validated={validated} handleSubmit={handleSubmit} loading={loading}/>
            </Modal.Body>
        </Modal>

    </>;
};

export default Posts;
