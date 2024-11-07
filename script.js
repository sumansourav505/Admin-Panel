 function addProduct(){
    const productName=document.getElementById("productName").value;
    const sellingPrice = document.getElementById('sellingPrice').value;
    const ProductCategory = document.getElementById('category').value;
    const productDetails={
        name:productName,
        price:sellingPrice,
        category:ProductCategory
    };
    
         axios.post("https://crudcrud.com/api/fa2a2335865745a6b15fde5f8546c987/AdminPanel",productDetails)
         .then(res=>{
            displayProduct(res.data)
         })
         .catch(err=>{
            console.log(err);
         });
         //clear the input fields
         document.getElementById("productName").value="";
         document.getElementById('sellingPrice').value="";
        //  document.getElementById('category').value="";
    }
    function displayProduct(productDetails){
        const productItems=document.createElement("li");
        productItems.appendChild(document.createTextNode(`${productDetails.name}-${productDetails.price}-${productDetails.category}`));
        const deleteBtn=document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        productItems.appendChild(deleteBtn);
        let productList;
        if (productDetails.category === "electronics") {
            productList = document.querySelector(".electronic");
        } else if (productDetails.category === "food") {
            productList = document.querySelector(".food");
        } else if (productDetails.category === "skincare") {
            productList = document.querySelector(".skincare");
        }
        if(productList){
            productList.appendChild(productItems);
        }
        deleteBtn.addEventListener("click",function(){
            axios.delete(`https://crudcrud.com/api/fa2a2335865745a6b15fde5f8546c987/AdminPanel/${productDetails._id}`)
            .then(()=>{
                productList.removeChild(productItems);
            })
            .catch(err=>{
                console.log(err);
            });
        });
    }
    function showNewProduct(productDetails){
        displayProduct(productDetails);
    }
    window.onload=function(){
        axios.get("https://crudcrud.com/api/fa2a2335865745a6b15fde5f8546c987/AdminPanel")
        .then((res)=>{
            res.data.forEach((product)=>{
                showNewProduct(product)
            });
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
