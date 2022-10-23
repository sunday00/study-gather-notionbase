import {RecoilRoot} from "recoil";
import {Route, Routes} from "react-router-dom";
import AuthApp from "@v/AuthApp.jsx";
import Nav from "@c/Nav.jsx";

function App() {
  return (
    <RecoilRoot>
      <div className="App" data-theme="night">
        <section className="fixed w-full">
          <Nav />
        </section>
        <section>
          <div className="h-20"></div>
          <Routes>
            <Route path="*" element={<AuthApp />} />
          </Routes>
        </section>
      </div>
    </RecoilRoot>
  )
}

export default App
