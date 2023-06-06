import Footer from "../components/Footer";
import Header from "../components/Header";
import Homepage from "../components/Homepage";
import Application from "../components/Homepage/Application";
import Features from "../components/Homepage/Features"


const Home = () => {
  return (
    <div>
      <Header />
      <Homepage />
      <Features />
      <Application />
      <Footer />
    </div>
  );
};

export default Home;
