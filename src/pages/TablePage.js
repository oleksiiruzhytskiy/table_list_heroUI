import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@heroui/table";
import { Button } from "@heroui/button";
import Cookies from "js-cookie";
import MemeEditModal from "../components/MemeEditModal";
import { initialMemes } from "../memesData";

export default function TablePage() {
  const [memes, setMemes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(null);

  useEffect(() => {
    const savedMemes = Cookies.get("memes");
    if (savedMemes) {
      setMemes(JSON.parse(savedMemes));
    } else {
      setMemes(initialMemes);
      Cookies.set("memes", JSON.stringify(initialMemes));
    }
  }, []);

  const handleEdit = (meme) => {
    setCurrentMeme({ ...meme });
    setIsModalOpen(true);
  };

  const handleSave = (updatedMeme) => {
    const updatedMemes = memes.map((m) =>
      m.id === updatedMeme.id ? updatedMeme : m
    );
    setMemes(updatedMemes);
    Cookies.set("memes", JSON.stringify(updatedMemes));
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Таблиця мемів</h1>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>{meme.id}</TableCell>
              <TableCell>{meme.name}</TableCell>
              <TableCell>{meme.likes}</TableCell>
              <TableCell>
                <Button
                  className="primary"
                  size="small"
                  onClick={() => handleEdit(meme)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {currentMeme && (
        <MemeEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          meme={currentMeme}
          onSave={handleSave}
        />
      )}
    </div>
  );
} 