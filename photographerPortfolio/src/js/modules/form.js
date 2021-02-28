import {sendData} from "./service/sendData";
import {validateFormData} from "./service/validationHelper";

import rules from "./service/validationRules";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    const api = "./tgMailer/send-message-to-telegram.php";

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    function submitHandler () {
        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                const formInputs = item.querySelectorAll(".form-input");
                let data = {};

                formInputs.forEach(input => {
                    data[input.getAttribute("name")] = `${input.value}`;
                })

                let validation = {};

                const setInputsError = (validation) => {
                    inputs.forEach(input => {
                        if(!Object.keys(validation.errors).length){
                            input.nextElementSibling.innerHTML = "";
                        }

                        Object.keys(validation.errors).forEach(errorCategory => {
                            if(input.getAttribute("name") === errorCategory){
                                input.nextElementSibling.innerHTML = `${validation.errors[errorCategory]}`
                            }
                        })
                    })
                }

                const afterFirstSubmitValidation = () => {
                    formInputs.forEach(input => {
                        data[input.getAttribute("name")] = `${input.value}`;
                    })

                    validation = validateFormData(data, rules);

                    setInputsError(validation);
                }

                afterFirstSubmitValidation();

                if (!Object.keys(validation.errors).length){
                    console.log("everything is ok)")

                    sendData(api, data)
                        .then(res => {
                            console.log(res);
                            // statusImg.setAttribute('src', message.ok);
                            // textMessage.textContent = message.success;
                        })
                        .catch((error) => {
                            console.log(error);
                            // statusImg.setAttribute('src', message.fail);
                            // textMessage.textContent = message.failure;
                        })
                        .finally(() => {
                            clearInputs();
                            // setTimeout(() => {
                            //     statusMessage.remove();
                            //     item.style.display = 'block';
                            //     item.classList.remove('fadeOutUp');
                            //     item.classList.add('fadeInUp');
                            // }, 5000);
                        });
                } else {
                    inputs.forEach(input => {
                        input.removeEventListener("input", afterFirstSubmitValidation);
                    })


                    inputs.forEach(input => {
                        input.addEventListener("input", afterFirstSubmitValidation);
                    })
                }

                // let statusMessage = document.createElement('div');
                // statusMessage.classList.add('status');
                // item.parentNode.appendChild(statusMessage);
                //
                // let statusImg = document.createElement('img');
                // let textMessage = document.createElement('div');
                //
                // item.classList.add('animated', 'fadeOutUp');
                // setTimeout(() => {
                //     item.style.display = 'none';
                // }, 400);

                // $.ajax({
                //     type: "POST",
                //     url: "mailer/smart.php",
                //     data: $(item).serialize(),
                //     beforeSend: () => {
                //
                //         statusImg.setAttribute('src', message.spinner);
                //         statusImg.classList.add('animated', 'fadeInUp');
                //         statusMessage.appendChild(statusImg);
                //
                //         textMessage.textContent = message.loading;
                //         statusMessage.appendChild(textMessage);
                //     },
                //     error: () => {
                //         statusImg.setAttribute('src', message.fail);
                //         textMessage.textContent = message.failure;
                //     },
                //     success: () => {
                //         statusImg.setAttribute('src', message.ok);
                //         textMessage.textContent = message.success;
                //     }
                // }).done(function () {
                //     $(item).find("input").val("");
                //     $(item).trigger('reset');
                // });
            });
        });
    }

    submitHandler();
}

export default forms;