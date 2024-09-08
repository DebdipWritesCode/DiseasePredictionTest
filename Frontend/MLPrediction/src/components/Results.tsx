import React from "react";

interface Prediction {
  disease: string;
  probability: number;
}

interface ResultProps {
  result: {
    top_3_predictions: Prediction[];
  };
  loading: boolean;
}

const Results: React.FC<ResultProps> = ({ result, loading }) => {
  const topPrediction = result.top_3_predictions[0];
  const otherPredictions = result.top_3_predictions.slice(1);

  if (loading) {
    return (
      <div className="mx-[80px] bg-white shadow-2xl p-6 rounded-xl">
        <p className="text-2xl font-semibold text-green-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-[80px] bg-white shadow-2xl p-6 rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-600">
          Most Probable Prediction
        </h2>
        <p className="text-xl font-semibold mt-2">
          {topPrediction.disease}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Other Predictions:</h3>
        <ul className="mt-4 space-y-4">
          {otherPredictions.map((prediction, index) => (
            <li key={index} className="text-lg">
              <span className="font-semibold">{prediction.disease}</span> -{" "}
              <span className="text-gray-600">
                {prediction.probability.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
