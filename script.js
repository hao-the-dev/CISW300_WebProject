window.onload = function() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
                const logo = "myImages/OIP-4278803273.jpg";
                document.getElementById("logo").src = logo;
            })
            .catch(err => console.error("Could not load navbar:", err));
    }
};


