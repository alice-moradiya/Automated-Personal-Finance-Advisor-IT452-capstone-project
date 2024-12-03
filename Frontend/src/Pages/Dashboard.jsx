import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  //  change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 4 ? 1 : prev + 1));
    }, 3000); //
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const navigateToSlide = (slideNumber) => {
    setCurrentSlide(slideNumber);
    const targetSlide = document.querySelector(`#slide${slideNumber}`);
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Carousel */}
      <div id="carousel" className="carousel w-full h-80">
        {/* Slide 1 */}
        <div
          id="slide1"
          className={`carousel-item relative w-full ${
            currentSlide === 1 ? "block" : "hidden"
          }`}
        >
          <img src="/photo1.png" className="w-full" alt="Slide 1" />
        </div>

        {/* Slide 2 */}
        <div
          id="slide2"
          className={`carousel-item relative w-full ${
            currentSlide === 2 ? "block" : "hidden"
          }`}
        >
          <img src="/photo2.jpg" className="w-full" alt="Slide 2" />
        </div>

        {/* Slide 3 */}
        <div
          id="slide3"
          className={`carousel-item relative w-full ${
            currentSlide === 3 ? "block" : "hidden"
          }`}
        >
          <img src="/photo3.jpg" className="w-full" alt="Slide 3" />
        </div>

        {/* Slide 4 */}
        <div
          id="slide4"
          className={`carousel-item relative w-full ${
            currentSlide === 4 ? "block" : "hidden"
          }`}
        >
          <img src="/photo4.jpg" className="w-full" alt="Slide 4" />
        </div>
      </div>

      {/* Timeline */}
      <div id="timeline" className="container mx-auto mt-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          How It <span className="text-blue-700">Works</span>
        </h2>
        <ul className="timeline justify-center ">
          <li className="flex flex-col sm:flex-row items-center">
            <div className="timeline-start timeline-box text-center sm:text-left w-full sm:w-full">
              Start
            </div>
            <div className="timeline-middle flex justify-center items-center w-full sm:w-1/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Goals</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start timeline-box">Advice</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-end timeline-box">Pdf</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
        </ul>
      </div>

      {/* Get Started Button */}
      <div className="text-center mt-12">
        <Link
          to="/goals"
          className="btn bg-blue-700 text-white hover:bg-blue-500 hover:text-blue-50 hover:scale-105 active:scale-95 transition-all duration-300 mb-14"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
