import React from "react";

function Item({ item, patch, OndeleteItem }) {

  //DELIVERABLE 3: TRACK ITEMS "ADDED TO CART"  and UPDATE IN-CART STATUS ON SERVER
  // GUIDANCE: Identify which COMPONENT triggers this event make changes from that component - "Item Component"
  /**STEPS
   * 1. After User Adds an item to Cart, Update In-Cart status on Server (PATCH REQUEST), create function to handle "AddtoCartClick"
   * 2. Update "In-Cart" State variable by calling setInCart and pass new boolean data from API
   * 3. Display In-Cart status via "itemsToDisplay Array"
   */

  //creating function to handle AddtoCartClick
  function AddtoCartClick(){
    
    //Creating PATCH REQUEST -by specyfying item - id
    //onclick update server isInCart value by changing it to : "that item-NOT IN CART"
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "isInCart": !item.isInCart
      }),
    })
    .then(function(response){
      return response.json()
    })
    //send new updated item to the "callback function in ShoppingList Component" to be used to update state
    .then(function(res){
      patch(res)
    })
  }

  //DELIVERABLE 4: REMOVING ITEMS FROM SHOPPING LIST  and Persisting removal from the SERVER
  // GUIDANCE: Identify which COMPONENT triggers this event make changes from that component - "Item Component"
  /**STEPS
   * 1. After User remove an item from shopping list, remove from Server (DELETE REQUEST), create function to handle "itemRemove"
   * 2. Update State variable by calling setInCart or equivalent cb function and pass new items (minus deleted one)
   * 3. Display new items via "itemsToDisplay Array"
   */

  //function to remove item
  function itemRemove(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE"
    })
    .then(function(response){
      return response.json()
    })
    // passing new deleted item to the "callback function in ShoppingList Component" to be used to for "deletion" from state
    .then(function(){
      OndeleteItem(item)
      console.log(`item with id: ${item.id} succesfully deleted`)
    })
  }


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
      onClick={AddtoCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={itemRemove}>Delete</button>
    </li>
  );
}

export default Item;
