import React, { Component } from 'react';
import { Container, Header, Image, Card, Transition, List } from 'semantic-ui-react';
import axios from 'axios';

const BaseUrl = 'http://localhost:8080';

class HomePage extends Component {
    state = {
        gifs: []
    }

    componentDidMount() {
        axios.get(`${BaseUrl}/flipbooks`)
            .then(flipbooks => {
                this.setState({ gifs: flipbooks.data.data });
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            
            <Container text style={{ marginTop: '5em'}}>
                
                <Transition.Group 
                    as={List}
                    animation='scale' 
                    duration={1000} 
                    transitionOnMount
                    relaxed>
                {this.state.gifs.map(gif => {
                    if (gif.gifURL) {
                        return (
                            <List.Item>
                                <Card key={gif} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) '}}>
                                    <Image src={gif.gifURL} bordered rounded/>
                                    <Card.Content>
                                        <Card.Header>
                                            <span className='header-styled-text'>Title: {gif.name}</span>
                                        </Card.Header>
                                    </Card.Content>
                                </Card>
                            </List.Item>
                            
                        );
                    }
                })}
                </Transition.Group>
            </Container>
           
        );
    }
}

export default HomePage;