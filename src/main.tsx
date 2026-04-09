import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { persistFacebookClickIdFromUrl } from './lib/fbclidCookie'
import { installLeakedFacebookSnippetCleanup } from './lib/removeLeakedFacebookSnippet'

persistFacebookClickIdFromUrl()
installLeakedFacebookSnippetCleanup()

createRoot(document.getElementById("root")!).render(<App />);
