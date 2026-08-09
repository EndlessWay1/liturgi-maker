// Load our library that generates the document
import Docxtemplater from 'docxtemplater';
// Load PizZip library to load the docx/pptx/xlsx file in memory
import PizZip from 'pizzip';

// Builtin file system utilities
import fs from 'fs';

const makeTemplate = (render) => {
  // Load the docx file as binary content
  const content = fs.readFileSync('./public/Liturgi_Template.docx', 'binary');

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
/*
 * Instead of writing it to a file, you could also
 * let the user download it, store it in a database,
 * on AWS S3, ...
 */

export { makeTemplate };
