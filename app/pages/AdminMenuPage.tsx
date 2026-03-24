import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuScreen } from '~/components/menu/MenuScreen';
import { useMenu } from '~/hooks/useMenu';
import { getAdminMenuData } from '~/data/menuData';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser, selectIsAuthenticated } from '~/features/auth/authSlice';
import type { MenuData } from '~/types/menu';

export default function AdminMenuPage() {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    console.log('🔍 AdminMenuPage - Checking authentication:', { isAuthenticated, user });
    
    // Check authentication using Redux
    if (!isAuthenticated || !user) {
      console.log('❌ Not authenticated, redirecting to login');
      navigate('/login', { replace: true });
      return;
    }

    // Only verify admin role for administrative functions
    if (user.role !== 'admin') {
      console.log('🔄 User is not admin, redirecting to main menu');
      navigate('/menu/main', { replace: true });
      return;
    }

    console.log('✅ User authorized for admin menu');
    setMenuData(getAdminMenuData());
  }, [navigate, isAuthenticated, user]);

  const { loading, error, handleOptionSelect, handleExit } = useMenu({
    onError: (error) => console.error('Admin menu error:', error),
    onSuccess: (option) => console.log('Admin option selected:', option.labelKey),
  });

  if (!menuData) {
    return null;
  }

  return (
    <MenuScreen
      menuData={menuData}
      onOptionSelect={handleOptionSelect}
      onExit={handleExit}
      error={error}
      loading={loading}
    />
  );
}
