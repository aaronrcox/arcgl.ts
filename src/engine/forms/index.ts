
import  'reflect-metadata';
import marked = require('marked');

interface IFormElementGroup {
    property: string;
    type: string;

    input?: HTMLInputElement;
    select?: HTMLSelectElement;
    label?: HTMLElement;
    description?: HTMLElement;
    markdown?: HTMLElement;
    arrayItems?: HTMLElement;
    button?: HTMLButtonElement;
}

interface IElementData
{
    property: string;
    arrIndex: number;
    dataType: string;
    inputType: string;
    label: string;
    description: string;
    options: any[];
}

export function editable(): PropertyDecorator {
    return function (target: Object, propertyKey: any) {
        const properties: string[] = Reflect.getMetadata("editableProperties", target) || [];
        if (properties.indexOf(propertyKey) < 0) {
            properties.push(propertyKey);
        }
        Reflect.defineMetadata("editableProperties", properties, target);
    }
}

export function selectEnumOptions(options: {[key: string]: string | number}): PropertyDecorator {
    return function (target: Object, propertyKey: any) {
        const type_overrides: any = Reflect.getMetadata("type_overrides", target) || {};
        const select_options: any = Reflect.getMetadata("select_options", target) || {};

        type_overrides[propertyKey] = 'select';
        select_options[propertyKey] = Object.keys(options)
            .filter(key => isNaN(Number(key)))
            .map((z: string) => ({name: z, value: (options as any)[z] }));

        Reflect.defineMetadata("type_overrides", type_overrides, target);
        Reflect.defineMetadata("select_options", select_options, target);
    }
}

export function markdown() {
    return function (target: Object, propertyKey: any) {
        const type_overrides: any = Reflect.getMetadata("type_overrides", target) || {};
        type_overrides[propertyKey] = 'markdown';
        Reflect.defineMetadata("type_overrides", type_overrides, target);
    }
}

export function displayName(name: string): PropertyDecorator  {
    return function (target: Object, propertyKey: any) {
        const displayNames: any = Reflect.getMetadata("displayName", target) || {};
        displayNames[propertyKey] = name;
        Reflect.defineMetadata("displayName", displayNames, target);
    }
}

export function description(description: string): PropertyDecorator  {
    return function (target: any, propertyKey: any) {
        const descriptions: any = Reflect.getMetadata("descriptions", target) || {};
        descriptions[propertyKey] = description;
        Reflect.defineMetadata("descriptions", descriptions, target);
    }
}

export function generateForm(parentElement: HTMLElement, obj: any, onFormChange: ()=>void = ()=>{} ) {
    

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

    const dataTypeElementTypeLookup: {[key: string]: string} = {
        Function: 'button',
        String: 'input',
        Date: 'input',
        Number: 'input',
        Boolean: 'input',
        Array: 'array'
    }

    const createInputField = (property: string, index: number, type: string, label: string, description: string): IFormElementGroup => {

        
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
        descriptionElem.innerText = description || '';

        const group: IFormElementGroup = {
            property: property,
            type: type,
            label: labelElem,
            input: inputElem,
            description: descriptionElem,
        };

        return group;
    }

    const createSelectField = (options: any[], label: string, property: string, description: string = ''): IFormElementGroup =>
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

        for(const opt of options)
        {
            const optionElem = document.createElement('option');
            optionElem.value = opt.value;
            optionElem.innerText = opt.name;
            inputElem.appendChild(optionElem);

        }

        const descriptionElem = document.createElement('span');
        descriptionElem.innerText = description;

        const group: IFormElementGroup = {
            property: property,
            type: 'select',
            label: labelElem,
            select: inputElem,
            description: descriptionElem,
        }

        return group;
    }

    const createMarkdownField = (property: string): IFormElementGroup => {

        const markdownElement = document.createElement('div');
        markdownElement.classList.add('markdown');
        markdownElement.innerHTML = marked( escape(obj[property]) )
        const group: IFormElementGroup = {
            property: property,
            type: 'markdown',
            markdown: markdownElement,
        }
        return group;
    }

    const createButtonField = (label: string, property: string): IFormElementGroup => {
        const btn = document.createElement('button');
        btn.innerText = label;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            obj[property]();
        });

        const group: IFormElementGroup = {
            property: property,
            type: 'button',
            button: btn
        }

        return group;
    }

    const createArrayField = (label: string, property: string, description: string = ''): IFormElementGroup => {

        // create the label
        const labelElem = document.createElement("label");
        labelElem.textContent = label;
        labelElem.htmlFor = property;

        const ulElem = document.createElement('ul');

        obj[property].forEach((element: any, index: number) => {
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
        });

        const descriptionElem = document.createElement('span');
        descriptionElem.innerText = description;

        const group: IFormElementGroup = {
            property: property,
            type: 'array',
            label: labelElem,
            arrayItems: ulElem,
            description: descriptionElem
        }
        return group;
    }

    const createFieldFactory = (data: IElementData): IFormElementGroup => {

        // Create the input
        switch (data.inputType) {
            case 'input':
                const type = dataTypeInputTypeLookup[data.dataType];
                return createInputField(data.property, null, type, data.label, data.description);
            case 'select':
                return createSelectField(data.options, data.label, data.property, data.description);
            case 'markdown': 
                return createMarkdownField(data.property);
            case 'button': 
                return createButtonField(data.label, data.property);
            case 'array':
                return createArrayField(data.label, data.property, data.description);
            default:
                return null;
        }
    }

    const properties: string[] = Reflect.getMetadata("editableProperties", obj) || [];
    const type_overrides = Reflect.getMetadata("type_overrides", obj) || {};
    const select_options = Reflect.getMetadata("select_options", obj) || {};
    const displayNames = Reflect.getMetadata('displayName', obj);
    const descriptions = Reflect.getMetadata('descriptions', obj);

    const formItems: IFormElementGroup[] = [];

    // create the input elements
    for (let property of properties) {

        const dataType = Reflect.getMetadata("design:type", obj, property) || property;
        const inputType = type_overrides[property] || dataTypeElementTypeLookup[dataType.name];
        const displayName = displayNames[property] || property;
        const description = descriptions[property] || '';
        const options = select_options[property] || [];

        const formItem = createFieldFactory({
            property,
            arrIndex: null,
            dataType: dataType.name,
            inputType,
            label: displayName,
            description,
            options
        });

        formItems.push(formItem);

    }
    

    const form = document.createElement("form");
    parentElement.innerHTML = '';
    parentElement.appendChild(form);

    const formList = document.createElement('ul');
    form.appendChild(formList);

    // construct the layout
    for(const item of formItems) {

        const listItemElem = document.createElement('li');
        listItemElem.classList.add(`fb-element-${item.type}`)
        formList.appendChild(listItemElem);

        switch(item.type) {
            case 'text':
            case 'date':
            case 'number':
                listItemElem.appendChild(item.label);
                listItemElem.appendChild(item.input);
                listItemElem.appendChild(item.description);
                break;
            case 'select':
                listItemElem.appendChild(item.label);
                listItemElem.appendChild(item.select);
                listItemElem.appendChild(item.description);
                break;
            case 'checkbox':
                listItemElem.appendChild(item.input);
                listItemElem.appendChild(item.label);
                listItemElem.appendChild(item.description);
                break;
            case 'markdown': 
                listItemElem.appendChild(item.markdown);
                break;
            case 'button': 
                listItemElem.appendChild(item.button);
                break;
            case 'array':
                listItemElem.appendChild(item.label);
                listItemElem.appendChild(item.arrayItems);
                listItemElem.appendChild(item.description);
                break;
            default:
                break;
        }
    }

    // pool for changes and update the input
    // setInterval(() => {
    //     console.log('checking');

    //     for(const item of formItems) {
    //         switch(item.type) {
    //             case 'text':
    //                 item.input.value = obj[item.property];
    //                 break;
    //             case 'date':
    //                 item.input.valueAsDate = obj[item.property];
    //                 break;
    //             case 'number':
    //                 item.input.valueAsNumber = obj[item.property];
    //                 break;
    //             case 'select':
    //                 item.select.value = obj[item.property];
    //                 break;
    //             case 'checkbox':
    //                 item.input.checked = obj[item.property];
    //                 break;
    //             case 'array':
    //                 item.arrayItems.innerHTML = '';
    //                 obj[item.property].forEach((element: any) => {
    //                     const li = document.createElement('li');
    //                     const input = document.createElement('input');
    //                     input.value = element;
    //                     li.appendChild(input);
    //                     item.arrayItems.appendChild(li);
    //                 });
    //                 break;
    //             case 'markdown': 
    //                 break;
    //             case 'button':
    //                 break;
    //         }
    //     }

    // }, 100);
    
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


