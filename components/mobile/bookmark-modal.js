import Modal from "./modal";
import BookmarkList from "../bookmark/list";

export default function BookmarkModal({ open, controller }) {
  return (
    <Modal //
      open={open}
      controller={controller}
      title="Bookmarks"
    >
      <BookmarkList controller={controller} />
    </Modal>
  );
}
