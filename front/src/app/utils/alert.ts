import Swal from 'sweetalert2';

const swalSuccess = (text: string, heading?: string) => {
    return Swal.fire({
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1500
    })
};

const swalError = (text: string, heading?: string) => {
    return Swal.fire(
        heading ?? 'Error!',
        text,
        'error'
    );
}

const swalInfo = (text: string, heading?: string) => {
    return Swal.fire(
        heading ?? 'Info!',
        text,
        'info'
    );
};

const swalInfoText = (text: string, apartmentNumbersWithOwner?: string) => {
    return Swal.fire({
      title:'Məlumat!',
      html: `<b>${text}</b> </br> ${apartmentNumbersWithOwner}`,
      icon: 'warning'
    });
  };
  
const swalInfoNotConfirm = (text: string, heading?: string) => {
    return Swal.fire({
        icon: 'info',
        title: text,
        showConfirmButton: false,
        timer: 1500
      })
};

export {
    swalSuccess, swalInfo, swalError, swalInfoNotConfirm,swalInfoText
}