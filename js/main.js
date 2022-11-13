// get elements with thier IDs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let pop = document.getElementById('pop');
let mood = 'create';
let tmp;
//check getting elements
///////////console.log(title, price, taxes, ads, discount, total, count, category, submit);
// get total
function getTotal()
{
    if (price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }
    else
    {
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
    }
   // console.log("done");
}
// get product
let dataProduct = [];
if (localStorage.product != null)
{
    dataProduct = JSON.parse(localStorage.product);
}
else
{
    dataProduct = [];
}

submit.onclick = function ()
{
    let newProduct =
    {
        title: title.value.toUpperCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toUpperCase()
    }
    if (title.value    != '' && price.value != '' && count.value != '' &&
        category.value != '' && taxes.value != '' && ads.value   != '' && discount.value != '')
    {
        if ( isNaN(title.value) && isNaN(category.value) && !isNaN(count.value) )
        {
            if (mood === 'create')
           {
            if (newProduct.count > 1)
            {
                for (let i = 1; i <= newProduct.count; i++)
                {
                        dataProduct.push(newProduct);
                }
            }
            else
            {
                    dataProduct.push(newProduct);
            }

                clearData();
            }
            else {
                dataProduct[tmp] = newProduct;
                mood = 'create';
                count.style.display = "block";
                submit.innerHTML = 'create';
                clearData();
            }
        }
        else
        {
            alert("must enter valid title");   
        }
    }
    else
    {
        pop.style.display = "block";
    }
    
    localStorage.setItem('product', JSON.stringify(dataProduct));
    //console.log(dataProduct);
    
    showData();
}
// save localStorage
// clear inputs data

function clearData()
{
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
function showData()
{
    getTotal();
    let table = '';
    for (let i = 0 ; i < dataProduct.length; i++)
    {
        table +=`
                <tr>
                        <td>${i+1} </td>
                        <td>${dataProduct[i].title} </td>
                        <td>${dataProduct[i].price} </td>
                        <td>${dataProduct[i].taxes}  </td>
                        <td>${dataProduct[i].ads}  </td>
                        <td>${dataProduct[i].discount}  </td>
                        <td>${dataProduct[i].total} </td>
                        <td>${dataProduct[i].category} </td>
                        <td> <button onclick = "updateData(${i})" id="update"> Update</button> </td>
                        <td> <button onclick = "deleteData(${i})" id="delete"> Delete </button> </td>
                </tr>
                `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataProduct.length > 0)
    {
        btnDelete.innerHTML =`
                            <button onclick= "deleteAll()" class="mb-5" > Delete All (${dataProduct.length})</button>
                            `
    }
    else
    {
        btnDelete.innerHTML = '';   
    }
}
showData();
// count products
// delete product
function deleteData(i)
{
    //console.log(i);
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}
function deleteAll()
{
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}
// update product
function updateData(i)
{
    console.log(i);
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll(
        {
            top: 0,
            behavior:'smooth'
        }
    )
}

// search product
let searchMood = 'title';

function getSearchMood(id)
{
    //console.log(id);
    let search = document.getElementById('search');
    if (id == 'searchTitle')
    {
        searchMood = 'title';
    }
    else
    {
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus();
    search.value = '';
    showData();
    //console.log(searchMood);
}
function searchData(value)
{let table = '';
  //console.log(value);
    for (let i = 0; i < dataProduct.length; i++)
    {
        if (searchMood == 'title')
        {
            
            
                if (dataProduct[i].title.includes(value.toUpperCase()()))   
                {
                // console.log(i)
                    table +=`
                    <tr>
                            <td>${i+1} </td>
                            <td>${dataProduct[i].title} </td>
                            <td>${dataProduct[i].price} </td>
                            <td>${dataProduct[i].taxes}  </td>
                            <td>${dataProduct[i].ads}  </td>
                            <td>${dataProduct[i].discount}  </td>
                            <td>${dataProduct[i].total} </td>
                            <td>${dataProduct[i].category} </td>
                            <td> <button onclick = "updateData(${i})" id="update"> Update</button> </td>
                            <td> <button onclick = "deleteData(${i})" id="delete"> Delete </button> </td>
                    </tr>
                    `
                }    
            
        }
        else
        {
            
            
                if (dataProduct[i].category.includes(value.toLowerCase()))
                {
                    // console.log(i)
                    table += `
                    <tr>
                            <td>${i + 1} </td>
                            <td>${dataProduct[i].title} </td>
                            <td>${dataProduct[i].price} </td>
                            <td>${dataProduct[i].taxes}  </td>
                            <td>${dataProduct[i].ads}  </td>
                            <td>${dataProduct[i].discount}  </td>
                            <td>${dataProduct[i].total} </td>
                            <td>${dataProduct[i].category} </td>
                            <td> <button onclick = "updateData(${i})" id="update"> Update</button> </td>
                            <td> <button onclick = "deleteData(${i})" id="delete"> Delete </button> </td>
                    </tr>
                    `
                }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// clean data
// for togel popup
$('.togel').click(function()
    {
    $('.popup').fadeOut();
    });