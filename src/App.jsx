import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components/index";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <ScrollToTop />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
