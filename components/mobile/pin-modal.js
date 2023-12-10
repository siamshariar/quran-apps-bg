import Modal from "./modal";
import PinList from "../pin/list";

export default function PinModal({ open, controller }) {
  return (
    <Modal //
      open={open}
      controller={controller}
      title="Pinned Verses"
    >
      <PinList controller={controller} />
    </Modal>
  );
}
