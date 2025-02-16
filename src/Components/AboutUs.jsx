import React from "react";
import svgFile from "./../assets/connected-world-animate.svg";

const About = () => {
  return (
    <section className="overflow-hidden bg-white dark:bg-gray-900">
      <div className="container p-4 md:p-8">
        <div className="flex flex-wrap items-center justify-around gap-y-8 rounded-xl p-6 md:p-12">
          {/* Left Section: Image */}
          <div className="w-full md:w-[50%]">
            <div className="flex justify-center md:justify-start">
              <img
                src={svgFile}
                alt="SVG Illustration"
                className="w-[80%] md:w-[65%]  rounded-xl"
              />
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="w-full md:w-[50%]">
            <div className="text-center md:text-left">
              <span className="block mb-4 text-xl md:text-2xl font-semibold text-blue-700">
                Why Choose Us
              </span>
              <h2 className="mb-5 text-2xl font-semibold text-dark dark:text-white sm:text-3xl lg:text-4xl">
                Your Trusted Partner for Loans and Credit Solutions
              </h2>
              <p className="mb-5 text-sm text-gray-700 dark:text-gray-400 sm:text-base">
                At <strong>LoanKarade</strong>, we offer{" "}
                <strong>personalized Credit Advisory</strong> services to help
                you boost your credit score effortlessly. With our expert
                assistance, unlock access to exclusive loan and credit card
                offers that suit your financial goals.
              </p>
              <p className="mb-8 text-sm text-gray-700 dark:text-gray-400 sm:text-base">
                Our <strong>expert advisors</strong> guide you in selecting the
                most competitive deals on{" "}
                <strong>
                  Personal Loans, Home Loans, Business Loans, Car Loans, and
                  Credit Cards
                </strong>
                . Let us help you make confident financial decisions and secure
                the best interest rates tailored to your needs.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
