import { useState, useEffect } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(" ").slice(0, 3).join(" ");
    console.log(threeFirstWords);
    const imageFetchUrl = `${CAT_PREFIX_IMAGE_URL}/cat/says/${threeFirstWords}?size=50&color=red`;

    setImageUrl(imageFetchUrl);
  }, [fact]);

  return (
    <>
      <h1>Gatitos API</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`image extracted using the first three words of: ${fact}`}
        />
      )}
    </>
  );
}

export default App;
