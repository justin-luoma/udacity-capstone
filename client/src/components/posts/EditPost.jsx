import React, {useEffect, useRef} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const EditPost = ({post, handleEditSubmit, validated, loading}) => {
    const textRef = useRef();
    const imageRef = useRef();

    useEffect(() => {
        if (textRef.current) {
            textRef.current.value = post.text;
        }
    }, [textRef]);

    const onSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            const values = {
                "text": textRef.current.value,
                "image": imageRef.current.files[0]
            };
            handleEditSubmit(values, post);
        }
    };

    return <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Row>
            <Form.Group as={Col} controlId="text" className="mb-3">
                <Form.Label>Post Text</Form.Label>
                <Form.Control
                    required
                    as="textarea"
                    ref={textRef}
                />
                <Form.Control.Feedback type="invalid">Post text is required!</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col} controlId="image"  className="mb-3">
                <Form.Label>Update Image (optional)</Form.Label>
                <Form.Control type="file"
                              ref={imageRef}
                />
            </Form.Group>
        </Row>
        <Button type="submit" disabled={loading}>Save</Button>
    </Form>;
};

export default EditPost;
