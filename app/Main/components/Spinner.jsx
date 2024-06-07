// components/Spinner.js
const Spinner = () => (
    <div className="spinner">
      <style jsx>{`
        .spinner {
          border: 2px solid rgba(0, 0, 0, 0.1);
          width: 24px;  /* Adjust size if needed */
          height: 24px;  /* Adjust size if needed */
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 0.5s linear infinite;  /* Increased speed */
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
  
  export default Spinner;
  