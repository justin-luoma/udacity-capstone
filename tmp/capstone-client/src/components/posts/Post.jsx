import React from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";

const Post = ({post}) => {
    return <Card className="p-2">
        {post.imageUrl && <Card.Img variant="top" src={post.imageUrl}/>}
        <Card.Body>
            <Card.Text>
                {post.text}
                {/*{JSON.stringify(post, null, "  ")}*/}
            </Card.Text>
            <Row className="d-flex justify-content-between">
                <Col className="col-2">
                    <Row>
                        <Button variant="outline-light" onClick={() => {}}>Edit <BsFillPencilFill className="pb-1"/></Button>
                    </Row>
                </Col>
                <Col className="col-3">
                    <Row>
                        <Button variant="outline-danger" onClick={() => {}}>Delete <BsFillTrashFill className="pb-1"/></Button>
                    </Row>
                </Col>
            </Row>
        </Card.Body>
    </Card>;
};

export default Post;
