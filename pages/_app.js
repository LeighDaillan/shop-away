import Router from "next/router";
import { Poppins } from "@next/font/google";
import ProgressBar from "@badrap/bar-of-progress";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import Layout from "../components/Layout/layout";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const progress = new ProgressBar({
  size: 4,
  color: "#a3a3a3",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
  );
}
