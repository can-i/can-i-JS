import * as express from 'express';
import InternalNameSpace from './internal_global';
import root from "./root";


const ROOT = root;

export function App() {
    let app = ROOT.app || (ROOT.app = express());
    return app;
}

export default App;

