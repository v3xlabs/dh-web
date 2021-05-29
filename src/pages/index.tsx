import { useEffect } from 'react';

const IndexPage = () => {
  useEffect(() => {
    document.location.replace('/dashboard');
  });
}

export default IndexPage
