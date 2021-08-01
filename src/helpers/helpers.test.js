import { combineGroups, constructBoardMatrix, removeGroups } from "./helpers";
import {
  emptyBoardMatrix_19_19,
  emptyBoardMatrix_5_5,
  emptyBoardMatrix_30_30,
  combineGroups_groupsInput_1,
  combineGroups_groupsOutput_1,
  combineGroups_matrixInput_1,
  combineGroups_matrixOutput_1,
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
    const output2 = constructBoardMatrix("A");
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

describe("removeGroups", () => {
  it("should remove the given group (single) from the group object", () => {
    // Input
    const groupInput = {
      0: [
        [0, 0],
        [1, 0],
      ],
      1: [[0, 2]],
    };
    const groupNumbersInput = [1];

    // Expected output
    const expectedOutput = {
      0: [
        [0, 0],
        [1, 0],
      ],
    };

    // Action
    const output = removeGroups(groupInput, groupNumbersInput);

    // Assertion
    expect(output).toEqual(expectedOutput);
  });
  it("should remove the given groups (multiple) from the group object", () => {
    // Input
    const groupInput = {
      0: [
        [0, 0],
        [1, 0],
      ],
      1: [[0, 2]],
    };
    const groupNumbersInput = [0, 1];

    // Expected output
    const expectedOutput = {};

    // Action
    const output = removeGroups(groupInput, groupNumbersInput);

    // Assertion
    expect(output).toEqual(expectedOutput);
  });
});

describe("combineGroups", () => {
  // Input
  const groupNumbersInput1 = [0, 2, 4, 3];

  // Expected output
  const groupNumberOutput1 = 0;

  // Action
  const output1 = combineGroups(
    combineGroups_groupsInput_1,
    combineGroups_matrixInput_1,
    groupNumbersInput1
  );

  // Assertion
  expect(output1.groups).toEqual(combineGroups_groupsOutput_1);
  expect(output1.groupNumber).toEqual(groupNumberOutput1);
  expect(output1.boardMatrix).toEqual(combineGroups_matrixOutput_1);
});
