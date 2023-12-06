import { useState } from "react";

export default function PopupWindow({ isOpen, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div>
            {children}
        </div>

    )
}