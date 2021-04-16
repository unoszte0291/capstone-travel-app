import {checkForName} from '../src/client/js/nameChecker'

describe("Testing to confirm input data",()=>{
    test("Testing the checkForName()", ()=>{
       expect(checkForName("no input data")).toBe(false);
        })})
