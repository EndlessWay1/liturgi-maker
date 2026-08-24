// Load our library that generates the document
import Docxtemplater from 'docxtemplater';
// Load PizZip library to load the docx/pptx/xlsx file in memory
import PizZip from 'pizzip';

// Builtin file system utilities
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.resolve(
  __dirname,
  '../../../../public/Liturgi_Template.docx'
);

const suratDalam = {
  Naya: path.resolve(
    __dirname,
    '../../../../public/Surat_Pendeta_Pak_Naya.docx'
  ),
  Angela: path.resolve(
    __dirname,
    '../../../../public/Surat_Pendeta_Pnt_Angela.docx'
  ),
  Gloria: path.resolve(
    __dirname,
    '../../../../public/Surat_Pendeta_Kak_Gloria.docx'
  ),
};
const suratLuar = path.resolve(
  __dirname,
  '../../../../public/Surat_Pendeta_Luar.docx'
);

const makeLiturgiTemplate = (render) => {
  // Load the docx file as binary content
  const content = fs.readFileSync(templatePath, 'binary');

// Unzip the content of the file
  const zip = new PizZip(content);

  /*
   * Parse the template.
   * This function throws an error if the template is invalid,
   * for example, if the template is "Hello {user" (missing closing tag)
   */
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  /*
   * Render the document : Replaces :
   * - {first_name} with John
   * - {last_name} with Doe,
   * ...
   */
  /*
   * Get the output document and export it as a Node.js buffer
   * This method is available since docxtemplater@3.62.0
   */
  return doc.renderAsync(render).then((val) => val.toBuffer());
};
// Write the Buffer to a file

const makeSuratTemplate = (render) => {
  // Load the docx file as binary content

  const PF = render.NamaPF.match(/(Naya|Gloria|Angela)/);

  const content = fs.readFileSync(PF ? suratDalam[PF[1]] : suratLuar, 'binary');

  // Unzip the content of the file
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  return doc.render(render).toBuffer();
};

export { makeLiturgiTemplate, makeSuratTemplate };
