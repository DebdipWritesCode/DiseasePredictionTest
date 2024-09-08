import { useState } from "react";
import Header from "./components/Header";
import ImageComponent from "./components/ImageComponent";
import Upload from "./components/Upload";
import heroImage from "./assets/image.png";
import Results from "./components/Results";

interface PredictionResults {
  top_3_predictions: {
    disease: string;
    probability: number;
  }[];
}

const defaultResult: PredictionResults = {
  top_3_predictions: [
    { disease: "Disease 1", probability: 0.8 },
    { disease: "Disease 2", probability: 0.1 },
    { disease: "Disease 3", probability: 0.05 },
  ],
};

function App() {
  const [image, setImage] = useState(heroImage);
  const [result, setResult] = useState<PredictionResults>(defaultResult);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-[#F0ECE8]">
      <Header />
      <div className="flex justify-between">
        <ImageComponent image={image} />
        <div className="flex flex-col w-1/2 gap-8">
          <Upload setImage={setImage} setResult={setResult} setLoading={setLoading} />
          <Results result={result} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
