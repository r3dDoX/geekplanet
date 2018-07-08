import * as ProductService from '../products/productService';
import {
  createRemoveFile,
  createRemoveTag,
  createSelectFiles,
  createSelectTag,
} from './adminActions';

let dispatchSpy;

beforeEach(() => {
  dispatchSpy = jest.fn();
});

describe('createSelectFiles', () => {
  it('should dispatch saved picture ids from given files', () => {
    const selectedFiles = ['selectedFile1', 'selectedFile2'];
    const expectedFileIds = ['id1', 'id2'];
    const resolvedPromise = new Promise(resolve => resolve(expectedFileIds));
    ProductService.savePictures = jest.fn(() => resolvedPromise);

    const asyncDispatchFunction = createSelectFiles(selectedFiles, []);
    asyncDispatchFunction(dispatchSpy);

    return resolvedPromise
      .then(() => {
        const dispatchedAction = dispatchSpy.mock.calls[0][0];
        expect(dispatchedAction.data).toBe(expectedFileIds);
      });
  });

  it('should dispatch redux-form change with concatenated fileIds', () => {
    const initialFileIds = ['id1'];
    const selectedFiles = ['selectedFile1', 'selectedFile2'];
    const newFileIds = ['id2', 'id3'];
    const resolvedPromise = new Promise(resolve => resolve(newFileIds));
    ProductService.savePictures = jest.fn(() => resolvedPromise);

    const asyncDispatchFunction = createSelectFiles(selectedFiles, initialFileIds);
    asyncDispatchFunction(dispatchSpy);

    return resolvedPromise
      .then(() => {
        const dispatchedAction = dispatchSpy.mock.calls[1][0];
        expect(dispatchedAction.payload).toEqual(initialFileIds.concat(newFileIds));
      });
  });
});

describe('createRemoveFile', () => {
  it('should dispatch redux-form change with filtered fileIds', () => {
    const initialFileIds = ['id1', 'id2'];
    const resolvedPromise = new Promise(resolve => resolve());
    ProductService.removePicture = jest.fn(() => resolvedPromise);

    const asyncDispatchFunction = createRemoveFile(initialFileIds, 'id1');
    asyncDispatchFunction(dispatchSpy);

    return resolvedPromise
      .then(() => {
        const dispatchedAction = dispatchSpy.mock.calls[1][0];
        expect(dispatchedAction.payload).toEqual(['id2']);
      });
  });
});

describe('createSelectTag', () => {
  it('should dispatch redux-form change with concatenated tags', () => {
    const existingTag = 'existingTag';
    const tags = ['myTag', 'yourTag'];

    const asyncDispatchFunction = createSelectTag(tags, existingTag, 3);
    asyncDispatchFunction(dispatchSpy);

    expect(dispatchSpy.mock.calls.length).toBe(2);
    const dispatchAction = dispatchSpy.mock.calls[1][0];
    expect(dispatchAction.payload).toEqual(tags.concat(existingTag));
  });
});

describe('createRemoveTag', () => {
  it('should dispatch redux-form change with filtered tags', () => {
    const tagToRemove = 'yourTag';
    const tags = ['myTag', 'yourTag'];

    const asyncDispatchFunction = createRemoveTag(tags, tagToRemove);
    asyncDispatchFunction(dispatchSpy);

    const dispatchAction = dispatchSpy.mock.calls[1][0];
    expect(dispatchAction.payload).toEqual(['myTag']);
  });
});
