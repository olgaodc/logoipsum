import { useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import useAuth from '@/store/use-auth';
import { useState } from 'react';
import Logo from '@/components/logo/logo';
import Container from '../../container/container';
import PrimaryButton from '../../primary-button/primary-button';
import styles from './styles.module.scss';
import Avatar from '../avatar/avatar';
import DesktopMenu from '../desktop-menu/desktop-menu';
import MobileMenu from '../mobile-menu/mobile-menu';
import BurgerButton from '../burger-button/burger-button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate(routes.LOGIN);
  };

  return (
    <div className={styles.navbarWrapper}>
      <Container>
        <nav className={styles.navbar}>
          <MobileMenu isOpen={isMenuOpen} closeMenu={handleNavigate} />
          <div className={styles.navbarList}>
            <BurgerButton isMenuOpen={isMenuOpen} toggleMenu={handleMenuToggle} />
            <Logo />
            <DesktopMenu />
          </div>
          {user
            ? <Avatar />
            : (
              <PrimaryButton
                variant='primary'
                onClick={handleLogin}
              >
                <span className={styles.largeBtnText}>Log In / Sign Up</span>
                <span className={styles.smallBtnText}>Log In</span>
              </PrimaryButton>
            )}
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
