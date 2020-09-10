import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';




class App extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      userInput:""
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {

      const data = snapshot.val();

      const newItemsArray = [];

      for (let propertyName in data) {
        const itemObject = {
          id: propertyName,
          item: data[propertyName]
        }
        newItemsArray.push( itemObject );
      }

      this.setState({
        items: newItemsArray
      })
    })
  }


  handleChange = (e) => {
    this.setState({
      userInput: e.target.value
    
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const dbRef = firebase.database().ref();
    
    // add new items to the firebase database
    dbRef.push(this.state.userInput);

    this.setState({
      userInput:""
    })
  }


  // deleting items from database
  deleteItem = (itemId) => {
    const dbRef= firebase.database().ref();
    dbRef.child(itemId).remove();
  }



  render(){
    return (
      <div className="App">
        <h1>PackPal</h1>
        <h2>Going on a trip? Time to pack!</h2>
        <h3>Add items to your list:</h3>
        
       
        <form onSubmit = {this.handleSubmit}>
          <label htmlFor="newItem">Add items to your list</label>
          <input 
          className= "newItem" 
          type="text" 
          required= "required" 
          // requiredTxt= "please enter an item"
          placeholder="i.e. passport" 
          aria-label="enter an item here"
          onChange= { this.handleChange } 
          value={ this.state.userInput } />

          <button type="submit" 
          // onClick= { this.handleClick }
          >Add item</button>

        </form>

        <ul>
        {
          this.state.items.map( (myItem) => {
            return (
              <li key={myItem.id}>
              <p> 
              {myItem.item} 
              <button onClick={ () => this.deleteItem(myItem.id) }>
              <FontAwesomeIcon className="faicons" icon={faTrash} />
                  </button>
              </p>
              </li>
            )
          })
        }
        </ul>  
      </div>
    );
  }
}

export default App;