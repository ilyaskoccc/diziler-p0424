import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import DiziDetay from "./DiziDetay";
import DiziEkle from "./DiziEkle";

/*
DİZİLER
- Dizi listesi olsun
  -> API'den almak, axios kullanmak
- Diziye tıklandığında kısa bilgi görelim
  - Dizi detayına tıklandığında detaylı bilgi görelim.
  -> alt sayfa, routing: react-router-dom

- İzlemek istediğim diziler listesi yapabilelim, buna dizi ekleyip silebilelim
  -> hafıza, state
- dizi arayabilelim
  -> 
- İzlemek istediğim diziler listesine, bu API'de olmayan bir dizi ekleyebilelim
  -> form ile eklemek

*/

function App() {
  const [diziler, setDiziler] = useState(null);
  const [secili, setSecili] = useState(null);

  const [izlenecek, setIzlenecek] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/most-popular?page=1")
      .then((response) => setDiziler(response.data.tv_shows))
      .catch((error) => console.log(error))
      .finally(() => console.log("işlem bi şekilde tamam-2"));
  }, []);

  function addIzlenecek(tiklananDizi) {
    // diziyi, var olan izlenecek listesinin sonuna ekle
    // console.log(izlenecek, dizi, "**");

    // tıklanan dizi, izlenecekler listesinde zaten var mı?
    const filtered = izlenecek.filter(
      (eklenen) => eklenen.id.toString() === tiklananDizi.id.toString()
    );

    if (filtered.length > 0) {
      alert("bu dizi listede var!");
    } else {
      const yeniListe = [tiklananDizi, ...izlenecek];
      setIzlenecek(yeniListe);
    }
  }

  function removeIzlenecek(tiklananDizi) {
    // izlenecekler listesinden çıkar
    const kalanlar = izlenecek.filter(
      (eklenmis) => eklenmis.id !== tiklananDizi.id
    );

    setIzlenecek(kalanlar);
  }

  return (
    <Switch>
      <Route path="/" exact>
        <div className="app">
          <div className="list">
            <h2>API Dizi Listesi ({diziler ? diziler.length : "..."})</h2>
            <div className="list-content">
              {diziler
                ? diziler.map((dizi) => (
                    <div key={dizi.id} className="list-item">
                      <img
                        src={dizi.image_thumbnail_path}
                        alt={`${dizi.name} posteri`}
                      />
                      <div>
                        <h3>{dizi.name}</h3>
                        <button onClick={() => setSecili(dizi)}>İncele</button>
                        <button onClick={() => addIzlenecek(dizi)}>Ekle</button>
                      </div>
                    </div>
                  ))
                : "yükleniyor"}
            </div>
            {/* burada diziler görünecek */}
          </div>
          {secili ? (
            <div className="infoBox">
              <img src={secili.image_thumbnail_path} alt="Seçili poster" />
              <div>
                <h1>{secili.name}</h1>
                <p>
                  {secili.country} - {secili.network} - {secili.status}
                </p>
                <p>Start Date: {secili.start_date}</p>

                {secili.permalink === "yeni" ? (
                  ""
                ) : (
                  <Link to={`/dizi-detay/${secili.permalink}`}>Detaylar</Link>
                )}

                {izlenecek.filter((eklenmis) => eklenmis.id === secili.id)
                  .length > 0 ? (
                  "eklenmiş"
                ) : (
                  <button onClick={() => addIzlenecek(secili)}>Ekle</button>
                )}
              </div>
            </div>
          ) : (
            <div className="infoBox">Soldan bir dizi seçin</div>
          )}
          <div className="list">
            <h2>İzleyeceklerim</h2>
            <div className="list-content">
              {izlenecek.length > 0
                ? izlenecek.map((dizi) => (
                    <div key={dizi.id} className="list-item">
                      <img
                        src={dizi.image_thumbnail_path}
                        alt={`${dizi.name} posteri`}
                      />
                      <div>
                        <h3>{dizi.name}</h3>
                        <button onClick={() => removeIzlenecek(dizi)}>
                          Listeden çıkar
                        </button>
                      </div>
                    </div>
                  ))
                : "Dizi ekleyin"}
              <Link to="/dizi-ekle" className="ekle">
                Yeni Film Ekle
              </Link>
            </div>
          </div>
        </div>
      </Route>
      <Route path="/dizi-detay/:dizi">
        <DiziDetay addDizi={addIzlenecek} izlenecek={izlenecek} />
      </Route>
      <Route path="/dizi-ekle">
        <DiziEkle setDiziler={setDiziler} diziler={diziler} />
      </Route>
    </Switch>
  );
}

export default App;
