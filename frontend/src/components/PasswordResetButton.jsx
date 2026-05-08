export default function PasswordResetButton({handleClick}) {
    return (<>
        <button
            type="button"
            className="btn btn-outline-danger px-4 py-2 mt-2"
            onClick={handleClick}
        >
            Reset Password
        </button>
    </>);

}


