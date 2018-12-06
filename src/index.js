import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import appRouter from './utils/router';

ReactDOM.render(appRouter, document.getElementById('root'));

serviceWorker.unregister();
