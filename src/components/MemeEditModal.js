import React, { useState, useEffect } from "react";
import { Modal } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export default function MemeEditModal({ isOpen, onClose, meme, onSave }) {
  const [editedMeme, setEditedMeme] = useState(meme);

  useEffect(() => {
    setEditedMeme(meme);
  }, [meme]);

  const handleChange = (e) => {
    setEditedMeme({ ...editedMeme, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editedMeme.name.length < 3 || editedMeme.name.length > 100) {
      alert("Назва повинна містити від 3 до 100 символів");
      return;
    }
    if (!editedMeme.image.match(/\.jpg$/i)) {
      alert("Посилання має вести на JPG зображення");
      return;
    }
    onSave(editedMeme);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редагування мему">
      <div className="modal-container">
        <div className="modal-children">
          <Input label="ID" name="id" value={editedMeme.id} disabled />
          <Input
            label="Назва"
            name="name"
            value={editedMeme.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Посилання на картинку (JPG)"
            name="image"
            value={editedMeme.image}
            onChange={handleChange}
            required
          />
          <Input
            label="Лайки"
            name="likes"
            type="number"
            value={editedMeme.likes}
            onChange={handleChange}
            min="0"
            max="99"
            required
          />
          <div className="modal-buttons">
            <Button className="secondary" onClick={onClose}>Скасувати</Button>
            <Button className="primary" onClick={handleSubmit}>
              Зберегти
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}