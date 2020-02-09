import React from 'react';
import Routes from "./routes";
import moment from 'moment/min/moment-with-locales';

moment.locale('pt', {
    calendar: {
        lastDay: '[Ontem]',
        sameDay: '[Hoje]',
        nextDay: '[Amanhã]',
        sameElse: 'DD MMMM YYYY'
    }
});
const App = () => <Routes />;

export default App;