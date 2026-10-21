import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="text-white bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container px-4 py-10 mx-auto text-center sm:py-12">
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Chit Fund Management System
          </h1>

          <p className="max-w-2xl mx-auto mt-3 text-sm leading-6 text-blue-100 sm:text-base">
            A secure and easy-to-use platform for managing chit fund groups,
            members, monthly installments, auctions, payments, and reports from
            one centralized dashboard.
          </p>

          <div className="mt-5">
            <Link
              to="/admin"
              className="inline-block px-4 py-2 text-sm font-semibold text-blue-700 bg-white rounded-md hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-gray-100 sm:py-10">
        <div className="container px-4 mx-auto">
          <h2 className="mb-5 text-xl font-bold text-center text-gray-800 sm:text-2xl">
            Key Features
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Member Management",
              "Chit Group Management",
              "Installment Collection",
              "Auction Management",
              "Payment Tracking",
              "Reports & Analytics",
            ].map((feature) => (
              <div
                key={feature}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md"
              >
                <h3 className="mb-1 text-base font-semibold text-blue-600">
                  {feature}
                </h3>

                <p className="text-sm leading-5 text-gray-600">
                  Efficiently manage {feature.toLowerCase()} with an intuitive
                  and user-friendly interface.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 py-8 mx-auto sm:py-10">
        <h2 className="mb-6 text-xl font-bold text-center text-gray-800 sm:text-2xl">
          How It Works
        </h2>

        <div className="grid grid-cols-2 gap-5 text-center sm:grid-cols-3 md:grid-cols-5">
          {[
            "Create Group",
            "Add Members",
            "Collect Installments",
            "Conduct Auctions",
            "Payment Processing",
          ].map((step, index) => (
            <div key={step}>
              <div className="flex items-center justify-center w-10 h-10 mx-auto text-lg font-bold text-white bg-blue-600 rounded-full">
                {index + 1}
              </div>

              <h3 className="mt-2 text-sm font-semibold text-gray-700">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
