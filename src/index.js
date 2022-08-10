document.addEventListener("DOMContentLoaded", function(){
    
    
    const woofUrl = 'http://localhost:3000/pups'
    fetch(woofUrl)
    .then(response => response.json())
    .then(data =>{        
    
        renderPups(data);

       
        const goodDogFilter = document.querySelector('#good-dog-filter')
        let filteredPupData = data
        goodDogFilter.onclick = () => { 

            if (goodDogFilter.innerHTML === 'Filter good dogs: OFF'){
           
        document.querySelector('#dog-bar').innerHTML = ''
        document.querySelector('#dog-info').innerHTML = ''
        goodDogFilter.innerHTML = 'Filter good dogs: ON'
        filteredPupData = data.filter (pupData => pupData.isGoodDog === true )
        renderPups(filteredPupData)
      }

        else { location.reload() }

     }


       function renderPups(data){

       const dogBar = document.querySelector('#dog-bar')
        data.forEach(pup=>{
    
    
            const span = document.createElement('span')
    
            span.innerHTML = pup.name
    
            dogBar.appendChild(span)

       span.onclick = function () {
        document.querySelector('#dog-info').innerHTML = ''

        const dogInfo = document.querySelector('#dog-info')

        const img = document.createElement('img')
        const pupTag = document.createElement('h2')
        const goodBtn = document.createElement('button')
        const badBtn = document.createElement('button')

        goodBtn.innerHTML = 'Good Dog!'
        badBtn.innerHTML = 'Bad Dog!'

        img.src = pup.image
        dogInfo.appendChild(img)

        pupTag.innerHTML = pup.name
        dogInfo.appendChild(pupTag)

         if (pup.isGoodDog === true) {
        dogInfo.appendChild(goodBtn)
        }
        else {
            dogInfo.appendChild(badBtn)
          }
          
        goodBtn.onclick = () => {
            
            dogInfo.removeChild(dogInfo.lastChild)

            fetch ((woofUrl + `/${pup.id}`) , {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({isGoodDog : false  })
            })
           
            dogInfo.appendChild(badBtn)
           }

           badBtn.onclick = () => {

            dogInfo.removeChild(dogInfo.lastChild)

            fetch ((woofUrl + `/${pup.id}`) , {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({isGoodDog : true  })
            })
             
            dogInfo.appendChild(goodBtn)
           }
       
          
    
    }

     }) 
    }})

})