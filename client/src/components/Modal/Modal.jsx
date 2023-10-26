import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className='z-50 w-96 bg-white p-6 rounded-lg shadow-lg'>{children}</div>
    </div>,
    document.body,
  );
}

export default Modal;
