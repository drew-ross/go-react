import { constructBoardMatrix } from "./helpers";
import {
  emptyBoardMatrix_19_19,
  emptyBoardMatrix_5_5,
  emptyBoardMatrix_30_30,
} from "./helpers.test.constants";

describe("constructBoardMatrix", () => {
  it(`should return a 19x19 matrix filled with ["N", null]
  when no arguments are given`, () => {
    // Action
    const output = constructBoardMatrix();

    // Assertion
    expect(output).toEqual(emptyBoardMatrix_19_19);
  });
  it(`should return a 5x5 matrix filled with ["N", null]
  when a 5 is given`, () => {
    // Action
    const output = constructBoardMatrix(5);

    // Assertion
    expect(output).toEqual(emptyBoardMatrix_5_5);
  });
  it(`should return a 30x30 matrix filled with ["N", null]
  when a 30 is given`, () => {
    // Action
    const output = constructBoardMatrix(30);

    // Assertion
    expect(output).toEqual(emptyBoardMatrix_30_30);
  });
  it(`should return a 19x19 matrix filled with ["N", null] 
  when an invalid input is given`, () => {
    // Action
    const output1 = constructBoardMatrix(-2);
    const output2 = constructBoardMatrix('A');
    const output3 = constructBoardMatrix(null);
    const output4 = constructBoardMatrix(undefined);
    const output5 = constructBoardMatrix(4);
    const output6 = constructBoardMatrix(31);

    // Assertion
    expect(output1).toEqual(emptyBoardMatrix_19_19);
    expect(output2).toEqual(emptyBoardMatrix_19_19);
    expect(output3).toEqual(emptyBoardMatrix_19_19);
    expect(output4).toEqual(emptyBoardMatrix_19_19);
    expect(output5).toEqual(emptyBoardMatrix_19_19);
    expect(output6).toEqual(emptyBoardMatrix_19_19);
  });
});
