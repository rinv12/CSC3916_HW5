import React, { Component } from 'react';
import {addReview, fetchMovie} from "../actions/movieActions";
import {connect} from 'react-redux';
import {Button, Card, Form, ListGroup, ListGroupItem} from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    constructor(props) {
        super(props);
        console.log('props', props);

        this.updateDetails = this.updateDetails.bind(this);
        this.submitReview = this.submitReview.bind(this);

        this.state = {
            details: {
                title: '',
                comment: '',
                rating: 0
            }
        }
    }

    submitReview(){
        const {dispatch} = this.props;
        if(this.state.details.comment === "" || this.state.details.rating === 0){
            alert("no rating or review")
        }else{
            dispatch(addReview(this.state.details));
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movie_id));
        }
    }

    updateDetail(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        updateDetails['title'] = this.props.selectedMovie.title;
        this.setState({
            details: updateDetails
        });
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.movie_title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actor_name}</b> {actor.character_name}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.rating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.comment}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                    <Card.Header>Add Review</Card.Header>
                    <Form className= 'form-horizontal'>
                        <Form.Group controlId= "movie comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control onChange= {this.updateDetails} value = {this.state.details.comment} type = "Text" placeholder = "Write a comment"/>
                        </Form.Group>

                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.rating} type = "Number" min = "1" max = "5" placeholder = "choose movie rate"/>
                        </Form.Group>
                        <Button onClick={this.submitReview}>Submit</Button>
                    </Form>
                </Card>
            )
        }
        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = (state) => {
    console.log()
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

