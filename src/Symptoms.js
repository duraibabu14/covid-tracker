import React from "react";
import "./Symptoms.css";
import Drawer from "./Drawer";


function Symptoms() {
  return (
    <div className="symptoms">
      <div className="symptoms__drawer">
        <Drawer />
      </div>
      <h1>Symptoms</h1>
      <div className="symptoms__info">
        <p>
          COVID-19 affects different people in different ways. Most infected
          people will develop mild to moderate illness and recover without
          hospitalization.
        </p>
      </div>
      <div className="symptoms__points">
        <h4>Most common symptoms:</h4>
        <li>Fever</li>
        <li>Dry cough</li>
        <li>Tiredness</li>

        <h4>Less common symptoms:</h4>
        <li>Aches and pains</li>
        <li>Sore throat</li>
        <li>Diarrhoea</li>
        <li>Conjunctivitis</li>
        <li>Headache</li>

        <h4>Serious symptoms:</h4>
        <li>Difficulty breathing or shortness of breath</li>
        <li>Chest pain or pressure</li>
        <li>Loss of speech or movement</li>
      </div>
      <div className="symptoms__footer">
        <p>
          Seek immediate medical attention if you have serious symptoms. Always
          call before visiting your doctor or health facility.
        </p>
        <p>
          {" "}
          People with mild symptoms who are otherwise healthy should manage
          their symptoms at home.
        </p>
        <p>
          {" "}
          On average it takes 5–6 days from when someone is infected with the
          virus for symptoms to show, however it can take up to 14 days.
        </p>
      </div>
    </div>
  );
}

export default Symptoms;
