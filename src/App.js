import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';



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
      console.log(snapshot.val());

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

  handleClick = (e) => {
    e.preventDefault();
  

    const dbRef = firebase.database().ref();

    dbRef.push(this.state.userInput);
    // this will add the new items to the firebase database

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
        <h1>Packing List</h1>
        <h2>Going on a trip? Time to pack!</h2>
        
       
        <form action="submit">
          <label htmlFor="newItem">Add items to my list</label>
          <input onChange= { this.handleChange } value={ this.state.userInput } type="text" id= "newItem" placeholder="i.e. toothbrush"/>

          <button onClick= { this.handleClick }>Add item</button>

        </form>

        <ul>
        {
          this.state.items.map( (myItem) => {

            return (
              <li key={myItem.id}>
              <p> {myItem.item} - {myItem.id} </p>

              <button onClick={ () => this.deleteItem(myItem.id) }>delete</button>
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