import React from "react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="footer bg-neutral text-neutral-content items-center p-4 "
    >
      <aside className="grid-flow-col items-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
      <p className="justify-center text-l from-neutral-100 font-bold ">
        Developed by Alice Moradiya
      </p>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://alicemoradiya.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25L21 12l-4.5 3.75M7.5 8.25L3 12l4.5 3.75M14.25 4.5l-4.5 15"
            />
          </svg>
        </a>
        <a
          href="https://github.com/alice-moradiya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 .297C5.373.297 0 5.67 0 12.296c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577v-2.234c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.806 1.304 3.492.997.108-.776.42-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 013.003-.403c1.02.005 2.045.137 3.003.403 2.291-1.553 3.297-1.23 3.297-1.23.653 1.649.242 2.871.118 3.176.769.84 1.233 1.91 1.233 3.221 0 4.61-2.807 5.624-5.479 5.92.431.372.815 1.102.815 2.222v3.293c0 .32.216.694.825.577C20.565 22.093 24 17.594 24 12.296 24 5.67 18.627.297 12 .297z" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/alice-moradiya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.064-1.875-3.064-1.875 0-2.165 1.462-2.165 2.971v5.697h-3v-10h2.873v1.367h.041c.4-.758 1.375-1.558 2.832-1.558 3.025 0 3.583 1.991 3.583 4.582v5.609z" />
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
