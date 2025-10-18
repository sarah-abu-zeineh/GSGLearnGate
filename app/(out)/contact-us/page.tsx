import Footer from "@/components/Footer/Footer";
import ContactUsForm from "@/components/Forms/ContactUsForm/ContactUsForm";
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  return (
    <div>
      {/* Toast Notifications Container */}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <HeaderNav position="relative" />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h3>
            <p className="text-lg md:text-xl text-gray-600">
              Any questions or remarks? Just write us a message!
            </p>
          </div>
          
          <div className="mt-10">
            <ContactUsForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;