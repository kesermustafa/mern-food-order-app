'use client';

import Swal from 'sweetalert2';

const CustomConfirm = async ({
                                 title = 'Emin misiniz?',
                                 text = 'Devam etmek istediğinize emin misiniz?',
                                 icon = 'warning', // 'warning', 'info', 'success', 'error', 'question'
                                 confirmButtonText = 'Evet',
                                 cancelButtonText = 'İptal',
                                 cancelButtonColor = '#d33',
                                 confirmButtonColor = '#3085d6',
                             }) => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor,
        cancelButtonText,
        confirmButtonText,
    });

    return result.isConfirmed;
};

export default CustomConfirm;
