import {sendData} from "./service/sendData";
import {validateFormData} from "./service/validationHelper";

import rules from "./service/validationRules";

import {gsap} from "gsap";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        reqLoad = document.querySelector('.spinner'),
        reqOk = document.querySelector('.ok'),
        reqFail = document.querySelector('.fail'),
        reqText = document.querySelector('.req-text'),
        close = document.querySelector(".modal-close");

    const api = "./tgMailer/send-message-to-telegram.php";

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
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
                    const tl = gsap.timeline({
                        paused: true,
                        defaults: {
                            delay: 3
                        }
                    })
                    tl
                        .to(".req-process", {
                            left: 0,
                            duration: 0.01,
                            delay: 0
                        })
                        .to(".req-process", {
                            ease: "power1",
                            opacity: 1,
                            duration: 0.2,
                            delay: 0
                        })
                    reqText.innerHTML = "Подождите немножко)";
                    reqLoad.style.display = "block";
                    tl.play();

                    sendData(api, item)
                        .then(res => {
                            reqText.innerHTML = "Заявка отправлена успешно!)"
                            reqLoad.style.display = "none";
                            reqOk.style.display = "block";
                        })
                        .catch((error) => {
                            reqLoad.style.display = "none";
                            reqFail.style.display = "block";
                            reqText.innerHTML = "Что-то пошло не так... Перезагрузите страничку"
                        })
                        .finally(() => {
                            setTimeout(()=>{
                                tl.reverse()
                            }, 3200)
                            setTimeout(()=>{
                                reqLoad.style.display = "block";
                                reqOk.style.display = "none";
                                reqFail.style.display = "none";
                                reqText.innerHTML = ""
                                clearInputs();
                                close.click();
                            }, 3300)
                        });
                } else {
                    inputs.forEach(input => {
                        input.removeEventListener("input", afterFirstSubmitValidation);
                    })


                    inputs.forEach(input => {
                        input.addEventListener("input", afterFirstSubmitValidation);
                    })
                }
            });
        });
    }

    submitHandler();
}

export default forms;