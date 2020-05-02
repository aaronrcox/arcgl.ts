
import  'reflect-metadata';
import './dark.scss';

import marked = require('marked');

interface IElementData
{
    property: string;
    arrIndex: number;
    dataType: string;
    inputType: FormElementType;
    label: string;
    description: string;
    options: any[];
}

export enum FormElementType
{
    INPUT,
    DROPDOWN,
    BUTTON,
    OBJECT,
    ARRAY,
    MARKDOWN
}

interface IFormOptions
{
    label?: string;
    tooltip?: string;
    description?: string;
    dropdown_enum_options?: {[key: string]: string | number};
    dropdown_options?: any[];
    type?: FormElementType;
    onChange?: (oldValue: any, newValue: any)=>void;
}

interface IFormData 
{
    parent: Object;
    propertyKey: any;
    options: IFormOptions;
}

function createChangeProps(this: any, parent: Object, propertyKey: any) {
    const key = `__${propertyKey}__`;
    const getter = function(this: any) { return this[key];  }
    const setter = function(this: any, value: any) {
        const oldValue = this[key];
        this[key] = value;
        
        for(const fn of this[`__on_change_${propertyKey}`] || []){
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

export function editable(options: IFormOptions = {}): PropertyDecorator {

    if(options.dropdown_enum_options) {
        options.dropdown_options = Object.keys(options.dropdown_enum_options)
        .filter(key => isNaN(Number(key)))
        .map((z: string) => ({name: z, value: (options.dropdown_enum_options as any)[z] }));
    }

    if(!options.type && options.dropdown_options) {
        options.type = FormElementType.DROPDOWN;
    }

    return function (parent: Object, propertyKey: any) {
        const properties: IFormData[] = Reflect.getMetadata("editableProperties", parent) || [];
        if (properties.indexOf(propertyKey) < 0) {
            createChangeProps(parent, propertyKey);
            properties.push({ parent, propertyKey, options });
        }
        Reflect.defineMetadata("editableProperties", properties, parent);
    }
}





export function generateForm(parentElement: HTMLElement, obj: any, onFormChange: ()=>void = ()=>{} ) {
    
    const form = document.createElement("form");
    parentElement.innerHTML = '';
    parentElement.appendChild(form);

    const formList = document.createElement('ul');
    form.appendChild(formList);

    const inputTypeValueLookup: {[key: string]: string} = {
        text: 'value',
        date: 'valueAsDate',
        number: 'valueAsNumber',
        checkbox: 'checked'
    }

    const dataTypeInputTypeLookup: {[key: string]: string} = {
        String: 'text',
        Date: 'date',
        Number: 'number',
        Boolean: 'checkbox',
    }

    const dataTypeElementTypeLookup: {[key: string]: FormElementType} = {
        Function: FormElementType.BUTTON,
        String:FormElementType.INPUT,
        Date: FormElementType.INPUT,
        Number: FormElementType.INPUT,
        Boolean: FormElementType.INPUT,
        Array: FormElementType.ARRAY,
        Object: FormElementType.OBJECT
    }

    const createInputField = (property: string, index: number, type: string, label: string, description: string) => {
        
        // create the label
        const labelElem = document.createElement("label");
        labelElem.textContent = label;
        labelElem.htmlFor = property;
        
        const inputElem = document.createElement("input") as any;
        inputElem.id = property;
        inputElem.type = type;
        inputElem.autocomplete = "off";

        inputElem[inputTypeValueLookup[type]] = (index ? obj[property][index] : obj[property])
        inputElem.addEventListener('input', () => {
            if(index) obj[property][index] = inputElem[inputTypeValueLookup[type]];
            else obj[property] = inputElem[inputTypeValueLookup[type]];
            onFormChange();
        });
        const descriptionElem = document.createElement('span');
        descriptionElem.innerHTML = description || '';

        addPropChangeEvent(obj, property, (oldValue: any, newValue: any) => {
            inputElem[inputTypeValueLookup[type]] = newValue;
        });

        // create the list item
        const listItemElem = document.createElement('li');
        listItemElem.classList.add(`fb-element-input`);
        formList.appendChild(listItemElem);

        listItemElem.appendChild(labelElem);
        listItemElem.appendChild(inputElem);
        listItemElem.appendChild(descriptionElem);
    }

    const createSelectField = (options: any[], label: string, property: string, description: string = '') =>
    {
        // create the label
        const labelElem = document.createElement("label");
        labelElem.textContent = label;
        labelElem.htmlFor = property;
        
        const inputElem = document.createElement("select");
        inputElem.id = property;
        inputElem.autocomplete = "off";
        inputElem.value = obj[property];
        inputElem.addEventListener('input', () => {
            obj[property] = inputElem.value;
            onFormChange();
        });

        addPropChangeEvent(obj, property, (oldValue: any, newValue: any) => {
            inputElem.value = newValue;
        });

        for(const opt of options)
        {
            const optionElem = document.createElement('option');
            optionElem.value = opt.value;
            optionElem.innerHTML = opt.name;
            inputElem.appendChild(optionElem);
        }

        const descriptionElem = document.createElement('span');
        descriptionElem.innerHTML = description;

        // create the list item
        const listItemElem = document.createElement('li');
        listItemElem.classList.add(`fb-element-select`);
        formList.appendChild(listItemElem);

        listItemElem.appendChild(labelElem);
        listItemElem.appendChild(inputElem);
        listItemElem.appendChild(descriptionElem);
    }

    const createMarkdownField = (property: string) => {

        const markdownElement = document.createElement('div');
        markdownElement.classList.add('markdown');
        markdownElement.innerHTML = marked( escape(obj[property]) );

        addPropChangeEvent(obj, property, (oldValue: any, newValue: any) => {
            markdownElement.innerHTML = marked( escape(newValue) )
        });

        // create the list item
        const listItemElem = document.createElement('li');
        listItemElem.classList.add(`fb-element-markdown`);
        formList.appendChild(listItemElem);

        listItemElem.appendChild(markdownElement);
    }

    const createButtonField = (label: string, property: string) => {
        const btn = document.createElement('button');
        btn.innerHTML = label;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            obj[property]();
        });

        // create the list item
        const listItemElem = document.createElement('li');
        listItemElem.classList.add(`fb-element-button`);
        formList.appendChild(listItemElem);

        listItemElem.appendChild(btn);
        
    }

    const createArrayField = (label: string, property: string, description: string = '') => {

        // create the label
        const labelElem = document.createElement("label");
        labelElem.textContent = label;
        labelElem.htmlFor = property;

        const ulElem = document.createElement('ul');

        const buildItemList = (element: any, index: number) => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.type = dataTypeInputTypeLookup[obj[property][index].constructor.name];
            input.autocomplete = 'off';
            input.id = `fb-input-${property}-${index}`;
            input.addEventListener('input', (e) => {
                obj[property][index] = input.value;
                onFormChange();
            })
            input.value = obj[property][index];;
            li.appendChild(input);
            ulElem.appendChild(li);
        };

        obj[property].forEach(buildItemList);

        addPropChangeEvent(obj, property, (oldVal: any, newVal: any) => {
            ulElem.innerHTML = '';
            obj[property].forEach(buildItemList);
        });

        const descriptionElem = document.createElement('span');
        descriptionElem.innerHTML = description;

        // create the list item
        const listItemElem = document.createElement('li');
        listItemElem.classList.add(`fb-element-array`);
        formList.appendChild(listItemElem);

        listItemElem.appendChild(labelElem);
        listItemElem.appendChild(ulElem);
        listItemElem.appendChild(descriptionElem);
    }

    const createObjectField = (label: string, property: string, description: string = '') => {
        // create the label
        const labelElem = document.createElement("label");
        labelElem.textContent = label;
        labelElem.htmlFor = property;

        const ulElem = document.createElement('ul');

        const buidElementFn = (key: string, index: number) => {

            const li = document.createElement('li');

            const elementType = obj[property][key].constructor.name;
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
                    obj[property][key] = input.value;
                    onFormChange();
                })
                input.value = obj[property][key];

                li.appendChild(name);
                li.appendChild(input);
            }
            else if( elementType === 'Function' )
            {
                const btn = document.createElement('button');
                btn.innerHTML = key;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    obj[property][key]();
                });
                li.appendChild(btn);
            }
            
            ulElem.appendChild(li);

            index += 1;
        };

        Object.keys(obj[property]).forEach(buidElementFn);

        addPropChangeEvent(obj, property, (oldValue: any, newVale: any) => {
            ulElem.innerHTML = '';
            Object.keys(obj[property]).forEach(buidElementFn);
            console.log('change');
        });

        const descriptionElem = document.createElement('span');
        descriptionElem.innerHTML = description;

        // create the list item
        const listItemElem = document.createElement('li');
        listItemElem.classList.add(`fb-element-object`);
        formList.appendChild(listItemElem);

        listItemElem.appendChild(labelElem);
        listItemElem.appendChild(ulElem);
        listItemElem.appendChild(descriptionElem);
        
    }

    const createFieldFactory = (data: IElementData) => {

        // Create the input
        switch (data.inputType) {
            case FormElementType.INPUT:
                const type = dataTypeInputTypeLookup[data.dataType];
                createInputField(data.property, null, type, data.label, data.description);
                break;
            case FormElementType.DROPDOWN:
                createSelectField(data.options, data.label, data.property, data.description);
                break;
            case FormElementType.MARKDOWN: 
                createMarkdownField(data.property);
                break;
            case FormElementType.BUTTON: 
                createButtonField(data.label, data.property);
                break;
            case FormElementType.ARRAY:
                createArrayField(data.label, data.property, data.description);
                break;
            case FormElementType.OBJECT:
                createObjectField(data.label, data.property, data.description);
                break;
            default:
                break;
        }
    }

    const properties: IFormData[] = Reflect.getMetadata("editableProperties", obj) || [];

    // create the input elements
    for (let property of properties) {

        const key = property.propertyKey;

        const dataType = Reflect.getMetadata("design:type", obj, key) || property;
        const inputType = property.options.type || dataTypeElementTypeLookup[dataType.name];
        const displayName = property.options.label !== undefined ? property.options.label : key;
        const description = property.options.description || '';

        const options: any[] = property.options.dropdown_options;

        createFieldFactory({
            property: key,
            arrIndex: null,
            dataType: dataType.name,
            inputType,
            label: displayName,
            description,
            options
        });
    }
}

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