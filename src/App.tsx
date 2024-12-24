import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useDialog } from "@react-aria/dialog";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";

function LiveRegion({ message }) {
  return (
    <VisuallyHidden aria-live="polite" aria-atomic="true">
      {message}
    </VisuallyHidden>
  );
}

function Modal({ isOpen, onClose, setAnnouncement }) {
  const ref = useRef();
  const { dialogProps } = useDialog({}, ref);
  const { modalProps } = useModal();
  const { overlayProps } = useOverlay(
    { isOpen, onClose, isDismissable: true },
    ref
  );

  usePreventScroll();

  if (!isOpen) return null;

  setAnnouncement("Modal is opened. Press Escape to close.");

  return (
    <FocusScope contain restoreFocus autoFocus>
      <div
        {...overlayProps}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "16px",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Heading size="md" id="modal-heading" mb={4}>
            Accessible Modal
          </Heading>
          <p>This modal is screen reader-friendly and accessible.</p>
          <Button mt={4} onClick={() => { onClose(); setAnnouncement("Modal is closed."); }}>
            Close
          </Button>
        </div>
      </div>
    </FocusScope>
  );
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const inputRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  useHotkeys("ctrl+shift+t", () => {
    toggleColorMode();
    setAnnouncement(`Switched to ${colorMode === "light" ? "dark" : "light"} mode.`);
  });

  useHotkeys("ctrl+shift+f", () => {
    inputRef.current.focus();
    setAnnouncement("Input field focused.");
  });

  useHotkeys("ctrl+shift+m", onOpenModal);

  useHotkeys("escape", () => {
    if (isModalOpen) {
      onCloseModal();
      setAnnouncement("Modal is closed.");
    } else if (document.activeElement === inputRef.current) {
      inputRef.current.blur();
      setAnnouncement("Input field unfocused.");
    }
  });

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <LiveRegion message={announcement} />
      <Heading mb={4}>Accessible App with Screen Reader Support</Heading>
      <Button mb={4} onClick={() => {
        toggleColorMode();
        setAnnouncement(`Switched to ${colorMode === "light" ? "dark" : "light"} mode.`);
      }}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode (Shortcut: Ctrl+Shift+T)
      </Button>
      <Input
        ref={inputRef}
        placeholder="Focus me with Ctrl+Shift+F"
        aria-label="Input field for shortcuts"
        mb={4}
      />
      <Button onClick={onOpenModal}>Open Modal (Shortcut: Ctrl+Shift+M)</Button>

      <Modal isOpen={isModalOpen} onClose={onCloseModal} setAnnouncement={setAnnouncement} />
    </Box>
  );
}

export default App;