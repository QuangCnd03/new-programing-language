import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const usePageTitle = (title) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('.', { state: { pageTitle: title } });
  }, [navigate, title]);
};

export default usePageTitle;