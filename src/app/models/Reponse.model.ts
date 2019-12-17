export class Reponse{
    constructor(
        public email:string,
        public id:number,
        public titreQuestionnaire : string,
        public reponsesSimples?: string[],
        public qcm?: string[]
    ){}
}