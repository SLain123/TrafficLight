import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Ligth from '../ligth';
import Timer from '../timer';

const App: React.FC = () => {
    return (
        <div className='App'>
            <Timer />
            <Switch>
                <Route
                    path='/green'
                    render={(props) => <Ligth {...props} baseTime={15} />}
                />
                <Route
                    path='/red'
                    render={(props) => <Ligth {...props} baseTime={10} />}
                />
                <Route
                    path='/yellow'
                    render={(props) => <Ligth {...props} baseTime={3} />}
                />
            </Switch>
        </div>
    );
};

export default App;
