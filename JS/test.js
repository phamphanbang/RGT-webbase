const getAllData = () => {
fetch('http://localhost:3000/product')
  .then(response => response.json())
  .then(data => console.log(data));
}

getAllData();
