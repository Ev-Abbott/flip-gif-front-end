import React, { Component } from 'react'
import reactCSS from 'reactcss'
import { CompactPicker } from 'react-color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBrushColor } from '../../../actions/index';

class BrushColorPicker extends Component {
    state = {
        displayColorPicker: false,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color, setBrushColor) => {
        setBrushColor({r: color.rgb.r, g: color.rgb.g, b: color.rgb.b});
    };
    
    render() {
        let styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgb(${ this.props.brushColor.r }, ${ this.props.brushColor.g }, ${ this.props.brushColor.b })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                top: '0px',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
        });
        return (
            <div>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <CompactPicker color={ this.state.color } onChange={ (color) => this.handleChange(color, this.props.setBrushColor) } />
                </div> : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    brushColor: state.brushColor
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setBrushColor
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrushColorPicker);

