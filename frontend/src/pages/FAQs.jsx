import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
    FaChevronDown,
    FaChevronUp,
    FaQuestionCircle,
    FaEnvelope,
    FaPhoneAlt,
} from "react-icons/fa";

function FAQItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
            >
                <span className="font-semibold text-gray-800">{question}</span>

                {isOpen ? (
                    <FaChevronUp className="text-[#8B5CF6]" />
                ) : (
                    <FaChevronDown className="text-gray-500" />
                )}
            </button>

            <div
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 px-5 pb-5" : "max-h-0"
                    }`}
            >
                <p className="text-gray-600 leading-7">{answer}</p>
            </div>
        </div>
    );
}

function FAQSection({ title, items, openItem, setOpenItem }) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

            <div className="space-y-4">
                {items.map((faq, index) => {
                    const key = `${title}-${index}`;

                    return (
                        <FAQItem
                            key={key}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openItem === key}
                            onClick={() =>
                                setOpenItem(openItem === key ? null : key)
                            }
                        />
                    );
                })}
            </div>
        </section>
    );
}

function FAQs() {
    const [openItem, setOpenItem] = useState(null);

    const accountFaqs = [
        {
            question: "How do I create an account?",
            answer:
                "Click on Sign Up, enter your details, verify your mobile number using the OTP sent to you, and your account will be created successfully.",
        },
        {
            question: "I didn't receive my OTP. What should I do?",
            answer:
                "Wait until the resend timer completes and click 'Resend OTP'. Ensure that the mobile number entered is correct and has network coverage.",
        },
        {
            question: "How do I reset my password?",
            answer:
                "Use the Forgot Password option on the login page. Verify your account using OTP and then create a new password.",
        },
        {
            question: "Can I change my profile information later?",
            answer:
                "Yes. You can update your personal information from your profile page at any time after logging in.",
        },
    ];

    const propertyFaqs = [
        {
            question: "How can I list my property?",
            answer:
                "After logging in, navigate to your dashboard and choose 'Add Property'. Fill in all required details, upload images, and submit the property for admin approval.",
        },
        {
            question: "Why is my property not visible?",
            answer:
                "Every newly submitted property must be approved by the admin before it becomes visible to other users.",
        },
        {
            question: "Can I edit my property after posting?",
            answer:
                "Yes. Owners can edit property details, pricing, images, and other information from the 'My Properties' section.",
        },
        {
            question: "Can I delete my property?",
            answer:
                "Yes. You can remove your property listing anytime from your dashboard.",
        },
    ];

    const pgFaqs = [
        {
            question: "How do I add a PG listing?",
            answer:
                "Go to your dashboard, click 'Add PG', enter all required information including rent, amenities, images, and submit it for admin approval.",
        },
        {
            question: "Can I update PG details later?",
            answer:
                "Yes. You can edit rent, amenities, images, sharing type, food availability, and other details whenever required.",
        },
        {
            question: "Why is my PG still pending?",
            answer:
                "All PG listings go through an approval process to ensure quality and authenticity before becoming public.",
        },
        {
            question: "Can I upload multiple images?",
            answer:
                "Yes. Multiple high-quality images can be uploaded to provide better visibility for your listing.",
        },
    ];
    const subscriptionFaqs = [
        {
            question: "What subscription plans are available?",
            answer:
                "The platform offers Free, Premium, and Elite plans. Higher plans allow you to list more properties or PGs and unlock additional features.",
        },
        {
            question: "How do I upgrade my subscription?",
            answer:
                "Go to your dashboard, open the Subscription section, choose your preferred plan, and complete the payment securely using Razorpay.",
        },
        {
            question: "When does my subscription become active?",
            answer:
                "Your subscription is activated automatically once the payment is successfully verified.",
        },
        {
            question: "Can I downgrade or cancel my subscription?",
            answer:
                "Yes. Once your current subscription expires, you can choose a different plan according to your requirements.",
        },
    ];

    const wishlistFaqs = [
        {
            question: "How do I save a property or PG?",
            answer:
                "Click the heart icon on any property or PG card to add it to your wishlist for quick access later.",
        },
        {
            question: "Where can I view my wishlist?",
            answer:
                "Your saved properties and PGs are available in the Wishlist section after logging in.",
        },
        {
            question: "Can I remove items from my wishlist?",
            answer:
                "Yes. Simply click the heart icon again to remove the listing from your wishlist.",
        },
        {
            question: "Can I review a property or PG?",
            answer:
                "Yes. After viewing a listing, you can leave a rating and write a review to share your experience.",
        },
        {
            question: "Can I edit or delete my review?",
            answer:
                "Yes. You can update or remove your own reviews whenever required.",
        },
        {
            question: "Can owners reply to reviews?",
            answer:
                "Yes. Property and PG owners can respond to user reviews to address questions or feedback.",
        },
    ];

    const generalFaqs = [
        {
            question: "Is my personal information secure?",
            answer:
                "Yes. Your account information is protected using secure authentication and encrypted communication wherever applicable.",
        },
        {
            question: "Do I need an account to browse listings?",
            answer:
                "Yes. Some features may be visible publicly, but signing in allows you to save listings, leave reviews, manage properties, and access your dashboard.",
        },
        {
            question: "How can I contact support?",
            answer:
                "You can use the Contact Us page or reach us directly through the email and phone details provided below.",
        },
        {
            question: "Can I report an incorrect listing?",
            answer:
                "Yes. If you notice inaccurate or misleading information, please contact our support team so that we can review the listing.",
        },
        {
            question: "Which devices are supported?",
            answer:
                "The platform is fully responsive and works smoothly on desktops, laptops, tablets, and mobile devices.",
        },
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white py-16">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <FaQuestionCircle className="mx-auto text-5xl mb-5" />

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Help Center
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg text-purple-100">
                            Find answers to the most commonly asked questions about
                            accounts, properties, PG listings, subscriptions,
                            payments, reviews, and more.
                        </p>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-6 py-14">
                    <FAQSection
                        title="Account & Login"
                        items={accountFaqs}
                        openItem={openItem}
                        setOpenItem={setOpenItem}
                    />

                    <FAQSection
                        title="Properties"
                        items={propertyFaqs}
                        openItem={openItem}
                        setOpenItem={setOpenItem}
                    />

                    <FAQSection
                        title="PGs"
                        items={pgFaqs}
                        openItem={openItem}
                        setOpenItem={setOpenItem}
                    />

                    <FAQSection
                        title="Subscription"
                        items={subscriptionFaqs}
                        openItem={openItem}
                        setOpenItem={setOpenItem}
                    />

                    <FAQSection
                        title="Wishlist & Reviews"
                        items={wishlistFaqs}
                        openItem={openItem}
                        setOpenItem={setOpenItem}
                    />

                    <FAQSection
                        title="General"
                        items={generalFaqs}
                        openItem={openItem}
                        setOpenItem={setOpenItem}
                    />
                    {/* Still Need Help */}
                    <section className="mt-16">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10 text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Still Need Help?
                            </h2>

                            <p className="text-gray-600 max-w-2xl mx-auto leading-7">
                                Couldn't find the answer you were looking for? Our support team
                                is always happy to assist you. Feel free to reach out through
                                email or phone, and we'll get back to you as soon as possible.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mt-10">
                                <a
                                    href="mailto:support@propertyplatform.com"
                                    className="flex items-center justify-center gap-4 bg-purple-50 border border-purple-200 rounded-xl p-5 hover:bg-purple-100 transition"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center">
                                        <FaEnvelope />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-sm text-gray-500">Email Support</p>
                                        <p className="font-semibold text-gray-800">
                                            support@propertyplatform.com
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+919876543210"
                                    className="flex items-center justify-center gap-4 bg-purple-50 border border-purple-200 rounded-xl p-5 hover:bg-purple-100 transition"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center">
                                        <FaPhoneAlt />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-sm text-gray-500">Call Us</p>
                                        <p className="font-semibold text-gray-800">
                                            +91 98765 43210
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default FAQs;