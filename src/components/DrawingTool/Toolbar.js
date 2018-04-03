import React, { Component } from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
import paintBucket from './paint-bucket.svg';
import TinyColorPicker from './TinyColorPicker';

const Toolbar = () => {
    return (
        <div>
            <i class="fas fa-paint-brush"></i>
            <i class="fas fa-eraser"></i>
            <i class="fas fa-circle"></i>
            <i class="far fa-lightbulb"></i>
            <i class="fas fa-undo"></i>
            <i class="fas fa-redo"></i>
            <img src={paintBucket} width='14' height='14'/>
            <TinyColorPicker startingColor={{r: 0, g: 0, b: 0}}/>
            <TinyColorPicker startingColor={{r: 255, g: 255, b: 255}}/>
        </div>
    );
}

export default Toolbar;