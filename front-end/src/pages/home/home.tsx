import SearchSection from '@/components/search-section/search-section';
import BusinessesSection from '@/components/business-components/businesses-section/businesses-section';
import HeroBox from '@/components/hero-box/hero-box';
import ServicesSection from '@/components/services-section/services-section';
import Container from '@/components/container/container';
import styles from './styles.module.scss';

const HomePage = () => {
  return (
    <>
      <HeroBox />
      <SearchSection />
      <ServicesSection />
      <section className={styles.bsWrapper}>
        <Container>
          <h2 className={styles.bsTitle}>Popular businesses</h2>
          <BusinessesSection />
        </Container>
      </section>
    </>
  );
};

export default HomePage;
