import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import Clipboard from 'react-clipboard.js';
import { Container, Image, Card, Transition, List } from 'semantic-ui-react';
import FooterBar from '../FooterBar/FooterBar';
import axios from 'axios';

const BaseUrl = 'http://localhost:8080';

class HomePage extends Component {
    state = {
        gifs: []
    }

    componentDidMount() {
        axios.get(`${BaseUrl}/flipbooks`)
            .then(flipbooks => {
                this.setState({ gifs: flipbooks.data.data.reverse() });
            })
            .catch(err => {
                console.log(err);
            })
    }

    clipboardCopied = () => {
        notify.show('Gif URL copied!', 'success', 1500)
    }

    downloadImage = (gifURL, name) => {   
        axios.get(`${gifURL}`, { responseType: 'blob',headers: { 'Access-Control-Allow-Origin': '*' }})
            .then(res => {
                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${name}.gif`);
                link.click();
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Container text style={{ marginTop: '5em'}}>
                
                    <Transition.Group 
                        as={List}
                        animation='scale' 
                        duration={1000} 
                        
                        relaxed>
                    {this.state.gifs.map((gif, i) => {
                        if (gif.gifURL) {
                            return (

                                <List.Item key={i}>
                                    <Clipboard data-clipboard-text={gif.gifURL} onSuccess={this.clipboardCopied}>
                                        <Card key={gif} fluid style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) '}}>
                                            
                                            <Image data-clipboard-text={gif.gifURL} src={gif.gifURL} bordered rounded fluid/>
                                           
                                            
                                            
                                            
                                            <Card.Content>
                                                <Card.Header>
                                                    
                                                    <span className='header-styled-text' onClick={() => this.downloadImage(gif.gifURL, gif.name)}>Title: {gif.name}</span>
                                                    
                                                </Card.Header>
                                            </Card.Content>
                                        </Card>
                                    </Clipboard>
                                </List.Item>
                                
                            );
                        } else {
                            return
                        }
                    })}
                    </Transition.Group>
                
                </Container>
            <FooterBar />
            </div>
            
           
        );
    }
}

export default HomePage;