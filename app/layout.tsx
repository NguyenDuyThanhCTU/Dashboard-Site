import Loading from '@components/Items/Loading';
import { AuthProviders } from '@context/AuthProviders';
import { StateProvider } from '@context/StateProvider';
import '@styles/styles.css';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body className="font-LexendDeca font-light">
        <StateProvider>
          <Loading />
          <AuthProviders>{children}</AuthProviders>
        </StateProvider>
      </body>
    </html>
  );
}
