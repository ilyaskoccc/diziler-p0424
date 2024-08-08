import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function DiziDetay({ addDizi }) {
  const [detay, setDetay] = useState(null);
  let { dizi } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/show-details?q=" + dizi)
      .then((response) => setDetay(response.data.tvShow))
      .catch((error) => console.log(error))
      .finally(() => console.log("işlem bi şekilde tamam"));
  }, [dizi]);

  function handleBack() {
    history.push("/");
  }

  function handleAdd() {
    addDizi(detay);
    alert("eklendi!");
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }

  return (
    <div className="details-container">
      {detay ? (
        <div className="details details-content">
          <img src={detay.image_path} alt="Dizi poster" />
          <div className="details-table">
            <h1>
              {detay.name} - {Number(detay.rating).toFixed(2)}
            </h1>
            <h3>{detay.genres.join(" - ")}</h3>
            <p>{detay.description}</p>
            <div>
              <button onClick={handleAdd}>Listeme ekle</button>
              <button onClick={handleBack}>Geri Dön</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="details">yükleniyor...</div>
      )}
    </div>
  );
}
