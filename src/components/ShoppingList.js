import React, { useState, useEffect, useDebugValue } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //DELIVERABLE 1: DISPLAY LIST OF ITEMS FROM SERVER WHEN APPLICATION FIRST LOADS. (use useEffect)
  // GUIDANCE: Identify which COMPONENT triggers this event make changes from that component - "ShoppingList Component"
  /**STEPS
   * 1. After DOM initial render, use useEffect to fetch data from API 
   * 2. Update "item" state variable by calling setItems and pass data from API
   * 3. Display via "itemsToDisplay Array"
   */

  useEffect(() => {
    fetch(" http://localhost:4000/items")
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      //console.log(data)
      setItems(data)
    })
  }, [])

  //call back function to add new item from "ItemForm Component" ,  this cb function will be passed as prop to "NewItem Component"
  function handleNewItem(newItem){
    setItems([...items, newItem])
    
  }
  //verify new item have been added to "item -state"  // also being displayed as per "const itemsToDisplay"
  //console.log(items)

  //DELIVERABLE 3 EXTENSION
  //PATCH CB FUNCTION, that will be passed to ItemCOmponent to allow updated component to exported back to Shoppinglist Component.
  //TO update state, create an new array to Map through all old items, if any of the "id's" of the elements in the old Id matches
  // the element in the newly updated item, replace the old element with the new element., if nothing matches, maintain all the old array's elements
  // then pass the newly created array to the "item state"
  function patch(updatedItem){
    const newUpdatedItems = items.map((item) => {
      if (item.id === updatedItem.id){
        return updatedItem
      }else{
        return item
      }
    })
    setItems(newUpdatedItems)
  }

  //DELIVERABLE 4 EXTENSTION :  UPDATING STATE TO REMOVE DELETED ITEM FROM
  //Create cb function to be passed down as prop to "ItemCOmponent", this will allow deleted item to be exported here,
  // and then removed from "item state"
  //TO UPDATE STATE with deleted item: create new Array to filter old array to return all elements except element matchng id of deleted element
  function deleteItem(deletedItem){
    const newItemwithoutDeletes = items.filter((i) => i.id !== deletedItem.id)
    setItems(newItemwithoutDeletes)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm OnAddNewItem={handleNewItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} patch={patch} OndeleteItem={deleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
