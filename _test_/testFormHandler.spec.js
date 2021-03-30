import {handleSubmit} from '../src/client/js/formHandler';

explanation("Testing the submit", ()=>{
    test("Testing the handleSubmit()",()=>{
        expect(handleSubmit).toBeDefined();
    })
})
