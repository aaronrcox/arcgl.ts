
import  'reflect-metadata';
import './dark.scss';

import marked = require('marked');


export enum PropElementType {
    INPUT,
    DROPDOWN,
    BUTTON,
    OBJECT,
    ARRAY,
    MARKDOWN
}

interface IPropOptions
{
    label?: string;
    tooltip?: string;
    description?: string;
    dropdown_enum_options?: {[key: string]: string | number};
    dropdown_options?: any[];
    type?: PropElementType;
    inputType?: string;
    onChange?: (oldValue: any, newValue: any)=>void;
}

interface IPropData 
{
    parent: Object;
    key: any;
    dataType: string;
    options: IPropOptions;
}

// for an <input type='xxxx' />
// based on the type, this lookup returns the method that
// should be used for retriving the value
const inputTypeValueLookup: {[key: string]: string} = {
    text: 'value',
    date: 'valueAsDate',
    number: 'valueAsNumber',
    checkbox: 'checked'
}

// for a given data type, we want to know which type to use
// for an <input type="xxxx" />
const dataTypeInputTypeLookup: {[key: string]: string} = {
    String: 'text',
    Date: 'date',
    Number: 'number',
    Boolean: 'checkbox',
}

// for a given data type, we want to know what our default builder function should be.
const dataTypeElementTypeLookup: {[key: string]: PropElementType} = {
    Function:   PropElementType.BUTTON,
    String:     PropElementType.INPUT,
    Date:       PropElementType.INPUT,
    Number:     PropElementType.INPUT,
    Boolean:    PropElementType.INPUT,
    Array:      PropElementType.ARRAY,
    Object:     PropElementType.OBJECT
}

export function editable(options: IPropOptions = {}): PropertyDecorator {

    // If we specify dropdown_enum_options
    // than we are automaticly assuming this is a dropdown menu
    if(options.dropdown_enum_options) {
        options.dropdown_options = Object.keys(options.dropdown_enum_options)
        .filter(key => isNaN(Number(key)))
        .map((z: string) => ({name: z, value: (options.dropdown_enum_options as any)[z] }));
    }

    // if we have specified dropdown options
    // than change the PropElementType to dropdown
    if(!options.type && options.dropdown_options) {
        options.type = PropElementType.DROPDOWN;
    }

    return function (parent: Object, propertyKey: any) {

        const dataType = Reflect.getMetadata("design:type", parent, propertyKey).name;

        // set default values on the passed in options
        options.type = options.type || dataTypeElementTypeLookup[dataType];
        options.inputType = dataTypeInputTypeLookup[dataType];
        options.label = options.label !== undefined ? options.label : splitToWords(propertyKey);
        options.description = options.description || '';

        const properties: IPropData[] = Reflect.getMetadata("editableProperties", parent) || [];
        if (properties.indexOf(propertyKey) < 0) {
            createChangeProps(parent, propertyKey);
            properties.push({ parent, key: propertyKey, dataType, options });
        }
        Reflect.defineMetadata("editableProperties", properties, parent);
    }
}
// This method creates a getter/setter
// for the provided property, allowing us to listen for changes to the value
function createChangeProps(this: any, parent: Object, propertyKey: any) {
    const key = `__${propertyKey}__`;
    const getter = function(this: any) { return this[key];  }
    const setter = function(this: any, value: any) {
        const oldValue = this[key];
        this[key] = value;

        for(const fn of this[`__on_change_${propertyKey}`] || []) {
            fn(oldValue, value);
        }
    }

    Object.defineProperty(parent, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

function addPropChangeEvent(obj: any, property: string, callback: Function) {
    obj[`__on_change_${property}`] = obj[`__on_change_${property}`] || [];
    obj[`__on_change_${property}`].push(callback);
}

const createInputField = (property: IPropData, obj: any, onFormChange: any) => {
        
    // create the label
    const labelElem = document.createElement("label");
    labelElem.textContent = property.options.label;
    labelElem.htmlFor = property.key;

    // create the description element
    const descriptionElem = document.createElement('span');
    descriptionElem.innerHTML = property.options.description;

    // create the input element
    const inputElem = document.createElement("input") as any;
    const inputType = property.options.inputType;
    inputElem.id = property;
    inputElem.type = inputType;
    inputElem.autocomplete = "off";

    // assign the input element value, using the correct value method
    // from the inputTypeValueLookup table.
    inputElem[inputTypeValueLookup[inputType]] = obj[property.key];

    // listen for change event on the input element, and update the property
    inputElem.addEventListener('input', () => {
        obj[property.key] = inputElem[inputTypeValueLookup[inputType]];
        onFormChange();
    });

    // listen for change events to the value, and update the inputElement
    addPropChangeEvent(obj, property.key, (oldValue: any, newValue: any) => {
        inputElem[inputTypeValueLookup[inputType]] = newValue;
    });

    // create the list item
    const listItemElem = document.createElement('li');
    listItemElem.classList.add(`fb-element-${inputType}`);
    listItemElem.appendChild(labelElem);
    listItemElem.appendChild(inputElem);
    listItemElem.appendChild(descriptionElem);

    return listItemElem;
}

const createSelectField = (property: IPropData, obj: any, onFormChange: any) =>
{
    // create the label
    const labelElem = document.createElement("label");
    labelElem.textContent = property.options.label;
    labelElem.htmlFor = property.key;

    // create the description element
    const descriptionElem = document.createElement('span');
    descriptionElem.innerHTML = property.options.description;

    // create the select element
    const inputElem = document.createElement("select");
    inputElem.id = property.key;
    inputElem.autocomplete = "off";
    inputElem.value = obj[property.key];

    // add the child options elements to the select
    for(const opt of property.options.dropdown_options) {
        const optionElem = document.createElement('option');
        optionElem.value = opt.value;
        optionElem.innerHTML = opt.name;
        inputElem.appendChild(optionElem);
    }

    // listen for value changes on the select input to update the property
    inputElem.addEventListener('input', () => {
        obj[property.key] = inputElem.value;
        onFormChange();
    });

    // listen for changes on the property to update the select element
    addPropChangeEvent(obj, property.key, (oldValue: any, newValue: any) => {
        inputElem.value = newValue;
    });


    // create the list item
    const listItemElem = document.createElement('li');
    listItemElem.classList.add(`fb-element-select`);
    listItemElem.appendChild(labelElem);
    listItemElem.appendChild(inputElem);
    listItemElem.appendChild(descriptionElem);

    return listItemElem;
}

const createMarkdownField = (property: IPropData, obj: any, onFormChange: any) => {

    // create the markdown element
    const markdownElement = document.createElement('div');
    markdownElement.classList.add('markdown');
    markdownElement.innerHTML = marked( escape(obj[property.key]) );

    // listen for changes to the property, and update the inner html
    addPropChangeEvent(obj, property.key, (oldValue: any, newValue: any) => {
        markdownElement.innerHTML = marked( escape(newValue) )
    });

    // create the list item
    const listItemElem = document.createElement('li');
    listItemElem.classList.add(`fb-element-markdown`);
    listItemElem.appendChild(markdownElement);

    return listItemElem;
}

const createButtonField = (property: IPropData, obj: any, onFormChange: any) => {

    // create a button element
    const btn = document.createElement('button');
    btn.innerHTML = property.options.label;

    // listen for button click, and invoke function.
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        obj[property.key]();
    });

    // create the list item
    const listItemElem = document.createElement('li');
    listItemElem.classList.add(`fb-element-button`);
    listItemElem.appendChild(btn);

    return listItemElem;
    
}

const createArrayField = (property: IPropData, obj: any, onFormChange: any) => {

    // create the label
    const labelElem = document.createElement("label");
    labelElem.textContent = property.options.label;
    labelElem.htmlFor = property.key;

    // create the description element
    const descriptionElem = document.createElement('span');
    descriptionElem.innerHTML = property.options.description;

    // create list of dom elements for each item in the array
    const ulElem = document.createElement('ul');

    const buildItemList = (element: any, index: number) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = dataTypeInputTypeLookup[obj[property.key][index].constructor.name];
        input.autocomplete = 'off';
        input.id = `fb-input-${property}-${index}`;
        input.addEventListener('input', (e) => {
            obj[property.key][index] = input.value;
            onFormChange();
        })
        input.value = obj[property.key][index];;
        li.appendChild(input);
        ulElem.appendChild(li);
    };

    // build the html for each item in the array
    obj[property.key].forEach(buildItemList);

    // listen for value changes on the array, and rebuild the dom
    addPropChangeEvent(obj, property.key, (oldVal: any, newVal: any) => {
        ulElem.innerHTML = '';
        obj[property.key].forEach(buildItemList);
    });


    // create the list item
    const listItemElem = document.createElement('li');
    listItemElem.classList.add(`fb-element-array`);

    listItemElem.appendChild(labelElem);
    listItemElem.appendChild(ulElem);
    listItemElem.appendChild(descriptionElem);

    return listItemElem;
}

const createObjectField = (property: IPropData, obj: any, onFormChange: any) => {
    // create the label
    const labelElem = document.createElement("label");
    labelElem.textContent = property.options.label;
    labelElem.htmlFor = property.key;

    // create the description element
    const descriptionElem = document.createElement('span');
    descriptionElem.innerHTML = property.options.description;

    // create a list of dom elements for each value in the object.
    const ulElem = document.createElement('ul');

    const buidElementFn = (key: string, index: number) => {

        const li = document.createElement('li');

        const elementType = obj[property.key][key].constructor.name;
        const inputType = dataTypeInputTypeLookup[elementType];
        if(inputType)
        {
            const name = document.createElement('label');
            name.innerHTML = key;

            const input = document.createElement('input');
            input.type = inputType;

            input.autocomplete = 'off';
            input.id = `fb-input-${property}-${index}`;
            input.addEventListener('input', (e) => {
                obj[property.key][key] = input.value;
                onFormChange();
            })
            input.value = obj[property.key][key];

            li.appendChild(name);
            li.appendChild(input);
        }
        else if( elementType === 'Function' )
        {
            const btn = document.createElement('button');
            btn.innerHTML = splitToWords(key);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                obj[property.key][key]();
            });
            li.appendChild(btn);
        }
        
        ulElem.appendChild(li);

        index += 1;
    };

    Object.keys(obj[property.key]).forEach(buidElementFn);

    addPropChangeEvent(obj, property.key, (oldValue: any, newVale: any) => {
        ulElem.innerHTML = '';
        Object.keys(obj[property.key]).forEach(buidElementFn);
        console.log('change');
    });


    // create the list item
    const listItemElem = document.createElement('li');
    listItemElem.classList.add(`fb-element-object`);

    listItemElem.appendChild(labelElem);
    listItemElem.appendChild(ulElem);
    listItemElem.appendChild(descriptionElem);

    return listItemElem;
}


export function generateForm(parentElement: HTMLElement, obj: any, onFormChange: ()=>void = ()=>{} ) {
    
    const form = document.createElement("form");
    parentElement.innerHTML = '';
    parentElement.appendChild(form);

    const formList = document.createElement('ul');
    form.appendChild(formList);

    const createFieldFactory = (property: IPropData) => {

        let elem = null;
        // Create the input
        switch (property.options.type) {
            case PropElementType.INPUT:
                elem = createInputField(property, obj, onFormChange);
                break;
            case PropElementType.DROPDOWN:
                elem = createSelectField(property, obj, onFormChange);
                break;
            case PropElementType.MARKDOWN: 
                elem = createMarkdownField(property, obj, onFormChange);
                break;
            case PropElementType.BUTTON: 
                elem = createButtonField(property, obj, onFormChange);
                break;
            case PropElementType.ARRAY:
                elem = createArrayField(property, obj, onFormChange);
                break;
            case PropElementType.OBJECT:
                elem = createObjectField(property, obj, onFormChange);
                break;
            default:
                break;
        }

        if (elem !== null) {
            formList.appendChild(elem);
        }
    }

    const properties: IPropData[] = Reflect.getMetadata("editableProperties", obj) || [];

    // create the input elements
    for (let property of properties) {
        createFieldFactory(property);
    }
}

// looks at the number of spaces on the first line
// and strips them from every other line
// this allows us to have multiline strings that are nicelly indented
// in our code.
function escape(str: string) {
    const lines = str.split('\n');
    if(lines.length === 1)
        return lines[0];

    const initialSpaceLength = lines[1].length - (lines[1] as any).trimStart().length;
    for(let i=0; i<lines.length; i++) {
        lines[i] = lines[i].substr(initialSpaceLength);
    }
    return lines.join('\n');
}

// Converts a str from 'pascalCase' to seperate words
// eg: 'firstName' to 'First name'
function splitToWords(str: string): string {
    
    let newStr = str[0].toUpperCase();
    for(let i=1; i<str.length; i++) {
        const last_char = str[i-1] || '';

        let prevUpper = last_char === last_char.toUpperCase();
        const isUpper = str[i] === str[i].toUpperCase();

        if(isUpper && !prevUpper)
            newStr += ' ';
        
        newStr += str[i].toLowerCase();
    }

    return newStr;
}