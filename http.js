function sendJSON(){

            let result = document.querySelector('.result');
            let comment = document.querySelector('#comment');
            let email = document.querySelector('#email');
            let sendTime = document.querySelector('#sendTime');
            // Creating a XHR object
            let xhr = new XMLHttpRequest();
            let url = "http://localhost:8080/emails";

            // open a connection
            xhr.open("POST", url, true);

            // Set the request header i.e. which type of content you are sending
            xhr.setRequestHeader("Content-Type", "application/json");

            // Create a state change callback
//            xhr.onreadystatechange = function () {
//                if (xhr.status === 202) {
//
//                    // Print received data from server
//
//
//                }
//            };

            // Converting JSON data to string
            var data = JSON.stringify({ "text": comment.value, "emailAddress": email.value ,"sendTime": sendTime.value});

            // Sending data with the request
            xhr.send(data);
        }