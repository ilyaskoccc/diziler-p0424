import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function DiziEkle({ setDiziler, diziler }) {
  const initialForm = {
    id: Math.floor(Math.random() * 10000 + 20),
    name: "",
    permalink: "yeni",
    start_date: "",
    end_date: null,
    country: "",
    network: "HBO",
    status: "Ended",
    image_thumbnail_path: "",
  };

  const [yeniDizi, setYeniDizi] = useState(initialForm);
  const history = useHistory();

  function handleBack() {
    history.push("/");
  }

  const handleChange = (e) => {
    setYeniDizi({
      ...yeniDizi,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDiziler([...diziler, yeniDizi]); // Yeni diziyi listeye ekleme
    history.push("/"); // Kaydedince ana sayfaya yönlendirme
  };

  return (
    <div className="details-container" style={{ color: "white" }}>
      <form onSubmit={handleSubmit}>
        <h2>Name</h2>
        <input
          type="text"
          className="ekle-form"
          name="name"
          value={yeniDizi.name}
          onChange={handleChange}
        />
        <h2>Start Date</h2>
        <input
          type="date"
          className="ekle-form"
          name="start_date"
          value={yeniDizi.start_date}
          onChange={handleChange}
        />
        <h2>Country</h2>
        <input
          type="text"
          className="ekle-form"
          name="country"
          value={yeniDizi.country}
          onChange={handleChange}
        />
        <h2>Img URL</h2>
        <input
          type="text"
          className="ekle-form"
          name="image_thumbnail_path"
          value={yeniDizi.image_thumbnail_path}
          onChange={handleChange}
        />
        <div>
          <button type="button" className="ekle-button" onClick={handleBack}>
            Geri Dön
          </button>
          <button type="submit" className="ekle-button">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
