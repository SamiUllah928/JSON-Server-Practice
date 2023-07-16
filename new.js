let arr

// Get Product 
getproduct=()=>{
fetch('  http://localhost:3000/photos')
.then((data)=>data.json())
.then((format)=>{
    arr=format
    console.log((format))
     let data=''
    for (let index = 0; index < format.length; index++) {
        const element = format[index];
         data+=`
        
<div class="sett">
          
        <div class="senoir">
        <img src="${element.image}" alt="">
    </div>
    <div class="junior">
        <p><b>Category:</b>${element.category}</p>
        <p><b>Description:</b>${element.description}</p>
        <p><b>Title:</b>${element.title}</p>
        <P>${element.id}</p>
        <div class='btn'>
        <button id="clickbtn" value=${element.id}>DELETE</button>
        <button id="edit" value=${element.id}>Edit</button>
        
        </div>

      </div>
      </div>
        
        
        `
    }
    document.getElementById('parent').innerHTML=data
})
}
getproduct()
 

//  Delete Product
let deleteproduct=()=>{
document.addEventListener('click',(e)=>{
if (e.target.id == "clickbtn") {
    id = e.target.value
    option={
        method: 'DELETE',
        headers:{
           "Content-Type": "application/json" 
        }
    }

}
fetch(`  http://localhost:3000/photos/${id}`,option)
.then((e)=> getproduct())
})
}
deleteproduct()


// Add product 
let addrequest=()=>{
document.getElementById('addform').addEventListener('submit',(e)=>{
    e.preventDefault()
    let category=  document.getElementById("category").value
    let image=  document.getElementById("image").value
    let title=  document.getElementById("title").value
    let description=  document.getElementById("description").value

    let data={
        category,
        image,
        title,
        description

    }
    console.log(data)
    let option={
        method: 'POST',
    body: JSON.stringify(data),
    headers:{
        "Content-Type": "application/json"
    }
    }
fetch(`http://localhost:3000/photos`, option)
.then((e)=>e.json()).then(()=>getproduct())
})
}
addrequest()



// Update product (Edit product)
let updateproduct=()=>{

let addatatoinput=()=>{
    document.addEventListener('click',(e)=>{
    
        if(e.target.id=='edit'){
            // console.log( e.target.value)
            let index=e.target.value
            console.log(arr[index - 1])
            document.getElementById("category1").value=arr[index-1].category
            document.getElementById("image1").value=arr[index-1].image
            document.getElementById("title1").value=arr[index-1].title
            document.getElementById("description1").value=arr[index-1].description
            document.getElementById('btn1').value=arr[index-1].id
        
        }
        
    })
}
addatatoinput()


let patchdata=()=>{

document.getElementById('editform').addEventListener('submit',(e)=>{
    e.preventDefault()
    let category=document.getElementById("category1").value
    let image=document.getElementById("image1").value
    let title=document.getElementById("title1").value
    let description=document.getElementById("description1").value
    let id=document.getElementById('btn1').value
    let data={
        category,
        image,
        title,
        description,
        }
    let option={
        method:'PATCH',
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"Application/json"
        }
    }

    fetch(`http://localhost:3000/photos/${id}`,option).then(()=>getproduct())
})  
}
patchdata()
}
console.log(arr)
updateproduct()