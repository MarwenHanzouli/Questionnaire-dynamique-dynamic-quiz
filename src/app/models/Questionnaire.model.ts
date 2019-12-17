export class Questionnaire {
    constructor(
        public id:number,
        public titre : string,
        public questionsSimples?: string[],
        public qcm?: string[]
    ){}
}