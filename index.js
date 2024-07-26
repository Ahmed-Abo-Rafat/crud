//Select All Elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;

// Sum the total Price
function getTotal(){
    if(price.value != '' && taxes.value != '' && ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
    }else{
        total.innerHTML = '';
    }
}


// Built function to create product
let allProducts;
if(localStorage.products != null){
  allProducts = JSON.parse(localStorage.products);
  showData();
}else{
  allProducts = [];
}

submit.onclick = function(){
  let newProduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
  }

  // create data
  if(title.value != '' && price.value != '' 
  && category.value != '' && newProduct.count < 100){
    if(mood === 'create'){
          if(newProduct.count > 1){
            for(let i = 0; i < newProduct.count; i++){
              allProducts.push(newProduct);
            }
            }else{
              allProducts.push(newProduct);
            }
    }else{
        allProducts[temp] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }
    clearData()
  }   

    // save data to local storage
    localStorage.setItem('products', JSON.stringify(allProducts));

    showData()
  }


  // clear inputs
  function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';

  }


// read data
function showData(){
  getTotal()
  let table = '';
  for(let i = 0; i < allProducts.length; i++){
      table += `
      <tr>
          <td>${i + 1}</td>
          <td>${allProducts[i].title}</td>
          <td>${allProducts[i].price}</td>
          <td>${allProducts[i].taxes}</td>
          <td>${allProducts[i].ads}</td>
          <td>${allProducts[i].discount}</td>
          <td>${allProducts[i].total}</td>
          <td>${allProducts[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">Update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>
      `;
    }

  document.getElementById('tbody').innerHTML = table; 
  let deleteBtn = document.getElementById('deletedata');
  if(allProducts.length > 0){
    deleteBtn.innerHTML = `
    <button onclick="deleteAll()">Delete All (${allProducts.length})</button>
    `
  }else{
    deleteBtn.innerHTML = '';
  }

}





// delete data
function deleteData(i){
    allProducts.splice(i, 1);
    localStorage.products = JSON.stringify(allProducts);
    showData()
}


function deleteAll(){
  localStorage.clear()
  allProducts.splice(0)
  showData()
}




// update data
function updateData(i){
  title.value = allProducts[i].title;
  price.value = allProducts[i].price;
  taxes.value = allProducts[i].taxes;
  discount.value = allProducts[i].discount;
  category.value = allProducts[i].category;
  ads.value = allProducts[i].ads;
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  mood = 'update'
  temp = i;
  getTotal()

  scroll({
    top:0,
    behavior: 'smooth',
  })

}




// search
let searchMood = 'title';

function getSearchMood(id){
  let search = document.getElementById('search');
  if(id == 'searchTitle'){
    searchMood = 'title';

  }else{
    searchMood = 'category';
  }
  search.placeholder = 'Search by '+ searchMood;
  search.focus()
  search.value = '';
  showData()
}


function searchData(value){
  let table = '';
  for(let i = 0; i < allProducts.length; i++ ){

    if(searchMood == 'title'){
            if(allProducts[i].title.includes(value.toLowerCase())){
              table += 
                  `<tr>
                      <td>${i}</td>
                      <td>${allProducts[i].title}</td>
                      <td>${allProducts[i].price}</td>
                      <td>${allProducts[i].taxes}</td>
                      <td>${allProducts[i].ads}</td>
                      <td>${allProducts[i].discount}</td>
                      <td>${allProducts[i].total}</td>
                      <td>${allProducts[i].category}</td>
                      <td><button onclick="updateData(${i})" id="update">Update</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                  </tr>`;

            }
        


    }else{
        if(allProducts[i].category.includes(value.toLowerCase())){
          table += 
              `<tr>
                  <td>${i}</td>
                  <td>${allProducts[i].title}</td>
                  <td>${allProducts[i].price}</td>
                  <td>${allProducts[i].taxes}</td>
                  <td>${allProducts[i].ads}</td>
                  <td>${allProducts[i].discount}</td>
                  <td>${allProducts[i].total}</td>
                  <td>${allProducts[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">Update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
              </tr>`;

        }
    
    }
  }
    document.getElementById('tbody').innerHTML = table; 

}