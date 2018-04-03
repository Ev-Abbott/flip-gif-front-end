import React, { Component } from 'react'
import reactCSS from 'reactcss'
import { CompactPicker } from 'react-color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setEraserColor } from '../../../actions/index';

class EraserColorPicker extends Component {
    state = {
        displayColorPicker: false,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color, setEraserColor) => {
        setEraserColor(color.rgb);
    };
    
    render() {
        let styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.props.eraserColor.r }, ${ this.props.eraserColor.g }, ${ this.props.eraserColor.b })`,
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
                top: '-60px',
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
                    <CompactPicker color={ this.state.color } onChange={ (color) => this.handleChange(color, this.props.setEraserColor) } />
                </div> : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    eraserColor: state.eraserColor
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setEraserColor
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EraserColorPicker);