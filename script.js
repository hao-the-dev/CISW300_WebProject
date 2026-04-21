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

// Supabase client setup //
const SUPABASE_URL = 'https://zrgbbcrbmlpbwziyfjhn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZvMlt5toiMdUOn6fEmRAWQ_KuWmgFnw';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const mentorshipForm = document.getElementById('mentorship-form');

async function mentorshipFormSubmit(event) {
    event.preventDefault(); // This is the most important line!
    // Grab the values from your inputs
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const addressValue = document.getElementById('address').value;
    const countyValue = document.getElementById('county').value;
    const cityValue = document.getElementById('city').value;
    const zipValue = document.getElementById('zip').value;
    const supportTypeValue = Array.from(document.querySelectorAll('input[name="support_type"]:checked')).map(checkbox => checkbox.value);
    const requestTypeValue = document.querySelector('input[name="request_type"]:checked')?.value || "None Selected";
    const helpAreasValue = Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(checkbox => checkbox.value);
    const interestedProgramValue = document.getElementById('program').value;
    const educationLevelValue = document.getElementById('level').value;
    const urgencyValue = document.querySelector('input[name="urgency"]:checked')?.value || "None Selected";
    const deadlineValue = document.getElementById('deadline').value;
    const referralValue = document.getElementById('referral').value;
    const commentValue = document.getElementById('comments').value;

    // Send the data to your "form_submissions" table
    const { data, error } = await supabaseClient
        .from('mentorshipForm') 
        .insert([{ 
            Name: nameValue,
            Email: emailValue,
            Address: addressValue,
            County: countyValue,
            City: cityValue,
            Zipcode: zipValue,
            Support_Type: supportTypeValue,
            Request_Type: requestTypeValue,
            Help_Areas: helpAreasValue,
            Interested_Program: interestedProgramValue,
            Education_Level: educationLevelValue,
            Urgency: urgencyValue,
            Deadline: deadlineValue,
            Referral: referralValue,
            Comment: commentValue


        }]);

    if (error) {
        console.error("Error sending to cloud:", error.message);
        alert("Upload failed.");
    } else {
        event.target.reset(); 
    }
}