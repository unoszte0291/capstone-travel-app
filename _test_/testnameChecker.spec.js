import {checkForName} from '../src/client/js/nameChecker'

describe("Testing to confirm input url",()=>{
    test("Testing the checkForName()", ()=>{
       expect(checkForName("Invalid URL")).toBe(false);
        })})
