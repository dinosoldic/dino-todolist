import "../styles/Modal.css";

interface ModalOptions {
  size?: "sm" | "md" | "lg" | "xl";
  width?: string;
  height?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export default function createModal(options: ModalOptions) {
  const { width, height, size, onOpen, onClose } = options;

  let isOpen: boolean = false;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";

  if (size) {
    modal.style.width = getModalSize(size).modalW;
    modal.style.height = getModalSize(size).modalH;
  }

  if (width) {
    modal.style.width = width;
  }

  if (height) {
    modal.style.height = height;
  }

  overlay.appendChild(modal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) close();
  });

  // funcs
  function appendChild(child: HTMLElement) {
    modal.appendChild(child);
  }

  function clear() {
    modal.innerHTML = "";
  }

  function open() {
    if (!isOpen) {
      document.body.appendChild(overlay);
      isOpen = true;
      onOpen?.();
    }
  }

  function close() {
    if (isOpen) {
      document.body.removeChild(overlay);
      isOpen = false;
      clear();
      onClose?.();
    }
  }

  function getModalSize(size: string) {
    let modalW = "";
    let modalH = "";

    switch (size) {
      case "sm":
        modalW = "300px";
        modalH = "200px";
        break;
      case "md":
        modalW = "500px";
        modalH = "300px";
        break;
      case "lg":
        modalW = "800px";
        modalH = "500px";
        break;
      case "xl":
        modalW = "1000px";
        modalH = "700px";
        break;
    }

    return { modalW, modalH };
  }

  return {
    open,
    close,
    appendChild,
    get isOpen() {
      return isOpen;
    },
  };
}
