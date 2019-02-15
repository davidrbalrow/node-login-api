
import React from 'react';
//import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';

import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import BudgetDashboardPage from '../components/BudgetDashboardPage';
import NotFoundPage from '../components/NotFoundPage';


export const history = createHistory();

class AppRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleSubmit = this.onAuthStateChange.bind(this);

    };

    onAuthStateChange = (token) => {
    
        if (token){
            console.log('We be logged in', token);
        } else {
            console.log('not logged in');
        }
    };


render(){
    return(
    <Router history ={history}>
    <div>
    <Switch>
    <Route path="/" component={LoginPage} exact={true}/>
    <Route path="/dashboard" component={BudgetDashboardPage}/>
    <Route path="/signup" component={SignupPage}/>
    <Route component={NotFoundPage}/>
    </Switch> 
    {this.onAuthStateChange(this.props.authToken)}
</div>
</Router>)
}
}


// const onAuthStateChange = (token) => {
//     if (token){
//         console.log('token', token);
//     } else {
//         console.log('not logged in');
//     }
// };

const mapStateToProps = (state)=>{
  //  console.log(state);
    return {
    authToken: state.authToken
    }
};

export default connect(mapStateToProps)(AppRouter);

//export default AppRouter;