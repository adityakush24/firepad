import { MonacoAdapter } from "../src/monaco-adapter.js"
import { TextOperation } from "../src/text-operation.js"

/** Monaco Adapter Unit Tests */
describe("Monaco Operations Test", function () {
  /** Editor Content */
  var editorContent = `module Conway {

    export class Cell {
        public row: number;
        public col: number;
        public live: boolean;
        
        constructor(row: number, col: number, live: boolean) {
            this.row = row;
            this.col = col;
            this.live = live
        }
    }
}
`

  /** Editor Changes */
  var operations = [
    { rangeLength: 0, text: "/* ", rangeOffset: 21, forceMoveMarkers: false },
    { rangeLength: 0, text: " */", rangeOffset: 299, forceMoveMarkers: false },
  ]

  /** Expected Text Operations */
  var textOperations = [
    new TextOperation().retain(21).insert("/* ").retain(281),
    new TextOperation().retain(299).insert(" */").retain(6),
  ]

  it("should convert Monaco Editor changes to Text Operation", function () {
    var operationFromMonacoChange =
      MonacoAdapter.prototype.operationFromMonacoChanges

    let offset = 0
    operations.forEach((operation, index) => {
      var pair = operationFromMonacoChange.call(
        null,
        operation,
        editorContent,
        offset
      )

      /** Base Length of First Operation must be Target Length of Second Operation */
      expect(pair[1].targetLength).toEqual(pair[0].baseLength)

      /** Base Length of Second Operation must be Target Length of First Operation */
      expect(pair[0].targetLength).toEqual(pair[1].baseLength)

      /** Correct Operations Returned */
      expect(pair[0]).toEqual(textOperations[index])

      /** Update Offset */
      offset += pair[0].targetLength - pair[0].baseLength
    })
  })
})
