import "../styles/globals.css";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-screen full-container flex flex-col md:flex-row">
      <div className="md:basis-1/5">
        <Nav />
      </div>
      <div id="content" className="md:overflow-y-scroll md:max-h-screen text-primary grow md:grow-0 md:basis-4/5 flex flex-col bg-white md:border-l md:border-neutral-200 md:shadow-lg">
        <main className="max-w-5xl w-full mx-auto px-6 py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default MyApp;


