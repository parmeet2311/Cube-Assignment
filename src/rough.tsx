import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Customer } from "./type/customer";
import { BiArrowBack } from "react-icons/bi";
import { customers } from "./data";

// Helper function to generate placeholder image URLs
const generatePlaceholderImages = (count: number) => {
  return Array.from({ length: count }, (_, index) => `https://picsum.photos/200?random=${index}`);
};

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(customers.length > 0 ? customers[0] : null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photos, setPhotos] = useState<string[]>(generatePlaceholderImages(9));

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const customersPerPage = 10;
  const offset = currentPage * customersPerPage;
  const currentCustomers = customers.slice(offset, offset + customersPerPage);
  const pageCount = Math.ceil(customers.length / customersPerPage);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    if (window.innerWidth < 768) {
      setIsModalOpen(true);
    }
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Function to update photos every 10 seconds
  const updatePhotos = () => {
    setPhotos(generatePlaceholderImages(9));
  };

  useEffect(() => {
    const intervalId = setInterval(updatePhotos, 5000); // Update photos every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <section className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="header w-full">
        <div className="container">
          <h1 className="w-full text-xl font-semibold text-center">Customer Portal</h1>
        </div>
      </header>

      {/* Content Section */}
      <div className="container flex flex-grow w-full overflow-hidden">
        {/* Customer List Section */}
        <div className="w-full md:w-[35%] bg-white overflow-y-auto">
          {currentCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`p-4 cursor-pointer border-b border-l ${
                selectedCustomer?.id === customer.id
                  ? "md:bg-gray-200"
                  : "bg-white"
              }`}
              onClick={() => handleSelectCustomer(customer)}
            >
              <h2 className="text-lg font-SF-Pro-Semibold">{customer.name}</h2>
              <p className="text-sm font-SF-Pro-Regular">{customer.title}</p>
            </div>
          ))}
          <div className="p-4">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center mt-4"}
              pageClassName={"mx-1 px-3 py-1 border border-gray-300 rounded"}
              previousClassName={"mx-1 px-3 py-1 border border-gray-300 rounded"}
              nextClassName={"mx-1 px-3 py-1 border border-gray-300 rounded"}
              breakClassName={"mx-1 px-3 py-1 border border-gray-300 rounded"}
              activeClassName={"bg-blue-200"}
            />
          </div>
        </div>

        {/* Customer Details Section */}
        <div className="hidden md:block w-[65%] p-8 overflow-y-auto bg-white">
          {selectedCustomer ? (
            <div className="text-center">
              <div className="text-2xl font-SF-Pro-Medium">
                {selectedCustomer.name},{" "}
                <span className="text-base font-SF-Pro-Medium text-gray-400">
                  {selectedCustomer.title}
                </span>
              </div>
              <p className="text-gray-500 font-SF-Pro-Regular mb-4">
                {selectedCustomer.address}
              </p>
              <div className="mt-[1.5rem] font-SF-Pro-Regular text-gray-500">
                {selectedCustomer.description}
              </div>
              <div className="grid grid-cols-3 gap-[1rem] mt-[2rem]">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden hover:scale-[1.025] transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={photo}
                      alt={`Customer ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Select a customer to see details</p>
          )}
        </div>
      </div>
      {/* Modal for Small Screens */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed md:hidden inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full p-8 overflow-y-auto">
            <button
              className="absolute top-4 left-4 text-2xl"
              onClick={closeModal}
            >
              <BiArrowBack />
            </button>
            <div className="text-center">
              <div className="text-2xl font-SF-Pro-Medium">
                {selectedCustomer.name},{" "}
                <span className="text-base font-SF-Pro-Medium text-gray-400">
                  {selectedCustomer.title}
                </span>
              </div>
              <p className="text-gray-500 font-SF-Pro-Regular mb-4">
                {selectedCustomer.address}
              </p>
              <div className="mt-[1.5rem] font-SF-Pro-Regular text-gray-500">
                {selectedCustomer.description}
              </div>
              <div className="grid grid-cols-3 gap-[1rem] mt-[2rem]">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden hover:scale-[1.025] transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={photo}
                      alt={`Customer ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default App;
