import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState({});
  const [counter, setCounter] = useState(1);
  const [email, SetEmail] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => setUser(data.results[0]))
      .catch(error => console.log(error));
  }, []);

  const newUser = (gender) => {
    let url = "https://randomuser.me/api/"
    if (gender == "male") {
      url += "?gender=male";
    } else if (gender == "female") {
      url += "?gender=female";
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setUser(data.results[0]))
      .catch(error => console.log(error));

    setCounter(counter+1)
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const gender = event.target.elements.gender.value;
    newUser(gender);
  }
  

  const showEmail = (event) => {
    SetEmail(event.target.checked)
  }

  return (
    <div className="App">
      
      <h1>Random User Generator!</h1>

      <p class="info">Gender:</p>
      <p >{user.gender}</p>
      <p class="info">First Name:</p>
      <p>{user.name?.first}</p>
      <p class="info">Last Name:</p>
      <p>{user.name?.last}</p>
      <p class="info">Country:</p>
      <p>{user.location?.country}</p>
      {email && <p class="info">Email:</p>}
      {email && <p>{user.email}</p>}

      <div>
        <input type="checkbox" onChange={showEmail} />
        Show email
      </div>

      <div>Choose a gender!</div>
    

      <form onSubmit={formSubmit}>

        <label>
          Male
          <input type="radio" name="gender" value="male" />
        </label>
        <label>
          Female
          <input type="radio" name="gender" value="female" />
        </label>
        <button type="submit">Generate a user!</button>

      </form>
      
      <div>Users generated: {counter}</div>


    </div>
  );
}

export default App;
