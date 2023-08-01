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




    const showDeleteWarning = (onDeleteConfirmed) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You are about to delete this user. This action cannot be undone.',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteConfirmed();
            }
        });
    };

    const showDeletionSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'User Deleted',
            text: 'The user has been successfully deleted.',
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

    const showUpdateUserSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            text: 'Your account information has been updated.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    };

    const showUpdateUserErrorAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'There was an error updating your account information. Please try again later.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    };

    return {
        showUserCreatedSuccessAlert,
        showLoginSuccessAlert,
        showLoginConfirmationAlert,
        showDeleteWarning,
        showDeletionSuccessAlert,
        showSuccessMessage,
        showErrorMessage,
        showDeleteSuccessMessage,
        showProductAlreadySelectedAlert,
        showProductSelectedAlert,
        showUpdateUserSuccessAlert,
        showUpdateUserErrorAlert
    };
};

export default useSweetAlert;