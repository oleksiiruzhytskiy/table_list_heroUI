import React, { useEffect, useState } from 'react';
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import Cookies from 'js-cookie';
import { initialMemes } from '../memesData';

export default function ListPage() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const savedMemes = Cookies.get('memes');
    if (savedMemes) {
      setMemes(JSON.parse(savedMemes));
    } else {
      setMemes(initialMemes);
    }
  }, []);

  return (
    <div className="container">
      <h1>Список мемів</h1>
      <div className="grid-list">
        {memes.map(meme => (
          <Card key={meme.id} className="card">
            <Image src={meme.image} alt={meme.name} className="card-image" />
            <div className="card-content">
              <h3>{meme.name}</h3>
              <p>Лайків: {meme.likes}</p>
              <a 
                href={meme.image} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Відкрити оригінал
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
