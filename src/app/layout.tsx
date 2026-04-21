import '@/ui/css/global.css';
import * as fonts from '@/fonts';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={`${fonts.righteous.variable} ${fonts.ojuju.variable} ${fonts.nothingYouCouldDo.variable} ${fonts.poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}