const form = document.getElementById('generate-form')
const qr = document.getElementById('qr-code')

// Función que se ejecuta al enviar el formulario
const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    console.log(url, size)

    if(url !== '') {
        showSpinner();
        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000)
    }
}

// Función para generar el código QR
const generateQRCode = (url, size) => {
    
    const fixedSize = 250;

    const qrcode = new QRCode('qr-code', {
      text: url,
      width: fixedSize,
      height: fixedSize,
    });
}

// Función para mostrar el spinner de carga
const showSpinner = () => {
    document.getElementById('loader').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    setTimeout(() => {
        document.getElementById('qr-code').style.display = 'block';
      }, 1000); 
}

// Función para ocultar el spinner de carga
const hideSpinner = () => {
    document.getElementById('loader').style.display = 'none';
}

// Función para limpiar la interfaz de usuario
const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if(saveLink) {
        saveLink.remove();
        document.getElementById('qr-code').style.display = 'none';
    }
}

// Función para crear el botón de guardar imagen
const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList.add('link');
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
  
    link.addEventListener('click', function() {
      // Obtener el tamaño seleccionado del formulario
      const selectedSize = document.getElementById('size').value; 
  
      // Redimensionar el QR code descargado al tamaño seleccionado en el formulario
      link.href = resizeImage(saveUrl, selectedSize, selectedSize);
  
      document.getElementById('qr-code').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.getElementById('url').value = '';
      document.getElementById('size').value = 300;
    });
  
    document.getElementById('qr-code').appendChild(link);
  };
  
  // Función para redimensionar la imagen del QR
  const resizeImage = (imageUrl, newWidth, newHeight) => {
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const context = canvas.getContext('2d');
  
    const image = new Image();
    image.src = imageUrl;
    context.drawImage(image, 0, 0, newWidth, newHeight);
  
    return canvas.toDataURL();
  };
  

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);

// Agregar evento de clic al documento
document.addEventListener('click', function(event) {
    const qrCode = document.getElementById('qr-code');
  
    // Verificar si el objetivo del clic no es el elemento #qr-code ni uno de sus descendientes
    if (!qrCode.contains(event.target)) {
      // Ocultar el elemento #qr-code
      qrCode.style.display = 'none'; 
      document.querySelector('.overlay').style.display = 'none';

    }
  });


// Agregar evento de desplazamiento al documento
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    var scrolled = window.scrollY > 0;
    
    if (scrolled) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });
