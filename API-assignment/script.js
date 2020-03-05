const selectBtn = $('#select-subject');
const listOfItems = $('#met-objects');

let searchSubject = '';

selectBtn.change(function(){

    listOfItems.html('')
    console.log($(this).val())
    searchSubject = $(this).val()

    let searchUrl =
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchSubject}`;

    fetchMuseumData(searchUrl);
})

const objectBaseUrl =
"https://collectionapi.metmuseum.org/public/collection/v1/objects/";

let metData;
let myArray = [];

// fetch query
function fetchMuseumData(url) {
  window
    .fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log("fetchMuseumData", data);
      fetchObjects(data);
    });
}

// from the response, fetch objects
function fetchObjects(data) {
  // get new array with just the first 10 elements
  let objectIDs = data.objectIDs.slice(0, 10);
  console.log("fetching: " + objectIDs.length + " objects");
  objectIDs.forEach(function(n) {
    // console.log(objectBaseUrl + n);
    let objUrl = objectBaseUrl + n;
    window
      .fetch(objUrl)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        addObject(data);
        addToListOfItems(data);
        console.log(myArray);
      });
      
  });
  
}

// add desired objects to array
function addObject(objectData) {
  var currentID = objectData.objectID;
  var currentTitle = objectData.title;
  var currentDate = objectData.objectBeginDate;
  var imgUrl = objectData.primaryImage;
  var index = myArray.length;
  myArray[index] = {};
  myArray[index]["title"] = currentTitle;
  myArray[index]["date"] = currentDate;
  myArray[index]["image"] = imgUrl;

}

function addToListOfItems(object) {
        let container = document.createElement('div')
        container.className = "container"

        let title = document.createElement('div')
        title.className = "title"
        title.innerHTML = `Title: ${object.title}, Department: ${object.department}`;

        let imgUrl = object.primaryImage;
        let img = document.createElement('img')
        img.src = imgUrl
        img.style.width = "300px"

        container.appendChild(title)
        container.appendChild(img)

        listOfItems.append(container)
}

