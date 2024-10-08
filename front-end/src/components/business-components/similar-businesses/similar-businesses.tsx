import BookingModal from '@/components/booking-modal/booking-modal';
import PrimaryButton from '@/components/primary-button/primary-button';
import { FC, useState } from 'react';
import { ReactSVG } from 'react-svg';
import BookIcon from '@/assets/book-icon.svg';
import { Business } from '@/types/business';
import BusinessCard from '@/components/business-components/business-card/business-card';
import useBusinessesByCategory from '@/hooks/use-businesses-by-category';
import useAuth from '@/store/use-auth';
import { useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import styles from './styles.module.scss';

interface Props {
  activeCategory: string,
  businessId: string,
}

const SimilarBusinesses: FC<Props> = ({ activeCategory, businessId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data } = useBusinessesByCategory(activeCategory);
  const businesses = data ?? [];
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBook = () => {
    if (user) {
      setModalIsOpen(true);
    } else {
      navigate(routes.LOGIN);
    }
  };

  const closeModal = () => setModalIsOpen(false);

  const filteredBusinesses = businesses.filter(
    (business: Business) => business.id !== businessId,
  );

  const limitedBusinesses = filteredBusinesses.slice(0, 4);

  return (
    <>
      <div className={styles.section}>
        <PrimaryButton
          onClick={handleBook}
          variant='primary'
        >
          <div className={styles.buttonChild}>
            <ReactSVG className={styles.icon} src={BookIcon} />
            <div>Book Appointment</div>
          </div>
        </PrimaryButton>

        {limitedBusinesses && limitedBusinesses.length > 0 && (
        <div className={styles.similarBusinessesWrapper}>
          <h3 className={styles.title}>Similar Businesses</h3>

          <div className={styles.similarBusinesses}>
            {limitedBusinesses.map((business) => {
              return (
                <BusinessCard
                  key={business.id}
                  business={business}
                  variant='small'
                  showButton={false}
                />
              );
            })}
          </div>
        </div>
        )}

      </div>
      <BookingModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default SimilarBusinesses;
