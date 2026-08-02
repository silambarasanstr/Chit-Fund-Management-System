import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="text-white bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container px-5 py-24 mx-auto text-center">
          <h1 className="text-5xl font-bold">
            Chit Fund Management System
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-blue-100">
            A secure and easy-to-use platform for managing chit fund groups,
            members, monthly installments, auctions, payments, and reports from
            one centralized dashboard.
          </p>

          <div className="mt-10 space-x-4">
            <Link
              to="/admin"
              className="px-6 py-3 font-semibold text-blue-700 bg-white rounded-lg hover:bg-gray-100"
            >
              Get Started
            </Link>

            <Link
              to="/admin"
              className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-blue-700"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container px-5 py-16 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            About the Project
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            The Chit Fund Management System helps administrators manage chit
            groups efficiently. It simplifies member registration, installment
            collection, auctions, payment tracking, and report generation,
            reducing paperwork and improving transparency.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="container px-5 mx-auto">
          <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">
            Key Features
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg"
              >
                <h3 className="mb-2 text-xl font-semibold text-blue-600">
                  {feature}
                </h3>

                <p className="text-gray-600">
                  Efficiently manage {feature.toLowerCase()} with an intuitive
                  and user-friendly interface.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-5 py-16 mx-auto">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">
          How It Works
        </h2>

        <div className="grid gap-8 text-center md:grid-cols-5">
          {[
            "Create Group",
            "Add Members",
            "Collect Installments",
            "Conduct Auctions",
            "Generate Reports",
          ].map((step, index) => (
            <div key={step}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold text-white bg-blue-600 rounded-full">
                {index + 1}
              </div>

              <h3 className="mt-4 font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 text-white bg-blue-700">
        <div className="container grid gap-8 px-5 mx-auto text-center md:grid-cols-4">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p>Members</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">25+</h3>
            <p>Chit Groups</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">₹50L+</h3>
            <p>Monthly Transactions</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">100%</h3>
            <p>Secure Management</p>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;