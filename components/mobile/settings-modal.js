import Modal from "./modal";
import SettingsContent from "../settings";

export default function SettingsModal({ open, controller }) {
  return (
    <Modal //
      open={open}
      controller={controller}
      title="Settings"
    >
      <SettingsContent />
    </Modal>
  );
}
