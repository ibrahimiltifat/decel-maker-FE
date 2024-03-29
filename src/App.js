import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([{}]);

  const [weights, setWeights] = useState([]);
  const [weightsArray, setWeightsArray] = useState([]);
  const [listItems, setlistItems] = useState([]);
  const [SUMS, setSUMS] = useState([]);
  const [dSize, setdSize] = useState();

  const [bins, setBins] = useState([]);
  useEffect(() => {
    callApi();
  }, [weights]);

  const [formValues, setFormValues] = useState([{ name: "", email: "" }]);
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    let newWeights = [...weightsArray];
    // let test = [...weights];
    // let newWeights = [];
    newFormValues[i][e.target.name] = e.target.value;
    newWeights[i] = new Array(Number(newFormValues[i].email)).fill(
      Number(newFormValues[i].name)
    );
    // let test = [...weights, ...newWeights];
    setWeightsArray(newWeights);
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  async function callApi() {
    const response = await fetch(
      "https://flask-server-clone-ukyycsmcrq-uw.a.run.app",
      {
        method: "POST",
        body: JSON.stringify({
          weights,
          dSize: Number(dSize),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
        setBins(message);
        let list = [];
        for (let j = 0; j < message.length; j++) {
          let x = [];
          for (let i = 0; i < message[j].length; i++) {
            if (i === message[j].length - 1) {
              x.push(message[j][i]);
            } else {
              x.push(message[j][i]);
              x.push("-");
            }
          }
          list.push(x);
        }
        let x = list.map((number) => <ul>{number}</ul>);

        setlistItems(x);
        let y = message.map((number) => (
          <li>{number.reduce((result, number) => result + number)} </li>
        ));
        setSUMS(y);
      });
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    var newArr = [];
    for (var i = 0; i < formValues.length; i++) {
      newArr = newArr.concat(weightsArray[i]);
    }
    setWeights(newArr);
    console.log(dSize);
  };

  return (
    <>
      <header className="headerStyles">
        <div className="container">
          <h2>Decel Making software</h2>
        </div>
      </header>
      <div className="container">
        <div className="card">
          <label>Please Enter Decel Size</label>
          <input
            className="input-group"
            type="number"
            name="dSize"
            value={dSize}
            onChange={(e) => setdSize(e.target.value)}
          />
          <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
              <div className="form-inline" key={index}>
                <label>Size</label>
                <input
                  className="input-group"
                  type="text"
                  name="name"
                  value={element.name || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                <label>X</label>
                <input
                  className="input-group"
                  type="text"
                  name="email"
                  value={element.email || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                {/* {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null} */}
              </div>
            ))}
            <div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => addFormFields()}
              >
                Add
              </button>
              <button className="btn btn-secondary " type="submit">
                Submit
              </button>
            </div>
          </form>

          <div className="flex">
            <div className="text bins">{listItems}</div>
            <div className="text sums">{SUMS}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
