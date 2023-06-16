let myLibrary = [];

function Book(title, genre, author, pages, read){
    //book constructor
    this.title = title
    this.genre = genre
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, genre, author, pages, read){
    // takes user input
    // translates it into a book object
    let new_book = new Book(title, genre, author, pages, read)
    // add to my library
    myLibrary.push(new_book)
}

// add two sample books
addBookToLibrary("fake book 1", "autobiography", "kev", 12, false)
addBookToLibrary("fake book 2", "novel", "jake", 412, false)

// add book to table 
function displayBooks(){
    // for each book in library
    for (i=0; i<myLibrary.length; i++){
        // create a table row (tr)
        row = document.createElement('tr')
        console.log(myLibrary[i])
            // for each book descriptor 
            for (j in myLibrary[i]){
                if (j == "read"){//we want read to be a button
                    continue
                }
                // create a row cell (td)
                cell = document.createElement('td')
                // add the descriptor to the td body
                cell.textContent = myLibrary[i][j]
                // add the td to the tr
                row.appendChild(cell)

                console.log(j) // key
                // console.log(myLibrary[i][j]) // value
            }
            // add read button
            readButton = document.createElement('button')
            readButton.textContent='read'

            readCell = document.createElement('td')
            readCell.appendChild(readButton)
            row.append(readCell)

            // add delete button
            delButton = document.createElement('button')
            delButton.textContent = 'delete'
            delButton.setAttribute("id", `delete-button-${i}`)
            delButton.addEventListener('click', () =>{
                console.log("test")
                // remove from array based on index
                myLibrary.pop(i)

                deleteBooks()

                // add elements back into tbody
                displayBooks()           
            })
            delCell = document.createElement('td')
            delCell.appendChild(delButton)

            row.appendChild(delCell)


        // add the table row to the table
        table = document.querySelector("tbody")
        table.appendChild(row)
    }
    console.log(table)
}

function deleteBooks(){
    // remove all rows from display
    let rows = document.querySelectorAll('tbody>tr')
    rows.forEach(row => {
        row.remove();
    });
}

// prevent submit default on button click
const submitButton = document.querySelector("#submit-button")

submitButton.addEventListener("click", submitClick, false)
// alternative behavior function
function submitClick(event) {
    // prevent default
    event.preventDefault();
    // add new values to array
    let title = document.getElementById("title").value
    let genre = document.getElementById("genre").value
    let author = document.getElementById("author").value
    let pages = document.getElementById("pages").value
    let read = document.getElementById("read").value

    addBookToLibrary(title, genre, author, pages, read);
    // clear form
    document.getElementsByClassName("add-book-form")[0].reset();
    
    // remove all rows
    deleteBooks()

    // add elements back into tbody
    displayBooks()
}



displayBooks()