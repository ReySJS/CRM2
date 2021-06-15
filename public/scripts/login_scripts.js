$(document).ready(() => {
    const url = 'http://127.0.0.1:3000'

    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////Function to display the Login screen/////////////////////////////
    $("#show-login-btn").on('click', () => {
        $("#login-return").html('');
        $('#registration-screen').addClass('hide');
        $('#login-screen').removeClass('hide');
    });
    //////////////////////////Function to display the Login screen/////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////Function to display the user registration screen///////////////////////
    $("#show-register-btn").on('click', () => {
        $(".user-input").val('');
        $(".user-input").removeClass('input-error');
        $("#registration-return").html('');
        $('#login-screen').addClass('hide');
        $('#registration-screen').removeClass('hide');
    });
    ////////////////////Function to display the user registration screen///////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////Function to login user///////////////////////////////////
    $("#login-btn").on('click', () => {

        $(".login-input").removeClass('input-error');

        const inputsLogin = $(".login-input");
        const userLogin = {};
        userLogin["name"] = $("#name-input-login").val().toLowerCase();
        userLogin["password"] = $("#password-input-login").val();
        if (validator.validateLogin(userLogin, inputsLogin)) {

            $("#login-return").html('⌛');

            fetch(`${url}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userLogin)
            })
                .then(response => response.json())
                .then(res => {
                    $("#login-return").html('Login successfully');
                    $("#login-return").css('color', '#00917c')
                    $(".user-input").val('');
                })
                .catch(err => {
                    console.log(err)
                    $("#login-return").html('Username and password not found');
                    $("#login-return").css('color', '#c13838')
                });
        } else {
            $("#login-return").html('Enter username and password')
            $("#login-return").css('color', '#c13838')
        }
    });
    //////////////////////////////////Function to login user///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////Function to register new user////////////////////////////////
    $("#register-btn").on('click', () => {

        $(".registration-input").removeClass('input-error');

        const inputsRegistration = $(".registration-input");
        const newUser = {};
        newUser["name"] = $("#name-input-user").val().toLowerCase();
        newUser["email1"] = $("#email1-input-user").val().toLowerCase();
        newUser["email2"] = $("#email2-input-user").val().toLowerCase();
        newUser["phone"] = $("#phone-input-user").val();
        newUser["cep"] = $("#cep-input-user").val();
        newUser["street"] = $("#street-input-user").val();
        newUser["number"] = $("#number-input-user").val();
        newUser["district"] = $("#district-input-user").val();
        newUser["city"] = $("#city-input-user").val();
        newUser["state"] = $("#state-input-user").val();
        newUser["password1"] = $("#password1-input-user").val();
        newUser["password2"] = $("#password2-input-user").val();

        if (validator.validateRegistration(newUser, inputsRegistration)) {

            fetch(`${url}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            }).then(response => response.text())
                .then(res => {
                    console.log(res);
                    $("#registration-return").html('User Successfully Registered');
                    $("#registration-return").css('color', '#00917c')
                    $(".user-input").val('');
                    $(".user-input").removeClass('input-error');
                })
                .catch(error => {
                    console.log(error);
                    $("#registration-return").html(error);
                    $("#registration-return").css('color', '#c13838')
                });
        }
        else {
            $("#registration-return").html('Enter the Data for Registration')
            $("#registration-return").css('color', '#c13838')
        }
    });
    //////////////////////////////Function to register new user////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////Function to show map////////////////////////////////////
    $("#cep-input-user").on('blur', () => {

        const searchedCep = $("#cep-input-user").val().replace('-', '')
        const searchedUrl = `https://cep.awesomeapi.com.br/json/${searchedCep}`
        $("#map-content").html('⌛');
        fetch(searchedUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(res => {
                let latitude = Number(res.lat);
                let longitude = Number(res.lng);
                let mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&ie=UTF8&iwloc=&output=embed`
                $("#street-input-user").val(res.address);
                $("#district-input-user").val(res.district);
                $("#city-input-user").val(res.city);
                $("#state-input-user").val(res.state);
                $("#adress-map").attr('src', mapUrl);
                $("#map-content").html(`<iframe src="${mapUrl}" id="adress-map" frameborder="1" style="border:1" allowfullscreen></iframe>`)
            })
            .catch(error => console.log(error))
            .catch(error => {
                $(".readonly").removeAttr("readonly");
                $(".readonly").removeClass("readonly");
            })
        // .then(() => {
        // })
    });
    ///////////////////////////////////Function to show map////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
});