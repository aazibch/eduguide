import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

// To convert to functional component

const withHttpErrorHandler = (PassedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    this.setState({ error: error });
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorDismissHandler = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <>
                    <Modal
                        title='Error'
                        show={this.state.error ? true : false}
                        hideClickHandler={this.errorDismissHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <PassedComponent {...this.props} />
                </>
            );
        }
    };
};

export default withHttpErrorHandler;
