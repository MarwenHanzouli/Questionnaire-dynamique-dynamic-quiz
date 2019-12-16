export class Questionnaire {
    constructor(
        public titre : string,
        public questionsSimples?: string[],
        public qcm?: string[]
    ){}
}