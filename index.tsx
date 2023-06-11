import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.less';

const root = createRoot(document.querySelector('#root'))
root.render(<App />)
