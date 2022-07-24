import Layout from '../components/Layout';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Footer from '../components/Footer';
import Roadmap from '../components/Roadmap';
import Faq from '../components/Faq';
import About from '../components/About';

const Index = () => {
  return (
    <Layout pageTitle="Metabaes">
      <Header />
      <Hero />
      <Feature/>
      <Roadmap />
      <Faq />
      <About />
      <Footer />
    </Layout>
  )
}

export default Index;