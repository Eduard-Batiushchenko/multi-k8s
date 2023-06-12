import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [values, setValues] = useState({});
  const [seenIndex, setSeenIndex] = useState([]);
  const [index, setIndex] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("/api/values", { index });
    setIndex("");
  }

  function renderSeenIndexes() {
    return seenIndex.map(({ number }) => number).join(", ");
  }

  function renderValues() {
    const entries = [];

    for (const key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  useEffect(() => {
    async function fetchValues() {
      const values = await axios.get("api/values/current");
      setValues(values.data);
    }

    async function fetchIndexes() {
      const seenIndexes = await axios.get("api/values/all");
      setSeenIndex(seenIndexes.data);
    }

    fetchValues();
    fetchIndexes();
  }, [index]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
          <button type="submit"> Submit</button>
        </label>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated values:</h3>
      {renderValues()}
    </>
  );
};

export default Fib;
