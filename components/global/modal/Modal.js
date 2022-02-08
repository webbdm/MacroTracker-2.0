import React from "react";
import ReactDOM from "react-dom";
import ClientOnlyPortal from "./ClientOnlyPortal";


const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    backdropFilter: "blur(3px)"
}

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return <ClientOnlyPortal selector="#__next">
        <div className="modal">
            <div style={OVERLAY_STYLES}></div>
            {children}
        </div>
    </ClientOnlyPortal>
    // return ReactDOM.createPortal(
    //     <div className="modal">
    //         <div style={OVERLAY_STYLES}></div>
    //         {children}
    //     </div>
    //     , document.getElementById("modal-root"));
}

export default Modal;