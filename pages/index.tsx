import { AppConfig } from '@/utils/AppConfig';
import { Meta } from '../components/Meta';
import Main from './App/Main';

export default function Home() {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Main />
    </>
  );
}
