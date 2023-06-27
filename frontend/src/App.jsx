import { Profile } from "./components/Profile"
import { UploadButton } from "./components/UploadButton"
import {ImagesList} from "./components/ImagesList"

function App() {
  
  return (
    <div className="main-app">
      <Profile/>
      <UploadButton />
      <ImagesList />
   </div>
  )
}

export default App
