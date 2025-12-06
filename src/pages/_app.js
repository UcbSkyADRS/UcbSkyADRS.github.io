import "../styles/globals.css";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-full max-w-full overflow-x-hidden full-container flex flex-col md:flex-row">
      <div className="md:w-56 md:flex-shrink-0">
        <Nav />
      </div>
      <div id="content" className="md:overflow-y-scroll md:overflow-x-hidden md:max-h-screen text-primary flex-1 min-w-0 flex flex-col bg-white md:border-l md:border-neutral-200 md:shadow-lg">
        <main className="w-full px-6 py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default MyApp;
