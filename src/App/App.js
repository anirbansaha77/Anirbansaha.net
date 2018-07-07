import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
import React from 'react';

import classnames from 'classnames/bind';
import * as styles from './App.css';

const cx = classnames.bind(styles);
class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <div className={cx('container')}>
                <header className={cx('container')}>
                    <div id='menu' className={cx('navbar','navbar-default')}>
                        <ul>
                            <li>
                                <a href='./'>Home</a>
                            </li>
                            <li>
                                <a href='./'>Products</a>
                            </li>
                        </ul>
                        <button className={cx('btn')} >Login</button>
                    </div>
                </header>
                <hr/>
                <div id='body' className={cx('container')}>
                    <div>
                        {this.props.App.name}
                    </div>
                    <div>
                        {this.props.Product.name}
                    </div>
                    <img className={cx('img-thumbnail')} alt='batman' src='img/batman.jpg'  />
                </div>
                <hr />
                <div id='footer' className={cx('container')}>
                    footer
                </div>
            </div>
        );
    }
}

App.defaultProps = {
    Model: {},
    Color: {},
    actions: {},
};

App.propTypes = {
    App: PropTypes.object,
    Product: PropTypes.object,
};
const mapStateToProps = (state) => {
    return {
        App: state.App,
        Product: state.Product,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        actions: bindActionCreators(Object.assign({}), dispatch),
    };
    
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

