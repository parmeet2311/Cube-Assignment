import React, { useRef } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  useDisclosure,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Keyboard Shortcuts
  useHotkeys("ctrl+shift+t", toggleColorMode, {
    enableOnTags: ["INPUT", "TEXTAREA"],
  }); // Toggle Theme
  useHotkeys("ctrl+shift+f", () => inputRef.current.focus(), {
    enableOnTags: ["INPUT", "TEXTAREA"],
  }); // Focus Input
  useHotkeys("ctrl+shift+m", onOpen, {
    enableOnTags: ["INPUT", "TEXTAREA"],
  }); // Open Modal

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <Heading mb={4}>Accessible App with Shortcuts</Heading>
      <Button mb={4} onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode (Shortcut: Ctrl+Shift+T)
      </Button>
      <Input
        ref={inputRef}
        placeholder="Focus me with Ctrl+Shift+F"
        aria-label="Input field for shortcuts"
        mb={4}
      />
      <Button onClick={onOpen}>Open Modal (Shortcut: Ctrl+Shift+M)</Button>

      {/* Accessible Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accessible Modal</ModalHeader>
          <ModalBody>
            This modal is opened using the keyboard shortcut Ctrl+Shift+M.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;