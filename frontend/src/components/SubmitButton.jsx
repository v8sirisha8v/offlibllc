export default function SubmitButton({text}){
    return (<div className="d-grid mt-4">
        <button type="submit" className="btn btn-primary btn-lg fw-semibold rounded-3 py-2">
            {text}
        </button>
    </div>);
}