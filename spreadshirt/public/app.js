const canvas = document.getElementById('tshirtCanvas');
const ctx = canvas.getContext('2d');
let currentDesign = {
    text: [],
    images: [],
    color: '#ffffff'
};

// Initialize canvas
function initCanvas() {
    ctx.fillStyle = currentDesign.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTshirtOutline();
}

// Draw basic t-shirt outline
function drawTshirtOutline() {
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    // Add t-shirt shape drawing here
    ctx.stroke();
}

// Add text to the design
function addText() {
    const text = document.getElementById('textInput').value;
    if (text) {
        currentDesign.text.push({
            content: text,
            x: canvas.width / 2,
            y: canvas.height / 2
        });
        renderDesign();
    }
}

// Handle image upload
document.getElementById('uploadImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                currentDesign.images.push({
                    image: img,
                    x: canvas.width / 2 - img.width / 2,
                    y: canvas.height / 2 - img.height / 2
                });
                renderDesign();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle color changes
document.getElementById('colorPicker').addEventListener('change', function(e) {
    currentDesign.color = e.target.value;
    renderDesign();
});

// Render the current design
function renderDesign() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initCanvas();
    
    // Render images
    currentDesign.images.forEach(img => {
        ctx.drawImage(img.image, img.x, img.y);
    });
    
    // Render text
    currentDesign.text.forEach(text => {
        ctx.fillStyle = '#000000';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text.content, text.x, text.y);
    });
}

// Save the design
function saveDesign() {
    try {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'tshirt-design.png';
        link.href = dataURL;
        link.click();
    } catch (error) {
        console.error('Error saving design:', error);
        alert('Failed to save design. Please try again.');
    }
}

// Initialize the canvas when the page loads
initCanvas();
