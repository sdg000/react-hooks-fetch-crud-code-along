import React, { useEffect, useState } from "react";

function ItemForm({OnAddNewItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  //DELIVERABLE 2: POST NEW FORM DATA TO SERER AND UPDATE "NAME, CATEGORY" STATE VARIABLES
  // GUIDANCE: Identify which COMPONENT triggers this event make changes from that component - "ItemForm Component"
  /**STEPS
   * 1. When a user submits a form (containing item name and item category), make a POST request to server with 
   * the new formData information. CREATE FUNCTION TO HANDLE SUBMIT
   * 
   * 2. Update "name / category" state variables by calling "setItems and setCategory" and pass new formData to it
   * 3. Add new item to list of items displayed.
   * 
   */
  //1. function to handle form submit
  function handleSubmit(e){
    e.preventDefault()
    // console.log("name: ", name)
    // console.log("category: ", category)

    //2. OnSubmit, create new object data to be passed to server using fetch
    //since "name", "category" in form has been saved to state onSubmit, we can assign them in the new object created
    const itemData = {
      name: name,
      category: category,
      isIncart: false
    }

    //3. Persisiting or Submitting new user dataForm to server via fetch//POST
    //4. UPDATING THE STATE WITH NEW USER SUBMITTED DATA (itemData)
  /**
   * Step 1: find the component that owns the main state variable you want to update.
   * ....if it's in a different component, say a parent to the current component,  pass a cb function as a prop from that
   * component down to the current component to allow you to export the newData to that particular component to be used 
   * to update the state over there.
   * 
   * Here, the ShoppingList Component owns the state variable (item), 
   * Resolultion 1: create a function in that component and pass it down as a prop to this component.
   */

    //Persisting new data to the server via HTTP POST METHOD
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemData)
    })
    .then(function(response){
      return response.json()
    })

    //using the cb function prop passed down from "ShoppingList Component" to update "item state" in the "ShoppingList Component"
    //after data is posted to the server, the server automatically add a unique key to each post, therefore making it 
    // array compatible(with id) to be added to STATE
    .then(function(res){
      OnAddNewItem(res)
    })

    
  }
   
  

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
