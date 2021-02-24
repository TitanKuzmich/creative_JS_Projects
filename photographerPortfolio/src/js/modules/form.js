const forms = () => {
    const form = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: {
                    required: true,
                    minlength: 18
                },
                email: {
                    required: true,
                    email: true,
                    minlength: 5
                }
            },
            messages:{
                name: "Пожалуйста, введите свое имя",
                phone: {
                    required: "Пожалуйста, введите номер телефона",
                    minlength: "Номер должен состоять из 11 цифр"
                },
                email:{
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты",
                    minlength: "Адрес должен быть не менее, чем из 5-ти символов"
                }
            },
            submitHandler: function () {
                form.forEach(item => {
                    item.addEventListener('submit', (e) => {
                        e.preventDefault();
                        console.log(item);
                        let statusMessage = document.createElement('div');
                        statusMessage.classList.add('status');
                        item.parentNode.appendChild(statusMessage);

                        let statusImg = document.createElement('img');
                        let textMessage = document.createElement('div');

                        item.classList.add('animated', 'fadeOutUp');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);

                        $.ajax({
                            type: "POST",
                            url: "mailer/smart.php",
                            data: $(item).serialize(),
                            beforeSend: () => {

                                statusImg.setAttribute('src', message.spinner);
                                statusImg.classList.add('animated', 'fadeInUp');
                                statusMessage.appendChild(statusImg);

                                textMessage.textContent = message.loading;
                                statusMessage.appendChild(textMessage);
                            },
                            error: () => {
                                statusImg.setAttribute('src', message.fail);
                                textMessage.textContent = message.failure;
                            },
                            success: () => {
                                statusImg.setAttribute('src', message.ok);
                                textMessage.textContent = message.success;
                            }
                        }).done(function () {
                            $(item).find("input").val("");
                            $(item).trigger('reset');
                        });

                        return false;
                    });
                });
            }
        });
    }

    validateForms(form);
}

export default forms;