import modals from "./modules/modals";
import mask from "./modules/mask";
import forms from "./modules/form";

import {
    headerAnim,
    navigationAnim,
    sectionScrollAnim,
    contentInSectionsAnim,
    sectionsTitleAnim,
    flipCardAnim,
    contactsAnim,
    scrollToContacts
} from "./modules/animations"

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    modals();
    mask('[name="phone"]');
    forms();

    headerAnim();
    navigationAnim();
    sectionScrollAnim();
    sectionsTitleAnim();
    contentInSectionsAnim();
    flipCardAnim();
    contactsAnim();
    scrollToContacts();
});