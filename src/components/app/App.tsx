import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Ligth from '../ligth';
// import Timer from '../timer';

const App: React.FC = () => {
    return (
        <div className='App'>
            <Switch>
                <Route
                    path='/green'
                    render={(props) => <Ligth {...props} baseTime={5000} />}
                />
                <Route
                    path='/red'
                    render={(props) => <Ligth {...props} baseTime={5000} />}
                />
                <Route
                    path='/yellow'
                    render={(props) => <Ligth {...props} baseTime={3000} />}
                />
            </Switch>
        </div>
    );
};

export default App;
