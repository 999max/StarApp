import "./error-notifier.css";


const ErrorNotifier = () => {
  return (
    <div className="error-indicator">
      <span className="boom">Error</span>
      <span>An error occurred while loading data</span>
    </div>
  )

}

export default ErrorNotifier;