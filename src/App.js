import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [],
      currentItem: {
        text:'',
        key: ''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);

  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key:Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem= this.state.currentItem;
    console.log(newItem);
    if(newItem.text!==""){
      const newItems=[...this.state.items, newItems];
      this.setState({
        items:newItems,
        currentItem:{
          text: '',
          key:''
        }
      })
    }
  }

  render(){
    return (
      <div className="App">
        <h1>Packing List</h1>
        <h2>Going on a trip? Add items here:</h2>
        <form id="packing-list" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter Item" value= {this.state.currentItem.text} onChange={this.handleInput}/>
          <button type="submit">Add item</button>
        </form>
        <ul>
        {/* {
          this.state.books.map((book) => {
            return <li>{book}</li>
          })      
          
        } */}
        </ul>
        
      </div>
    );
  }
  


  }

export default App;
