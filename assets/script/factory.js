function PopupBase(object) {
    const element = createSection();
    element.appendChild(createButton());
    element.appendChild(createP(object.title));
    element.style.display = 'flex';
    return element;
    function createSection() {
        const section = document.createElement('section');
        section.className = 'popup';
        return section;
    }
    function createButton() {
        const button = document.createElement('button');
        button.className = 'popup-exit';
        button.innerText = 'x';
        return button;
    }
    function createP(text) {
        const title = document.createElement('p');
        title.className = 'popup-title';
        title.innerText = text;
        return title;
    }
}

function TextInputPopup(object) {
    const element = PopupBase(object);
    element.appendChild(createForm(object.label, object.placeholder));

    function createForm(label, placeholder) {
        const form = document.createElement('form');
        form.className = 'popup-form';
        form.setAttribute('autocomplete', 'off');
        form.appendChild(createLabel(label));
        form.appendChild(createInput(placeholder));
        form.appendChild(createButton());
        return form;
    }
    function createLabel(labelText) {
        const label = document.createElement('label');
        label.setAttribute('for', 'form-input');
        label.innerText = labelText;
        return label;
    }
    function createInput(placeholderText) {
        const input = document.createElement('input');
        input.id = 'form-input';
        input.className = 'popup-form-input';
        input.name = 'title';
        input.maxLength = '20';
        input.placeholder = placeholderText;
        input.setAttribute('required', 'true');
        return input;
    }
    function createButton() {
        const button = document.createElement('button');
        button.className = 'popup-form-submit';
        button.type = 'submit';
        button.innerText = 'SAVE';
        return button;
    }
    return element;
}

function SelectTextInputPopup(object) {
    const element = TextInputPopup(object);

    const parentNode = element.querySelector('.popup-form');
    const newNode = createSelect();
    const referenceNode = element.querySelector('.popup-form-submit');
    parentNode.insertBefore(newNode, referenceNode);
    return element;

    function createSelect() {
        const select = document.createElement('select');
        select.id = "todoForm-priority-select";
        for (let i = 0; i < 3; i++) {
            select.appendChild(createOption(i + 1));
        }
        return select;
    }
    function createOption(i) {
        const option = document.createElement('option');
        option.className = "main-content-forms-todoForm-selector-option";
        option.value = i;
        option.innerText = i;
        return option;
    }
}

function YesNoPopup(object) {
    const element = PopupBase(object);
    element.classList.add('delete-popup');
    element.appendChild(createAnswers());
    return element;

    function createAnswers() {
        const div = document.createElement('div');
        div.className = 'popup-answer';
        div.appendChild(createButton('yes'));
        div.appendChild(createButton('no'));
        return div;
    }
    function createButton(option) {
        const button = document.createElement('button');
        button.className = `popup-answer-btn ${option}`;
        button.innerText = option;
        return button;
    }
}

function popupFactory(type) {
    const ADD_LIST = {
        title: 'Add Todo List',
        label: 'Create a new todo list category',
        placeholder: 'Name your new todo list'
    };
    const DELETE_TASK = { title: 'Are You Sure You Want To Delete?' };
    const EDIT_TASK = {
        title: 'Text EDIT_TASK',
        label: 'Label here',
        placeholder: 'Placeholder here'
    }
    const EDIT_LIST = {
        title: 'Text EDIT_LIST',
        label: 'Label EDIT_LIST',
        placeholder: 'Placeholder EDIT_LIST'
    }
    switch (type) {
        case 'yesNo':
            return YesNoPopup(DELETE_TASK);
            break;
        case 'editTask':
            return SelectTextInputPopup(EDIT_TASK);
            break;
        case 'firstTime':
            return TextInputPopup(DUMMY);
            break;
        case 'editList':
            return TextInputPopup(EDIT_LIST);
            break;
        case 'addList':
            return TextInputPopup(ADD_LIST);
            break;
    }
}

export { popupFactory };

