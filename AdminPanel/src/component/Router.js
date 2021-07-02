import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home.js';
import NavBar from './Navbar';
import ViewCategory from './viewCategory'
import ViewItem from './ViewItem'
import AddCategory from './Addcategory'
import AddItem from './Additem'
import Login from './Login';
import Order from './Order';
function RouteConfig() {
    return (
        <div ClassName='Router'>
            <div className="main-wrapper">
                <Router>
                        <NavBar/>
                    <div className="comp">
                        <Switch>
                                  
                            <Route exact path="/pending" component={Order} />
                            <Route exact path="/adminpanel" component={Home} />
                            <Route exact path="/order" component={Order} />
                            <Route exact path="/delivered" component={Order} />
                            <Route exact path="/total" component={Order} />
                            <Route exact path="/rejected" component={Order}/> 
                            <Route exact path="/viewcategory" component={ViewCategory} />
                            <Route exact path="/viewitem" component={ViewItem} />
                            <Route exact path="/addcategory" component={AddCategory} />
                            <Route exact path="/additem" component={AddItem} />
                            <Route path="*" component={() => <h2>404 Not Found</h2>} />
                        </Switch>
                    </div>

                </Router>
            </div>
        </div>
    );
}

export default RouteConfig;