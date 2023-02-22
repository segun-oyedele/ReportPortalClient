import Swal from 'sweetalert2';

export const alertPopup = (title = '', icon = 'success', timer = 1750, showConfirmButton = false, position = 'center') => {
  Swal.fire({
    position,
    icon,
    title,
    showConfirmButton,
    timer,
    confirmButtonText: 'Accept',
  })
}