
import React from 'react';
//import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import BudgetDashboardPage from '../components/BudgetDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import {connect} from 'react-redux';

export const history = createHistory();

const AppRouter = () => (
    <Router history ={history}>
    <div>
    <Switch>
    <Route path="/" component={LoginPage} exact={true}/>
    <Route path="/dashboard" component={BudgetDashboardPage}/>
    <Route component={NotFoundPage}/>
    </Switch>   
</div>
</Router>
)

onAuthStateChange(props.authToken);

const onAuthStateChange = (token) => {
    if (token){
        console.log(token);
    } else {
        console.log('not logged in');
    }
};

const mapStateToProps = (state)=>{
    return {
    authToken: state.authToken
    }
};

export default connect(mapStateToProps)(AppRouter);

//export default AppRouter;