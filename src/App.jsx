import { Button, Footer, Header, Input } from "./components/index";

function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <Input label="Email" placeholder="Enter your email" type="email"  />
        <Button />
        <Footer />
      </div>
    </div>
  );
}

export default App;
