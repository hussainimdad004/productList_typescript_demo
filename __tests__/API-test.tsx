import fetch from "jest-fetch-mock";
import WebApi from "../src/config/index";
beforeEach(()=>{
    jest.resetAllMocks()
    jest.useFakeTimers()
})
it("testing API", async () => {
fetch.mockResponseOnce('OK')
    const moduleA = await new WebApi().getProductList()
    console.log('module A', moduleA)
    
    // console.log('actual ', actual)
    expect(moduleA.statusText).toEqual('OK');
})