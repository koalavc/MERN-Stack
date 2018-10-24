import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/authActions";

class Register extends Component {

    // Basic state for our Register component
    constructor(){
        super();
        // State is a object with values
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        // Binding `this` within the constructor for our methods. This fixes the `setState of undefined`
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    // Whenever the user types it will fire off onChange and put into that input the state variables
    onChange(e){
        // Changing component state. 
        // e.target.name will target the name field and then we set it to the value of the input
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);

        // Using axios to make a POST request
        
    }

    render() {

        // Desctructuring. It allows us to pull errors out of the state instead of assigning it directly
        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames('form-control form-control-lg', {
                                            // is-invalid class will fire if errors.name exists
                                            'is-invalid': errors.name
                                        })} 
                                        placeholder="Name" 
                                        name="name" 
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}                                         
                                        placeholder="Email Address" 
                                        name="email" 
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}

                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })}    
                                        placeholder="Password" 
                                        name="password" 
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password2
                                        })}    
                                        placeholder="Confirm Password" 
                                        name="password2" 
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                    />
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                </div>
                                <input 
                                    type="submit" 
                                    className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));