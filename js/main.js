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
let mood = 'create';
let tmp;
let theme = document.getElementById('theme');
//check getting elements
///////////console.log(title, price, taxes, ads, discount, total, count, category, submit);
// get total
function getTotal()
{
    if (price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.color = "#fff";
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
    if (mood === 'create')
    {
            if (title.value != '' && price.value != '' && count.value != '' &&
                category.value != '' && taxes.value != '' && ads.value != '' && discount.value != '')
            {
                if (isNaN(title.value) && isNaN(category.value) && !isNaN(count.value) && !isNaN(total.innerHTML) && total.innerHTML > 0   )
                {
                    if (newProduct.count > 1) {
                        for (let i = 1; i <= newProduct.count; i++) {
                            dataProduct.push(newProduct);
                        }
                    }
                    else {
                        dataProduct.push(newProduct);
                    }

                    clearData();
                }
                else
                {
                swal({
                    title: "Wrong Inputs !!",
                    text: "Please Check The invalid Values ",
                    icon: "error",
                    button: "Ok",
                });
                }
            }
            else
            {
            swal({
                title: "Fields Empty !!",
                text: "Please Check The Missing Values ",
                icon: "error",
                button: "Ok",
            });
            }
    }
    else
    {
        if (title.value != '' && price.value != '' && category.value != '' &&
            taxes.value != '' && ads.value != '' && discount.value != '')
        {
            if (isNaN(title.value) && isNaN(category.value) && !isNaN(total.innerHTML) && total.innerHTML > 0)
            {
                dataProduct[tmp] = newProduct;
                mood = 'create';
                count.style.display = "block";
                submit.innerHTML = 'create';
                submit.style.backgroundColor = "green";
                swal({
                    title: "Successfully",
                    text: "Your Product has been Updated",
                    icon: "success",
                    button: "Ok",
                });
                clearData();
            }
            else
                {
                swal({
                    title: "Wrong Inputs !!",
                    text: "Please Check The invalid Values ",
                    icon: "error",
                    button: "Ok",
                });
                }
        }
        else
            {
            swal({
                title: "Fields Empty !!",
                text: "Please Check The Missing Values ",
                icon: "error",
                button: "Ok",
            });
            }
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
                        <td data-label="ID" >${i+1} </td>
                        <td data-label="Title" >${dataProduct[i].title} </td>
                        <td data-label="Price" >${dataProduct[i].price} </td>
                        <td data-label="Taxes" >${dataProduct[i].taxes}  </td>
                        <td data-label="Ads" >${dataProduct[i].ads}  </td>
                        <td data-label="Discount" >${dataProduct[i].discount}  </td>
                        <td data-label="Total" >${dataProduct[i].total} </td>
                        <td data-label="Category" >${dataProduct[i].category} </td>
                        <td data-label="Update" > <button onclick = "updateData(${i})" id="update"> Update</button> </td>
                        <td data-label="Delete" > <button onclick = "deleteData(${i})" id="delete"> Delete </button> </td>
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
    swal({
            title: "Are you sure ?",
            text: "Once deleted, you will not be able to recover this Product !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) =>
        {
            if (willDelete)
            {
            dataProduct.splice(i, 1);
            localStorage.product = JSON.stringify(dataProduct);
            showData();
            swal("Your product has been deleted !", {
            icon: "success",
            });
            } else
            {
            swal("Your Product is safe !");
            }
        });
    
}
// clean data
function deleteAll()
{
    swal({
            title: "Are you sure ?",
            text: "Once deleted, you will not be able to recover these Products !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) =>
        {
            if (willDelete)
            {
                localStorage.clear();
                dataProduct.splice(0);
                showData();
                swal("Your Products have been deleted !", {
                icon: "success",
            });
            } else
            {
            swal("Your Products are safe !");
            }
        });
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
    submit.style.backgroundColor = " gold ";
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
// change theme mode
theme.onclick = function ()
{
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        document.body.classList.add("light-theme");
        theme.src = "imgs/moon.png";
    }
    else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark");
        theme.src = "imgs/sun.png";
    }
}