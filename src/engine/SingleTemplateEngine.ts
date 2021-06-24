import {TemplateEngine} from "./TemplateEngine";
import type {App} from "obsidian";
import type QuickAdd from "../main";
import type {IChoiceExecutor} from "../IChoiceExecutor";

export class SingleTemplateEngine extends TemplateEngine {
    constructor(app: App, plugin: QuickAdd, private templatePath: string, choiceExecutor: IChoiceExecutor) {
        super(app, plugin, choiceExecutor);
    }
    public async run(): Promise<string> {
        let templateContent: string = await this.getTemplateContent(this.templatePath);
        if (!templateContent) {
            throw new Error(`Template ${this.templatePath} not found.`);
        }

        templateContent = await this.formatter.formatFileContent(templateContent);

        return templateContent;
    }
}