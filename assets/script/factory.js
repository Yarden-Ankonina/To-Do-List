const DUMMY = {
    title: 'Text here',
    label: 'Label here',
    placeholder: 'Placeholder here'
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

function PopupBase(object) {
    this.HTML = createSection();
    this.HTML.appendChild(createButton());
    this.HTML.appendChild(createP(object.title));
    this.HTML.style.display = 'flex';

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
    this.HTML = new PopupBase(object).HTML;
    this.HTML.appendChild(createForm(object.label, object.placeholder));

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
}

function SelectTextInputPopup(object) {
    this.HTML = new TextInputPopup(object).HTML;

    const parentNode = this.HTML.querySelector('.popup-form');
    const newNode = createSelect();
    const referenceNode = this.HTML.querySelector('.popup-form-submit');
    parentNode.insertBefore(newNode, referenceNode);
    // console.log('from SelectTextInputPopup', this.HTML);

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
    this.HTML = new PopupBase(object).HTML;
    this.HTML.classList.add('delete-popup');
    this.HTML.appendChild(createAnswers());

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

function PopupFactory() {
    this.create = (type) => {
        switch (type) {
            case 'yesNo':
                return new YesNoPopup(DELETE_TASK).HTML;
                break;
            case 'editTask':
                return new SelectTextInputPopup(EDIT_TASK).HTML;
                break;
            case 'firstTime':
                return new TextInputPopup(DUMMY).HTML;
                break;
            case 'editList':
                return new TextInputPopup(EDIT_LIST).HTML;
                break;
            case 'addList':
                return new TextInputPopup(DUMMY).HTML;
                break;
        }
    }
}

export { PopupFactory };

// [{"title":"שדגשדג","priority":"1","id":"1587456913000"},{"title":"2234Sס","priority":"3","id":"1587456936000"},{"title":"דד","priority":"2","id":"1587456933000"}]