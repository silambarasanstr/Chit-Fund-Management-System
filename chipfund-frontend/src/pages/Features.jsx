const features = [
  {
    title: "Member Management",
    icon: "👥",
    description:
      "Add, edit, search, and manage all chit fund members efficiently.",
  },
  {
    title: "Chit Group Management",
    icon: "📂",
    description:
      "Create chit groups, configure duration, installment amount, and group details.",
  },
  {
    title: "Group Member Management",
    icon: "👨‍👩‍👧",
    description:
      "Assign members to chit groups and manage their participation.",
  },
  {
    title: "Installment Management",
    icon: "💰",
    description:
      "Track monthly installments, pending payments, and payment status.",
  },
  {
    title: "Payment Management",
    icon: "💳",
    description:
      "Record payments, maintain history, and monitor outstanding dues.",
  },
  {
    title: "Auction Management",
    icon: "🏆",
    description:
      "Conduct chit auctions, record winners, and manage auction details.",
  },
  {
    title: "Reports & Analytics",
    icon: "📊",
    description:
      "Generate reports for members, groups, installments, and payments.",
  },
  {
    title: "Secure Authentication",
    icon: "🔐",
    description:
      "Role-based authentication with secure admin login and protected routes.",
  },
];

const Features = () => {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="text-white bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container px-5 py-20 mx-auto text-center">
          <h1 className="text-4xl font-bold">
            System Features
          </h1>

          <p className="max-w-3xl mx-auto mt-5 text-lg text-blue-100">
            Everything you need to manage your chit fund operations from one
            powerful dashboard.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container px-5 py-16 mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 transition bg-white border shadow-sm rounded-xl hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-white border-t">
        <div className="container px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Why Choose Our System?
          </h2>

          <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 text-center bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-600">
                Secure
              </h3>
              <p className="mt-2 text-gray-600">
                Protected admin access with authentication.
              </p>
            </div>

            <div className="p-6 text-center bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-600">
                Easy to Use
              </h3>
              <p className="mt-2 text-gray-600">
                Clean interface designed for fast daily operations.
              </p>
            </div>

            <div className="p-6 text-center bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-600">
                Fast Management
              </h3>
              <p className="mt-2 text-gray-600">
                Manage members, payments, and auctions with ease.
              </p>
            </div>

            <div className="p-6 text-center bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-600">
                Accurate Reports
              </h3>
              <p className="mt-2 text-gray-600">
                Generate reports to monitor collections and performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Features;
