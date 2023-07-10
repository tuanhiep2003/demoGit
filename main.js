// search
var btnSearch = document.querySelector('.search-btn')

btnSearch.addEventListener('click', function () {
  this.parentElement.classList.toggle('open')
  console.log(this.previousElementSibling);
  this.previousElementSibling.focus();
})


// //list ảnh bên dưới 
// var imgFeature = document.querySelector('.img-feature')
// var listlogo = document.querySelectorAll('.list-logo img')

// var currentIndex =0;
// function updateImageByIndex(index){
//     //remove active class
//     listlogo = document.querySelectorAll('.list-logo div').forEach(item=>{
//         item.classList.remove('active')
//     })
//     currentIndex = index
//     imgFeature.src = listlogo[index].getAttribute('src')
//     listlogo[index].parentElement.classList.add('active')
// }

// listlogo.forEach((imgElement, index)=>{

//     imgElement.addEventListener('click', e=>{
//         updateImageByIndex(index)
//     })
// })


// updateImageByIndex(0)

// var imgFeature = document.querySelector('.img-feature')
// var listLogo = document.querySelectorAll('.list-logo img')

// listLogo.forEach(imgElement => {
//     imgElement.addEventListener('click', e => {
//         imgFeature.src = e.target.getAttribute('src')
//     })
// })

// var imgFeature = document.querySelector('.img-feature-2')
// var listLogo = document.querySelectorAll('.list-logo img-2')

// listLogo.forEach(imgElement => {
//     imgElement.addEventListener('click', e => {
//         imgFeature.src = e.target.getAttribute('src')
//     })
// })

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

//list ảnh bên dưới 
function switchPhoto() {
  const productItem = document.querySelectorAll('.product-item')

  // MewDevPro was here
  for (const item of productItem) {
    const productThumbnail = item.querySelector('.product-thumb img')
    const listThumbnail = item.querySelectorAll('.image-min ul li img')

    listThumbnail.forEach(i => {
      let currentThumbnail = productThumbnail.src
      function getThumbnail(event) {
        const thumbnailSrc = event.target.getAttribute('src')
        return thumbnailSrc
      }
      function setThumbnailClick(event) {
        const thumbSrc = getThumbnail(event)
        currentThumbnail = productThumbnail.src = thumbSrc
      }

      // function setThumbnailHover(event) {
      //   const thumbSrc = getThumbnail(event)
      //   productThumbnail.src = thumbSrc
      // }

      // function resetThumbnail() {
      //   productThumbnail.src = currentThumbnail
      // }
      // i.addEventListener('click', setThumbnailClick)
      i.addEventListener('mouseover', setThumbnailClick)
      // i.addEventListener('mouseout', resetThumbnail)
    })
  }
}

function toggleFilterTable() {
  document.querySelectorAll('.advise').forEach(item => {
    item.addEventListener('mouseover', function (event) {
      document.querySelector('.contentFilter').style.display = 'block'
    })
  })
  document.addEventListener('click', function (event) {
    document.querySelector('.contentFilter').style.display = 'none'
  })
}

window.onload = () => {
  switchPhoto();
  toggleFilterTable()
}


//menu trang chính cuộn
$(document).ready(function(){
  $(window).scroll(function(){
    if($(this).scrollTop()){
      $('header').addClass('sticky')
    }
    else{
      $('header').removeClass('sticky')
    }
  })
})
