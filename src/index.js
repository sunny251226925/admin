import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import router from './utils/router';


ReactDOM.render(router, document.getElementById('root'));

serviceWorker.unregister();
