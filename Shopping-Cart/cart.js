// Variables

const cart = document.querySelector('#cart');
const cartContainer = document.querySelector('#cart-list tbody');
const cleanCart = document.querySelector('#clean-cart');
const listCourse = document.querySelector('#course-list');
let cartArticles = [];


const addEventsListener = () => {

    //Add a course to the cart by pressing the ADD TO CART button
    listCourse.addEventListener('click', addCouse);

    //Remove courses from the cart
    cart.addEventListener('click', deleteCourse);

    //Show the courses from localStorage
    document.addEventListener('DOMContentLoaded', () => {
        cartArticles = JSON.parse(localStorage.getItem('carrito')) || []
        addToCart()
    })

    //Clean the cart

    cleanCart.addEventListener('click', () => {
        //reset the array
        cartArticles = [];

        cleanHtml();
    })
}

//Function thad adds the courses to the cart
const addCouse = (e) => {
    e.preventDefault();

    if (e.target.classList.contains('add-cart')) {
        const selectedCourse = e.target.parentElement.parentElement
        readContent(selectedCourse);
    }
}

//Function thar removes courses from the cart
const deleteCourse = (e) => {
    if (e.target.classList.contains('delete-course')) {
        const idCourse = e.target.getAttribute('data-id');

        //Delete from the cartArticles for the data-id
        cartArticles = cartArticles.filter( course => course.id !== idCourse);

        addToCart();
    }
}

addEventsListener();

//Function that reads the HTML content of the element we clicked on and extract the course information 
const readContent = (course) => {
  
    // Object with the information of the current course
    const courseInfo = {
        image: course.querySelector('img').src,
        name: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        quantity: 1
    }

    //Check if an course already exists in de cart
    const exists = cartArticles.some( course => course.id === courseInfo.id );

    if (exists) {
        //Update the quantity
        const courses = cartArticles.map( course => {
            if (course.id === courseInfo.id) {
                course.quantity++;
                return course;
            } else {
                return course;
            }
        });
        cartArticles = [...courses];

    } else {
        // Add elements to cart array
        cartArticles = [...cartArticles, courseInfo];
    }
    addToCart();
}

//Function that show the shopping cart in the HTML
const addToCart = () => {

    //Clean the HTML
    cleanHtml();
    
    //Go through the cart and generate the HTML
    cartArticles.forEach(element => {
        const { image, name, price, quantity, id } = element;
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src='${image}' width='100'>
        </td
        <td>${name}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>
            <a href="#" class="delete-course" data-id="${id}"> X </a>
        </td>
        `;

        //Add cart HTML to tbody
        cartContainer.appendChild(row);
    })

    //Add shopping cart to Storage
    storageSynchronize()
}

//Function that add the cart to the LocalStorage
function storageSynchronize() {
    localStorage.setItem('carrito', JSON.stringify(cartArticles))
}

//Function that remove courses from the tbody
const cleanHtml = () => {
    cartContainer.innerHTML = '';
}

