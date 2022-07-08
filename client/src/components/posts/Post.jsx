import React from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";

const Post = ({post, handleEdit, handleDelete}) => {


    return <Card className="p-2">
        {post.imageUrl && <Card.Img variant="top" src={post.imageUrl}/>}
        <Card.Body>
            <Card.Text>
                {post.text}
            </Card.Text>
            <Row className="d-flex justify-content-between">
                <Col className="col-2">
                    <Row>
                        <Button variant="outline-light" onClick={() => handleEdit(post)}>Edit <BsFillPencilFill
                            className="pb-1"/></Button>
                    </Row>
                </Col>
                <Col className="col-3">
                    <Row>
                        <Button variant="outline-danger" onClick={() => handleDelete(post.id)}>Delete <BsFillTrashFill
                            className="pb-1"/></Button>
                    </Row>
                </Col>
            </Row>
        </Card.Body>
    </Card>;
};

export default Post;
