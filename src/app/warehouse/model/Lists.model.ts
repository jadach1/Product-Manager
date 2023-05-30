import {formTransaction} from '../../Forms/models/form-transaction.model'

export class Lists {

    projectList: Array<string>  = [
        "APPLE PARK",
        "AZAR GROVE",
        "KEDANOV",
        "BRIGHTON PLACE",
        "MOXON STREET"
    ]

    operatorsList: Array<string> = [
        "Peter Burning",
        "Jacob Adach",
        "Vorgan Minnie",
        "Allan Wrench"
    ]

    transactionList: Array<formTransaction> = [];

    productList: Map<string, Array<string>>  = new Map();

    // Constructor Will Create New List of Products for Default Selection
        constructor() {
            var tempArray = new Array<string>("INTEGRITANK PART A RESIN 24KG",
                                              "INTEGRITANK PART B YELLOW 23KG",
                                              "INTEGRITANK PART B WHITE 23KG",
                                              "INTEGRITANK PART 1 PRIMER 20KG",
                                              "INTEGRITANK PART C CATALYST 900G",
                                              "INTEGRITANK BPO POWDER 400G")
            this.productList.set("GRACE" , tempArray);

            tempArray =  new Array<string>("SHEETSEAL PRIMER 25L",
                                             "SHEETSEAL PRIMER 5L",
                                             "SHEETSEAL 225")
            this.productList.set("RIW"   , tempArray);

            tempArray =  new Array<string>("CDM 2M X 20M 8MM",
                                            "WALL FIXING PLUGS X100",
                                            "BASEDRRAIN 2M",
                                            "DOUBLE-SIDED SEALING BUTYL TAPE",
                                            "OVERTAPE 150MM X 20M")

            this.productList.set("NEWTON", tempArray)

            tempArray =  new Array<string>("INSULATION BOARDS")
            this.productList.set("FIREBRAND",tempArray)
        }

}
