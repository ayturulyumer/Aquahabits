import Button from "../Button/Button.jsx";

export default function ConfirmationModal({ isOpen, onConfirm, onCancel, message }) {
    if (!isOpen) return null;

    return (
        <div onClick={onCancel} className="fixed inset-0  bg-black  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="max-w-72 md:max-w-md mx-4 p-4 bg-base-300 rounded-box">
                {/* <h3 className="text-xl font-semibold text-center mb-4">Are you sure?</h3> */}
                <p className="text-center mb-6">{message}</p>
                <div className="flex justify-around ">
                    <Button
                        onClick={onCancel}
                        type="button"
                        className="btn btn-error text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        type="button"
                        className="btn btn-primary"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

