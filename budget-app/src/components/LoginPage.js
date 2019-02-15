import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {Link} from 'react-router-dom';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);

    };

    onEmailChange = (e) =>{
        const email = e.target.value;
        this.setState(()=>({email}));
    };

    onPasswordChange = (e) =>{
        const password = e.target.value;
        this.setState(()=>({password}));
    };

    handleSubmit = (e) =>{
        console.log('handle submit');
        e.preventDefault();
        let { email, password } = this.state;
        this.props.login(email, password);
        console.log('set state',this.state);
        this.setState({
        email: '',
        password: ''
        });
        document.getElementById("login-form").reset();
  }


render(){
    //let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return(
    <div>  
        <h1>Budget</h1>
        <p>It's time to get your expenses under control.</p>
        <form onSubmit={this.handleSubmit} id="login-form">
        <input
        type="text"
        name="email"
        placeholder="email"
        autoFocus
        className="text-input"
        //value={this.state.emal}
        onChange={this.onEmailChange}
        />
        <input
        name="password"
        type="text"
        placeholder="Password"
        className="text-input"
        //value={this.state.password}
        onChange={this.onPasswordChange}
        />
        <button>
        Login
        </button>
        <div>
        { isLoginPending && <div>Please wait...</div> }
        { isLoginSuccess && <div>Success.</div> }
        { loginError && <div>{loginError.message}</div> }
      </div>
        </form>
        <Link to="/signup">Signup</Link>

    </div>
        );
    };
};

const mapStateToProps = (state)=>{
    return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError,
    authToken: state.authToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        login: (email,password) => dispatch(login(email,password))
    };
};
// const mapDispatchToProps = (dispatch) => ({
//     startLogin2: () => dispatch(startLogin2())
// });



//export default connect(undefined, mapDispatchToProps)(LoginPage);

// cons mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

//export default LoginPage;

