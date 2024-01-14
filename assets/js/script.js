  const form = document.getElementById('generate-form')
  const qr = document.getElementById('qr-code')

  // Function that is executed when the form is submitted
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

  // Function to generate the QR code
  const generateQRCode = (url, size) => {
      
      const fixedSize = 250;

      const qrcode = new QRCode('qr-code', {
        text: url,
        width: fixedSize,
        height: fixedSize,
      });
  }

  // Function to show the loading spinner
  const showSpinner = () => {
      document.getElementById('loader').style.display = 'block';
      document.querySelector('.overlay').style.display = 'block';
      setTimeout(() => {
          document.getElementById('qr-code').style.display = 'block';
        }, 1000); 
  }

  // Function to hide the loading spinner
  const hideSpinner = () => {
      document.getElementById('loader').style.display = 'none';
  }

  // Function to clean up the user interface
  const clearUI = () => {
      qr.innerHTML = '';
      const saveLink = document.getElementById('save-link');
      if(saveLink) {
          saveLink.remove();
          document.getElementById('qr-code').style.display = 'none';
      }
  }

  // Function to create the save image button
  const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList.add('link');
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
  
    link.addEventListener('click', function() {
      // Get the selected size of the form
      const selectedSize = document.getElementById('size').value; 
  
      // Resize the downloaded QR code to the size selected in the form
      link.href = resizeImage(saveUrl, selectedSize, selectedSize);
  
      document.getElementById('qr-code').style.display = 'none';
      document.querySelector('.overlay').style.display = 'none';
      document.getElementById('url').value = '';
      document.getElementById('size').value = 300;
    });
  
    document.getElementById('qr-code').appendChild(link);
  };
  
  // Function to resize the QR image
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

  // Add click event to document
  document.addEventListener('click', function(event) {
      const qrCode = document.getElementById('qr-code');
  
    // Check if the target of the click is not the #qr-code element or one of its descendants
    if (!qrCode.contains(event.target)) {
      // Hide the #qr-code element
      qrCode.style.display = 'none'; 
      document.querySelector('.overlay').style.display = 'none';

    }
  });


  // Add scroll event to document
  window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    var scrolled = window.scrollY > 0;
    
    if (scrolled) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });
