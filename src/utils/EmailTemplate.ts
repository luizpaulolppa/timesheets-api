import fs from 'fs';
import path from 'path';
import EmailParameterDTO from "../dtos/EmailParameterDTO";

export default class EmailTemplate {

  public async buildEmailTemplate(emailTemplateName: string, params: EmailParameterDTO[]): Promise<string> {
    const pathResolve = path.resolve(__dirname, "..", "templates", `${emailTemplateName}.html`);
    const template = await fs.promises.readFile(pathResolve, 'utf8');
    return params.reduce((accumulator: string, parameterDTO: EmailParameterDTO) => {
      return accumulator.replace(new RegExp(`{${parameterDTO.key}}`, 'g'), parameterDTO.value);
    }, template);
  }
}

