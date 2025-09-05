import Ethereum from "@/public/ethereum.png"; // Ethereum logo
import Rupee from "@/public/money-transfer.png"; // for Low Fees
import Affordable from "@/public/credit-card.png"; // for Secure & Transparent
import Image from "next/image";

const Featuresection = () => {
  const features = [
    {
      icon: Ethereum,
      title: "Pay with Ethereum",
      description:
        "Accept seamless payments directly in Ethereum, enabling fast and borderless transactions.",
    },
    {
      icon: Rupee,
      title: "Zero Transaction Fees",
      description:
        "Zero costs with Ethereum payments by avoiding traditional banking fees and intermediaries.",
    },
    {
      icon: Affordable,
      title: "Secure & Transparent",
      description:
        "All payments are secured on the blockchain, ensuring transparency and safety for every ride.",
    },
  ];

  return (
    <section className="bg-white py-16 min-h-dvh flex flex-col justify-center items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mt-2 text-3xl font-bold text-gray-800 sm:text-4xl">
            Fast, Secure, and Global Ethereum Payments
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
            Experience faster, cheaper, and more secure payments with our
            Ethereum-based payment gateway.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-3 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg  mb-4">
                <Image src={feature.icon} alt={feature.title} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featuresection;
