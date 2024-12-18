import { Material } from "../models/material";

function generatePrompt(itemName: string, availableMaterials: Array<Material>): string {
  const materials = availableMaterials.map(material => material.name).join(', ');

  return `
Your task is write which materials consist of user chosen item. and then when write where the materials can be recycled or disposed of.
You must always response in JSON format.
Example of JSON response with schema: { "materials": string[], "reuse": string[], "recycle": string[], "valuable": boolean }
Strictly follow the schema format dont use any specific symbols, as \`\`\`this for example.
Use valid JSON format.
You can use the following materials: ${materials}

Examples:

Input: mobile phone
Output: { "materials": ['metal', 'plastic', 'glass'], "reuse": ['reuse center'], "recycle": ['recycling center', 'landfill'], "valuable": true }

Dont write more then 6 materials for input item!!! <- very important
Use only relevant materials if there input wood table then use wood as first material then second most used and so on. Dont use materials then unlikely will be in this item. Better dont use nothing then bad material.
Input: ${itemName}
Output:
  `;
}

export { generatePrompt };
