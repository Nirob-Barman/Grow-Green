import Swal from 'sweetalert2';

const useSweetAlert = () => {

    const showUserCreatedSuccessAlert = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User created successfully.',
            showConfirmButton: false,
            timer: 5000,
        });
    };

    const showLoginSuccessAlert = () => {
        Swal.fire({
            title: 'User Login Successful.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
        });
    };


    const showLoginConfirmationAlert = (onConfirm, onCancel) => {
        Swal.fire({
            icon: 'question',
            title: 'Please log in to make a purchase',
            showCancelButton: true,
            confirmButtonText: 'Go to Login',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // If the user confirms, execute the onConfirm function
                onConfirm();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // If the user clicks on "Cancel", execute the onCancel function
                onCancel();
            }
        });
    };
    

    

    const showSuccessMessage = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product added successfully.',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const showErrorMessage = () => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add product. Please try again later.',
        });
    };

    const showDeleteSuccessMessage = () => {
        Swal.fire({
            icon: 'success',
            title: 'Product Deleted',
            text: 'The product has been successfully deleted.',
        });
    };

    const showProductAlreadySelectedAlert = () => {
        Swal.fire({
            icon: 'info',
            title: 'Product Already Selected',
            text: 'You have already selected this Product.',
        });
    };

    const showProductSelectedAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Product Selected!',
            text: 'You have successfully selected the product.',
        });
    };

    return {
        showUserCreatedSuccessAlert,
        showLoginSuccessAlert,
        showLoginConfirmationAlert,
        showSuccessMessage,
        showErrorMessage,
        showDeleteSuccessMessage,
        showProductAlreadySelectedAlert,
        showProductSelectedAlert
    };
};

export default useSweetAlert;