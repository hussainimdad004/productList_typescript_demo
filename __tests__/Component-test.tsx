import React from "react";
import Component from "../src/view/screens/home/Component";
import renderer from "react-test-renderer";
import ErrorBoundry from "../src/common/ErrorBoundry";
beforeEach(()=>{
    jest.useFakeTimers()
})
it("testing component", async () => {
    const { toJSON } = renderer.create(<ErrorBoundry><Component name={"Imdad"} colour={"#fff"} price={1} img="" qty={1} id={1} index={1} /></ErrorBoundry>)
    expect(toJSON()).toMatchSnapshot()
})