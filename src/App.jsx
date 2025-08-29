import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MainBanner from "./components/home/MainBanner";
import "./i18n";

export default function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <MainBanner />
      {/* <Footer /> */}
    </div>
  );
}
