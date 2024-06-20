import React from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
      <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <form method="dialog">
            <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
  );
};

export default Modal;
