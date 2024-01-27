// CSS styles for the GUI
var guiStyles = `
<style>
  .gui {
    position: fixed;
    top: 50px;
    left: 50px;
    border: 5px solid #a5bc50; /* Change border color */
    background-color: #f4cc43;
    border-radius: 5px; /* Change border radius */
    padding: 5px; /* Add padding */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: zoomIn 0.5s;
  }

  .gui button {
    border: none;
    border-radius: 5px; /* Change border radius */
    background-color: #176baa;
    color: white;
    font-family: Lato, sans-serif;
    font-weight: bold;
    font-size: 16px; /* Decrease font size */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
    margin: 5px; /* Decrease margin */
    padding: 5px 10px; /* Add padding */
  }

  .gui button:hover {
    animation: bounce 0.5s;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }

  .gui.scrollable {
    max-height: 200px; /* Add max-height */
    overflow-y: auto; /* Add scroll bar */
  }

  .gui.with-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Add shadow */
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes zoomIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes zoomOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
`;

// Create the GUI element
var gui = document.createElement('div');
gui.classList.add('gui');
document.body.appendChild(gui);

// Apply the CSS styles to the GUI element
gui.innerHTML = guiStyles;

// Function to hide the GUI
function hideGUI() {
  gui.style.animation = 'zoomOut 0.5s';
  setTimeout(function() {
    gui.style.display = 'none';
  }, 500);
}

// Function to show the GUI
function showGUI() {
  gui.style.display = 'flex';
  gui.style.animation = 'zoomIn 0.5s';
}

// Function to toggle the GUI visibility on single press of the panic key
var panicKeyTimeout;
var guiOnScreen = false; // Track if GUI is already on screen
function toggleGUI() {
  if (guiOnScreen) {
    return;
  }
  
  panicKeyTimeout = setTimeout(function() {
    guiOnScreen = false;
  }, 500);
  
  if (gui.style.display === 'none') {
    showGUI();
  } else {
    hideGUI();
  }
  guiOnScreen = true; // Move this line here
}

// Add event listener for the panic key
document.addEventListener('keydown', function(event) {
  if (event.key === '`') {
    toggleGUI();
  }
});

// Function to prompt for bookmarklet name and code
function addBookmarklet() {
  var name = prompt('What will be the name of the bookmarklet?');
  var code = prompt('What\'s the code of the bookmarklet?');
  if (name && code && name.length >= 3 && name.length <= 20) {
    var button = document.createElement('button');
    button.textContent = name;
    button.addEventListener('click', function() {
      eval(code);
    });
    gui.appendChild(button);
    if (gui.scrollHeight > 200) {
      gui.classList.add('scrollable');
    }
  } else {
    alert('Invalid input. Please try again.');
  }
}

// Create the "Add a bookmarklet" button
var addButton = document.createElement('button');
addButton.textContent = 'Add a bookmarklet';
addButton.addEventListener('click', addBookmarklet);
gui.appendChild(addButton);

// Create the text below the bookmarklets
var panicKeyText = document.createElement('p');
panicKeyText.textContent = 'Press ` to close/open the GUI!';
gui.appendChild(panicKeyText);

// Function to generate the GUI code
/// Function to generate the GUI code
function generateGUI() {
  var guiName = prompt('What would you like to call the GUI?');
  var guiType = prompt('Would you like the GUI as a bookmarklet, or plain code?', 'Bookmarklet or Plain GUI');
  var guiCode = encodeURIComponent(gui.outerHTML);
  if (guiType.toLowerCase() === 'bookmarklet') {
    var bookmarkletCode = 'javascript:(function(){' + decodeURIComponent(guiCode) + '})();';
    alert('Drag the button to your bookmarks bar');
    var link = document.createElement('a');
    link.href = bookmarkletCode;
    link.innerHTML = 'Drag this button to your bookmarks bar';
    link.draggable = true; // Make the button draggable
    gui.appendChild(link);
  } else if (guiType.toLowerCase() === 'plain gui') {
    alert('Copy the plain GUI code from the prompt.');
    prompt('Copy this code:', gui.outerHTML);
  } else {
    alert('Invalid input. Please try again.');
  }
}

// Create the "Code for the gui" button
var codeForGuiButton = document.createElement('button');
codeForGuiButton.textContent = 'Code for the gui';
codeForGuiButton.addEventListener('click', generateGUI);
gui.appendChild(codeForGuiButton);

