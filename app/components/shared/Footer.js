import Link from "next/link";
export default function Footer() {
  return (
    <footer className="pt-16 pb-12 border-t-light-default_dark-tertiary">
      <div className="container grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 mr-2 space-y-8">
          <Link href="/">
            <h1 className="inline-block text-transparent h6-md-h5-lg-h3-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 bg-clip-text">
              Sokher Corner
            </h1>
          </Link>
          <div className="mr-2">
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              hic?
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="footer-social-link">
              <i className="text-2xl fa-brands fa-facebook-square"></i>
            </Link>
            <Link href="#" className="footer-social-link">
              <i className="text-2xl fa-brands fa-instagram-square"></i>
            </Link>
            <Link href="#" className="footer-social-link">
              <i className="text-2xl fa-brands fa-twitter-square"></i>
            </Link>
            <Link href="#" className="footer-social-link">
              <i className="text-2xl fa-brands fa-github-square"></i>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 col-span-2 gap-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="footer-title">Solutions</h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="footer-link">
                  Marketing
                </Link>
                <Link href="#" className="footer-link">
                  Analitycs
                </Link>
                <Link href="#" className="footer-link">
                  Commerce
                </Link>
                <Link href="#" className="footer-link">
                  Insights
                </Link>
              </div>
            </div>

            <div>
              <h3 className="footer-title">Support</h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="footer-link">
                  Pricing
                </Link>
                <Link href="#" className="footer-link">
                  Documentation
                </Link>
                <Link href="#" className="footer-link">
                  Guides
                </Link>
                <Link href="#" className="footer-link">
                  API Status
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="footer-title">Solutions</h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="footer-link">
                  Marketing
                </Link>
                <Link href="#" className="footer-link">
                  Analitycs
                </Link>
                <Link href="#" className="footer-link">
                  Commerce
                </Link>
                <Link href="#" className="footer-link">
                  Insights
                </Link>
              </div>
            </div>

            <div>
              <h3 className="footer-title">Support</h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="footer-link">
                  Pricing
                </Link>
                <Link href="#" className="footer-link">
                  Documentation
                </Link>
                <Link href="#" className="footer-link">
                  Guides
                </Link>
                <Link href="#" className="footer-link">
                  API Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
