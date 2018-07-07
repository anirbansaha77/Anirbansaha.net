import PropTypes from 'proptypes';
import React from 'react';
import classnames from 'classnames/bind';

import RadioButton from './RadioButton';
import * as styles from './RadioButton.css';

const cx = classnames.bind(styles);
class MyRadioButtonList extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.handleChange.bind(this);
    }

    handleChange(event, eventProps) {
        event.preventDefault();
        this.props.onChange(event, eventProps);
    }

    render() {
        return (
            <div className={cx('segmented-button')}>
                {this.props.options.map( item => {
                    return(
                        <RadioButton key={item.value} Model={item} onChange={this.onChange} />
                    );
                })}
            </div>
        );
    }
}

MyRadioButtonList.defaultProps = {
    options: [],
};

MyRadioButtonList.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};

export default MyRadioButtonList;
