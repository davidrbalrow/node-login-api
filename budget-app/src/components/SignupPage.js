import React from 'react';
import {connect} from 'react-redux';
import {signup} from '../actions/auth';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pwLengthPass: false,
            pwUpperPass: false,
            pwNumberPass:false,
            pwSpecialPass:false,
            pwMatchPass: false,
            emValidPass: true
        };
        
        this.onPasswordChange = this.onPasswordChange.bind(this);       
    };


    checkPasswordLength = (password) => {
        password.length>0 && password.length < 8 ? this.setState({pwLengthColor: 'red', pwLengthPass: false}) 
       : this.setState({pwLengthColor: 'green', pwLengthPass:true})  ; 
    }

    checkPasswordUpper= (password) => {
       let upperCharacter = (/[A-Z]/.test(password));
            upperCharacter ? this.setState({pwUpperColor: 'green', pwUpperPass: true}) 
        : this.setState({pwUpperColor: 'red', pwUpperPass:false})  ; 
     }

    checkPasswordNumber= (password) => {
        let number = (/[0-9]/.test(password));
        number ? this.setState({pwNumberColor: 'green', pwNumberPass: true}) 
         : this.setState({pwNumberColor: 'red', pwNumberPass:false})  ; 
      }

    checkPasswordSpecial= (password) => {
      
       const pattern= /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/;
        let specialCharacter =pattern.test(password);
       specialCharacter ? this.setState({pwSpecialColor: 'green', pwSpecialPass: true}) 
         : this.setState({pwSpecialColor: 'red', pwSpecialPass:false})  ; 
      }

    checkPasswordMatch= (password, password2) => {
          console.log('match ',password);
          console.log('match ',password2);
        (password2 === password) ? this.setState({pwMatchColor: 'green', pwMatchPass: true}) 
        : this.setState({pwMatchColor: 'red', pwMatchPass: false}) 
        
       }

    checkValidEmail = (email) => {
        var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail =pattern.test(email);
        validEmail ? this.setState({emailValidColor: 'green', emailValidPass: true}) 
          : this.setState({emailValidColor: 'red', emailValidPass:false})  ; 
    }

    onEmailChange = (e) =>{
        const email = e.target.value;
        this.setState(()=>({email}));
        this.checkValidEmail(email);
    };

    onPasswordChange = (e) => {
        
        const password = e.target.value;
        this.setState(()=>({password}));
        this.checkPasswordLength(password);
        this.checkPasswordUpper(password);
        this.checkPasswordSpecial(password);
        this.checkPasswordNumber(password);
        this.checkPasswordMatch(password, this.state.password);
    }

    onPassword2Change = (e) => {
        const password2 = e.target.value;
        this.setState(()=>({password2}));
        console.log(password2);
        let password = this.state.password;
        this.checkPasswordMatch(password, password2);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { email, password, error } = this.state;
        console.log('email/pw',email,password, error, this.state);
        console.log('this.state. in handleSubmit',this.state);
        this.checkEmailPwPass().then((r)=>{
           // this.setState({error: ''});
            console.log(r);
        const res =  this.props.signup(email, password)
        .catch((res)=>{
            res ? this.setState({error: 'Email already registered'}) : console.log("search failed");
        });
            
        }).catch((e)=>{console.log('no match')});
    };



    
    // checkPwPass = new Promise ((resolve, reject) => {
    //     if (this.state){
    //         if (this.state.pwLengthTest&& this.state.pwUpperPass && this.state.pwNumberPass && this.state.pwSpecialPass 
    //             && this.state.pwMatchPass) {
    //                 resolve();}
    //             else{
    //         reject();}
    //     } ;
       
    // });
    checkEmailPwPass = async () => {
       // if (this.state){
        
            if (this.state.pwLengthPass&& this.state.pwUpperPass && this.state.pwNumberPass && this.state.pwSpecialPass 
                && this.state.pwMatchPass && this.state.emailValidPass) {  
                    console.log('async',this.state) ;
                    this.setState({error: ''});
                    return 'return value from async';
                } else {
                    this.setState({error: 'Please enter valid username/password'});
                    throw new Error('no match in promise')}
        } 
        //else {throw new Error('no match')};
        //};

    render(){
        return(
        <div>
            <h1>Budget</h1>
            <p>It's time to get your expenses under control.</p>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleSubmit} id="login-form">
            <input
            type="text"
            name="email"
            placeholder="email"
            autoFocus
            className="text-input"
            onChange={this.onEmailChange}
            />
            <input
            name="password"
            type="text"
            placeholder="Password"
            className="text-input"
            onChange={this.onPasswordChange}
            />
            <input
            name="password2"
            type="text"
            placeholder="Re-enter Password"
            className="text-input"
            onChange={this.onPassword2Change}
            />
            <p style={{color:this.state.emailValidColor}}>enter valid email</p>
            <p style={{color:this.state.pwLengthColor}}>password must be 8 characters</p>
            <p style={{color:this.state.pwUpperColor}}>password must contain a capital letter</p>
            <p style={{color:this.state.pwSpecialColor}}>Password must contain special character</p>
            <p style={{color:this.state.pwNumberColor}}>Password must contain a number</p>
            <p style={{color:this.state.pwMatchColor}}>Passwords must match</p>
            <button>
            Signup
            </button>
            </form>
        </div>
        );
    };

};

const mapDispatchToProps = (dispatch) => {
    return{
        signup: (email,password) => dispatch(signup(email,password))
    };
};


export default connect(undefined, mapDispatchToProps)(SignupPage);