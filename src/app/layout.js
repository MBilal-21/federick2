import { Roboto } from 'next/font/google';
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import SessionWrapper from "../components/SessionWrapper";
import LoadingScreen from '@/components/LoadingScreen';
import Loading from '@/components/Loading';
import { Suspense } from 'react';


const roboto = Roboto({
  weight: ['400', '700'], // Specify the font weights you need
  subsets: ['latin'], // Specify the subsets you need
  display: 'swap', // Ensure text remains visible during webfont load
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} `}>
      <LoadingScreen /> 
        <SessionWrapper>
          <CustomNavbar />
          <Suspense fallback={<Loading />}>
          <main>
            {children}
          </main>
          </Suspense>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
