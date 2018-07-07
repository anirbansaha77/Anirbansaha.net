import PropTypes from 'proptypes';
import React from 'react';
import classnames from 'classnames/bind';

import * as styles from './RadioButton.css';

const cx = classnames.bind(styles);

class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        let eventProps = {
            selectedItem: this.props.Model,
        };
        this.props.onChange(event, eventProps);
    }

    renderButton() {
        if(this.props.Model.hidden) {
            return null;
        } else {
            return (
                <div  className={cx('displayInline')}>
                    <input
                        type='radio'
                        name={this.props.Model.name}
                        value={this.props.Model.value}
                        id={this.props.Model.id}
                        disabled={this.props.Model.disabled} />
                    <label
                        htmlFor={this.props.Model.id}
                        onClick={this.onChange}
                        className="last">{this.props.Model.label}
                    </label>
                </div>    
            );
        }
    }

    render() {
        return(
            this.renderButton()
        );
    }
}

RadioButton.defaultProps = {
    Model: {
        name: 'seg-1',
        value: 'Tags',
        id: 'seg-Tags',
        disabled: '',
        hidden: false,
        label:'tags',
    }
};

RadioButton.propTypes = {
    Model: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default RadioButton;
