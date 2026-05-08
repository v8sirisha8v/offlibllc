export default function Notification({ message, onDismiss }) {
    // If there's no message, don't render anything
    if (!message) {
        return null;
    }

    return (
        <div className="alert alert-secondary alert-dismissible fade show" role="alert">

            {message}
            
            {/* A dismiss button */}
            <button 
                type="button" 
                className="btn-close" 
                aria-label="Close"
                onClick={onDismiss} // Call the parent's dismiss function on click
            >
            </button>
        </div>
    );
}
